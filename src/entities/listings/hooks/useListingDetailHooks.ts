import { useQuery } from "@tanstack/react-query";
import {
  Environmnt,
  InfraConfig,
  InfraLabel,
  ListingDetailResponse,
  ListingDetailResponseWithColor,
  ListingRentalDetailVM,
  ListingRoomCompareParams,
  ListingSummary,
  UseListingsHooksType,
  UseListingsHooksWithParam,
} from "../model/type";
import {
  getListingCompareFromBff,
  getListingComplexInfraFromBff,
  getListingComplexResourceFromBff,
  getListingComplexSummaryFromBff,
  getListingComplexTransitFromBff,
  getListingDetailBasicFromBff,
} from "../api/listingDetailBffApi";
import { getListingsRental } from "@/src/features/listings/hooks/list/components/listingsHooks";
import {
  INFRA_ENVIRONMENT_CONFIG,
  INFRA_LABEL_TO_KEY,
  useListingDetailFilter,
  useListingsDetailTypeStore,
} from "@/src/features/listings/model";
import { useOAuthStore } from "@/src/features/login/model";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import { compareNoticeQueryKey } from "@/src/shared/config";
import { getPinPoints, PinPointsPayload } from "@/src/entities/pinpoint";

export const useListingDetailBasic = (id: string) => {
  const pinPointId = useOAuthStore(state => state.pinPointId);
  const sortType = useListingsDetailTypeStore(state => state.sortType);
  const distance = useListingDetailFilter(state => state.distance);
  const typeCode = useListingDetailFilter(state => state.typeCode);
  const maxDeposit = useListingDetailFilter(state => state.maxDeposit);
  const maxMonthPay = useListingDetailFilter(state => state.maxMonthPay);
  const region = useListingDetailFilter(state => state.region);
  const debouncedDistance = useDebounce(distance, 500);
  const debouncedMaxDeposit = useDebounce(maxDeposit, 500);
  const debouncedMaxMonthPay = useDebounce(maxMonthPay, 500);
  const parseMoney = (value: string) => (value ? Number(value.replace(/[^0-9]/g, "")) : 0);

  return useQuery<ListingDetailResponse, Error, ListingDetailResponseWithColor>({
    queryKey: [
      "listingDetailBasic",
      id,
      pinPointId,
      sortType,
      debouncedDistance,
      region,
      typeCode,
      debouncedMaxDeposit,
      debouncedMaxMonthPay,
    ],
    placeholderData: prevData => prevData,
    enabled: typeof id === "string" && id.length > 0,
    staleTime: 1000 * 60 * 5,
    retry: false,

    queryFn: async () => {
      return getListingDetailBasicFromBff(id, {
        sortType,
        pinPointId,
        transitTime: debouncedDistance,
        maxDeposit: parseMoney(debouncedMaxDeposit),
        maxMonthPay: parseMoney(debouncedMaxMonthPay),
        region: region,
        typeCode: typeCode,
        facilities: [],
        targetType: [],
      });
    },
    select: response => {
      const data = response.data!;
      const basic = data.basicInfo;

      return {
        ...response,
        data: {
          ...data,
          basicInfo: {
            ...basic,
            rentalColor: getListingsRental(basic.type),
          },
        },
      };
    },
  });
};

export const useListingRentalDetail = (id: string) => {
  const encodedId = encodeURIComponent(id);
  const pinPointId = useOAuthStore.getState().pinPointId;

  return useQuery<ListingSummary, unknown, ListingRentalDetailVM>({
    queryKey: ["useListingRentalDetail", encodedId],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return await getListingComplexSummaryFromBff({
        complexId: id,
        pinPointId,
      });
    },
    select: (response): ListingRentalDetailVM => {
      return {
        distance: response.distance,
        rentalInfo: [
          { key: "name", value: response.name },
          { key: "address", value: response.address },
          { key: "heating", value: response.heating },
        ],
        id: response.id,
        infra: response.infra,
        totalHouseholds: response.totalHouseholds,
        totalSupplyInNotice: response.totalSupplyInNotice,
        unitCount: response.unitCount,
        unitTypes: response.unitTypes,
      };
    },
  });
};

export const useListingInfraDetail = (id: string) => {
  const encodedId = encodeURIComponent(id);

  return useQuery<Environmnt, Error, InfraConfig[]>({
    queryKey: ["useListingInfraDetail", encodedId],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    queryFn: () => getListingComplexInfraFromBff(id),

    select: response => {
      const infraLabels = (response.infra ?? []) as InfraLabel[];

      return infraLabels
        .map(label => {
          const key = INFRA_LABEL_TO_KEY[label];
          if (!key) return null;

          return INFRA_ENVIRONMENT_CONFIG[key];
        })
        .filter((v): v is InfraConfig => Boolean(v));
    },
  });
};

export const useListingRoomTypeDetail = <T>({ id, queryK, url }: UseListingsHooksType) => {
  const encodedId = encodeURIComponent(id);
  return useQuery<T[], Error, T[]>({
    queryKey: [queryK, encodedId],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    queryFn: () =>
      getListingComplexResourceFromBff<T[]>({
        complexId: id,
        resource: url,
      }),
    select: response => response ?? [],
  });
};

export const useListingRouteDetail = <T, TParam extends object>({
  id,
  queryK,
  url,
  params,
}: UseListingsHooksWithParam<TParam>) => {
  const encodedId = encodeURIComponent(id);

  return useQuery<T, Error, T | null>({
    queryKey: [queryK, encodedId, params],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,

    queryFn: () => {
      const pinPointId =
        "pinPointId" in params && typeof params.pinPointId === "string"
          ? params.pinPointId
          : undefined;

      if (url === "transit") {
        return getListingComplexTransitFromBff<T>({
          complexId: id,
          pinPointId,
        });
      }

      return getListingComplexResourceFromBff<T>({
        complexId: id,
        resource: url,
      });
    },

    select: response => {
      return response ?? null;
    },
  });
};

export const useListingFilterDetail = <T = PinPointsPayload>() => {
  return useQuery<PinPointsPayload, Error, T>({
    queryKey: ["pinpointSettings"],
    staleTime: 1000 * 60 * 5,
    placeholderData: previousData => previousData,
    queryFn: getPinPoints,
    select: data => data as T,
  });
};

export const useListingRoomCompare = <T>({
  noticeId,
  sortType,
  nearbyFacilities,
  pinPointId,
}: ListingRoomCompareParams) => {
  const { pinPointId: storePinPointId } = useOAuthStore();
  const resolvedPinPointId = pinPointId ?? storePinPointId;

  return useQuery<T, Error, T>({
    queryKey: compareNoticeQueryKey({
      noticeId,
      sortType,
      nearbyFacilities,
      pinPointId: resolvedPinPointId,
    }),
    queryFn: () =>
      getListingCompareFromBff({
        noticeId,
        sortType,
        nearbyFacilities,
        pinPointId: resolvedPinPointId,
      }) as Promise<T>,
    placeholderData: prevData => prevData,
    staleTime: 1000 * 60 * 60 * 24,
    enabled: Boolean(noticeId && resolvedPinPointId),
  });
};
