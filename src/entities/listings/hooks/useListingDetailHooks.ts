import { useQuery } from "@tanstack/react-query";
import { ListingDetailResponseWithColor, LstingBody } from "../model/type";
import { PostBasicRequest } from "../api/listingsApi";
import { NOTICE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { getListingsRental } from "@/src/features/listings/hooks/listingsHooks";

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
