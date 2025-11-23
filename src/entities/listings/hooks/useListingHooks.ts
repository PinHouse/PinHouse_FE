import { useInfiniteQuery } from "@tanstack/react-query";

import { requestListingList } from "../api/listingsApi";
import { ListingListFilterBody, ListingListPage, ListingListParams } from "../model/type";
import { LISTING_LIST_NOTICES } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import {
  useFilterSheetStore,
  useListingsFilterStore,
  useListingState,
} from "@/src/features/listings/model";

export const useListingListInfiniteQuery = () => {
  const status = useListingState(state => state.status);
  const open = useFilterSheetStore(state => state.open);
  const sortType = useListingsFilterStore(state => state.sortType);

  return useInfiniteQuery<ListingListPage>({
    queryKey: ["listingListInfinite", sortType, status],
    enabled: !!status && !open,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const { regionType, rentalTypes, supplyTypes, houseTypes, sortType } =
        useListingsFilterStore.getState();
      const body = {
        regionType: regionType,
        rentalTypes: rentalTypes,
        supplyTypes: supplyTypes,
        houseTypes: houseTypes,
        status: status,
        sortType: sortType,
      };

      return requestListingList<
        IResponse,
        ListingListFilterBody,
        ListingListParams,
        ListingListPage
      >(LISTING_LIST_NOTICES, { page: Number(pageParam), offSet: 10 }, body);
    },
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};
