"use client";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getListingNoticePageFromBff, getListingSearchPageFromBff } from "../api/listingsBffApi";
import { PostBasicRequest, requestListingList } from "../api/listingsApi";
import {
  LikeReturn,
  ListingListPage,
  ListingsFilterState,
  PopularKeywordItem,
  ToggleLikeVariables,
} from "../model/type";
import { LIKE_ENDPOINT, NOTICE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import {
  normalizeListingsFilterCriteria,
  DEFAULT_LISTING_SEARCH_PAGE,
  DEFAULT_LISTING_SEARCH_OFFSET,
  normalizeListingSearchCriteria,
  SearchOptions,
  useListingsFilterStore,
  useListingsSearchState,
  useListingState,
} from "@/src/features/listings/model";

import { listingListInfiniteQueryKey, listingSearchInfiniteQueryKey } from "@/src/shared/config";

export const useListingListInfiniteQuery = () => {
  const status = useListingState(state => state.status);
  const applied = useListingsFilterStore((state: ListingsFilterState) => state.applied);
  const filter = normalizeListingsFilterCriteria(applied);

  return useInfiniteQuery<ListingListPage>({
    queryKey: listingListInfiniteQueryKey({ filter, status }),
    enabled: !!status,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getListingNoticePageFromBff({
        regionType: filter.regionType,
        rentalTypes: filter.rentalTypes,
        supplyTypes: filter.supplyTypes,
        houseTypes: filter.houseTypes,
        status,
        sortType: filter.sortType,
        page: Number(pageParam),
        offSet: 10,
      }),
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};

export const useToogleLike = (resetQuery: string[]) => {
  const queryClient = useQueryClient();

  return useMutation<
    LikeReturn,
    Error,
    ToggleLikeVariables,
    {
      prevQueries: Map<string, unknown>;
    }
  >({
    retry: 0,

    mutationFn: variables => {
      return PostBasicRequest<
        LikeReturn,
        IResponse<LikeReturn>,
        { targetId: string; type: string },
        LikeReturn
      >(LIKE_ENDPOINT, variables.method, {
        targetId: variables.targetId!,
        type: variables.type,
      });
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;

      ctx.prevQueries.forEach((data, key) => {
        queryClient.setQueryData([key], data);
      });
    },

    onSettled: () => {
      fetch("/api/listings/cache", {
        method: "POST",
      }).catch(() => {
        // Query invalidation remains the primary client-side recovery path.
      });

      resetQuery.forEach(key => {
        queryClient.invalidateQueries({
          queryKey: [key],
        });
      });
    },
  });
};

export const usePopularSearchQuery = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<PopularKeywordItem[]>(["popularSearch"]) ?? null;

  return {
    data,
  };
};

export const useListingSearchInfiniteQuery = (queryOpt: SearchOptions) => {
  const { enabled = true, keepPreviousData = true, staleTime = 30000, keyword } = queryOpt;
  const sortType = useListingsSearchState(s => s.sortType);
  const status = useListingsSearchState(s => s.status);
  const criteria = normalizeListingSearchCriteria({
    keyword,
    sortType,
    status,
    page: DEFAULT_LISTING_SEARCH_PAGE,
    offSet: DEFAULT_LISTING_SEARCH_OFFSET,
  });

  return useInfiniteQuery<ListingListPage>({
    queryKey: listingSearchInfiniteQueryKey(criteria),
    enabled,
    staleTime,
    initialPageParam: 1,
    placeholderData: keepPreviousData ? oldData => oldData : undefined,
    queryFn: ({ pageParam = 1 }) =>
      getListingSearchPageFromBff({
        keyword: criteria.keyword,
        page: Number(pageParam),
        offSet: criteria.offSet,
        sortType: criteria.sortType,
        status: criteria.status,
      }),
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};
