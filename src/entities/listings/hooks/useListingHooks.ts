"use client";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getListingNoticePageFromBff, getListingSearchPageFromBff } from "../api/listingsBffApi";
import { PostBasicRequest, requestListingList } from "../api/listingsApi";
import {
  LikeReturn,
  ListingListPage,
  PopularKeywordItem,
  ToggleLikeVariables,
} from "../model/type";
import { LIKE_ENDPOINT, NOTICE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import {
  SearchOptions,
  useListingsFilterStore,
  useListingsSearchState,
  useListingState,
} from "@/src/features/listings/model";

import { listingListInfiniteQueryKey, listingSearchInfiniteQueryKey } from "@/src/shared/config";

export const useListingListInfiniteQuery = () => {
  const status = useListingState(state => state.status);
  const regionType = useListingsFilterStore(s => s.regionType);
  const rentalTypes = useListingsFilterStore(s => s.rentalTypes);
  const supplyTypes = useListingsFilterStore(s => s.supplyTypes);
  const houseTypes = useListingsFilterStore(s => s.houseTypes);
  const sortType = useListingsFilterStore(s => s.sortType);

  const filter = {
    regionType,
    rentalTypes,
    supplyTypes,
    houseTypes,
    sortType,
  };

  return useInfiniteQuery<ListingListPage>({
    queryKey: listingListInfiniteQueryKey({ filter, status }),
    enabled: !!status,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getListingNoticePageFromBff({
        regionType,
        rentalTypes,
        supplyTypes,
        houseTypes,
        status,
        sortType,
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

  return useInfiniteQuery<ListingListPage>({
    queryKey: listingSearchInfiniteQueryKey({ keyword, sortType, status }),
    enabled,
    staleTime,
    initialPageParam: 1,
    placeholderData: keepPreviousData ? oldData => oldData : undefined,
    queryFn: ({ pageParam = 1 }) =>
      getListingSearchPageFromBff({
        q: keyword,
        page: Number(pageParam),
        offSet: 10,
        sortType,
        status,
      }),
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};
