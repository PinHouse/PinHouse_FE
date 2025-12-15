import { useQuery } from "@tanstack/react-query";
import {
  Environmnt,
  InfraConfig,
  InfraLabel,
  ListingDetailResponseWithColor,
  ListingRentalDetailVM,
  ListingSummary,
  LstingBody,
} from "../model/type";
import { PostBasicRequest, requestListingList } from "../api/listingsApi";
import { COMPLEXES_ENDPOINT, NOTICE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { getListingsRental } from "@/src/features/listings/hooks/listingsHooks";
import { INFRA_ENVIRONMENT_CONFIG, INFRA_LABEL_TO_KEY } from "@/src/features/listings/model";

export const useListingDetailBasic = (id: string) => {
  const listingDetilBody = {
    sortType: "거리 순",
    pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251",
    transitTime: 100,
    maxDeposit: 50000000,
    maxMonthPay: 300000,
  };

  return useQuery<ListingDetailResponseWithColor>({
    queryKey: ["useListingDetailBasic", id],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return await PostBasicRequest<
        ListingDetailResponseWithColor,
        IResponse<ListingDetailResponseWithColor>,
        LstingBody,
        ListingDetailResponseWithColor
      >(`${NOTICE_ENDPOINT}/${id}`, "post", listingDetilBody);
    },
    select: (response): ListingDetailResponseWithColor => {
      const basic = response.data?.basicInfo;

      return {
        ...response,
        data: {
          ...response.data,
          basicInfo: {
            ...response.data?.basicInfo,
            rentalColor: getListingsRental(basic.type),
          },
        },
      };
    },
  });
};

export const useListingRentalDetail = (id: string) => {
  const encodedId = encodeURIComponent(id);

  return useQuery<ListingSummary, unknown, ListingRentalDetailVM>({
    queryKey: ["useListingRentalDetail", encodedId],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return await requestListingList<
        ListingSummary,
        IResponse<ListingSummary>,
        undefined,
        { pinPointId: string },
        ListingSummary
      >(`${COMPLEXES_ENDPOINT}/${encodedId}`, "get", {
        params: { pinPointId: "03cac89e-9b49-4e17-8daf-029be805f7a8" },
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

  return useQuery<IResponse<Environmnt>, Error, InfraConfig[]>({
    queryKey: ["useListingInfraDetail", encodedId],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    queryFn: () =>
      PostBasicRequest<Environmnt, IResponse<Environmnt>, {}, IResponse<Environmnt>>(
        `${COMPLEXES_ENDPOINT}/infra/${encodedId}`,
        "get"
      ),

    select: response => {
      const infraLabels = (response.data?.infra ?? []) as InfraLabel[];

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
