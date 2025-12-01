import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { PostBasicRequest, requestListingList } from "../api/listingsApi";
import {
  LikeReturn,
  ListingListFilterBody,
  ListingListPage,
  ListingListParams,
  ListingSearchParams,
  PopularKeywordItem,
  PopularKeywordResponse,
  ToggleLikeVariables,
} from "../model/type";
import {
  LIKE_ENDPOINT,
  LISTING_SEARCH_ENDPOINT,
  NOTICE_ENDPOINT,
  POPULAR_SEARCH_ENDPOINT,
} from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import {
  useListingsFilterStore,
  useListingsSearchState,
  useListingState,
} from "@/src/features/listings/model";
import { useSearchState } from "@/src/shared/hooks/store";

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
      >(NOTICE_ENDPOINT, "post", {
        params: { page: Number(pageParam), offSet: 10 },
        body,
      });
    },
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};

type LikeContext = {
  prevListingList?: InfiniteData<ListingListPage>;
  prevListingSearch?: InfiniteData<ListingListPage>;
};

export const useToogleLike = () => {
  const queryClient = useQueryClient();

  return useMutation<LikeReturn, Error, ToggleLikeVariables, LikeContext>({
    retry: 0,

    mutationFn: variables => {
      return PostBasicRequest<IResponse, { targetId: number; type: "NOTICE" }, LikeReturn>(
        LIKE_ENDPOINT,
        variables.method,
        {
          targetId: variables.targetId!,
          type: "NOTICE",
        }
      );
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevListingList) {
        queryClient.setQueryData(["listingListInfinite"], ctx.prevListingList);
      }
      if (ctx?.prevListingSearch) {
        queryClient.setQueryData(["listingSearchInfinite"], ctx.prevListingSearch);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["listingListInfinite"] });
      queryClient.invalidateQueries({ queryKey: ["listingSearchInfinite"] });
    },
  });
};

export const usePopularSearchQuery = () => {
  return useQuery<PopularKeywordItem[]>({
    queryKey: ["popularSearch"],
    queryFn: () =>
      requestListingList<
        PopularKeywordResponse,
        undefined,
        { limit: number },
        PopularKeywordItem[]
      >(POPULAR_SEARCH_ENDPOINT, "get", { params: { limit: 5 } }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useListingSearchInfiniteQuery = () => {
  const rawQuery = useSearchState(s => s.query);
  const sortType = useListingsSearchState(s => s.sortType);
  const status = useListingsSearchState(s => s.status);
  const query = (rawQuery ?? "").trim();
  return useInfiniteQuery<ListingListPage>({
    queryKey: ["listingSearchInfinite", rawQuery, sortType, status],
    enabled: query.trim() !== "",
    initialPageParam: 1,
    staleTime: 1000 * 60 * 2,
    queryFn: async ({ pageParam = 1 }) => {
      return requestListingList<IResponse, undefined, ListingSearchParams, ListingListPage>(
        LISTING_SEARCH_ENDPOINT,
        "get",
        {
          params: {
            q: rawQuery,
            pageRequest: { page: Number(pageParam), size: 10 },
            sort: sortType,
            filter: status,
          },
        }
      );
    },
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};
