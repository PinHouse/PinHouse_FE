import { useInfiniteQuery } from "@tanstack/react-query";

import { requestListingList } from "../api/listingsApi";
import { ListingListPage } from "../model/type";

export const useListingListInfiniteQuery = () =>
  useInfiniteQuery<ListingListPage>({
    queryKey: ["listingListInfinite"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const body = {
        regionType: ["서울특별시", "경기도"],
        rentalTypes: ["청년", "신혼부부"],
        supplyTypes: ["국민임대", "행복주택"],
        houseTypes: ["아파트", "오피스텔"],
        status: "전체",
        sortType: "최신공고순",
      };
      const res = await requestListingList({ page: Number(pageParam), offSet: 10 }, body);
      return res;
    },
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
