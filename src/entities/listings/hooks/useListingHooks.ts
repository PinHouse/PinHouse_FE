import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";

import { requestListingList } from "../api/listingsApi";
import { ListingListFilterBody, ListingListPage, ListingListParams } from "../model/type";
import { LISTING_LIST_NOTICES } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { useListingsFilterStore, useListingState } from "@/src/features/listings/model";

export const useListingListInfiniteQuery = () => {
  const status = useListingState(state => state.status);
  const regionType = useListingsFilterStore(s => s.regionType);
  const rentalTypes = useListingsFilterStore(s => s.rentalTypes);
  const supplyTypes = useListingsFilterStore(s => s.supplyTypes);
  const houseTypes = useListingsFilterStore(s => s.houseTypes);
  const sortType = useListingsFilterStore(s => s.sortType);

  const filter = useMemo(
    () => ({
      regionType,
      rentalTypes,
      supplyTypes,
      houseTypes,
      sortType,
    }),
    [regionType, rentalTypes, supplyTypes, houseTypes, sortType]
  );

  return useInfiniteQuery<ListingListPage>({
    queryKey: ["listingListInfinite", filter, status],
    enabled: !!status,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const body = {
        regionType,
        rentalTypes,
        supplyTypes,
        houseTypes,
        status,
        sortType,
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
