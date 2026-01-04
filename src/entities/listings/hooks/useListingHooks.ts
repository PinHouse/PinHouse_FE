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
  SearchOptions,
  useListingsFilterStore,
  useListingsSearchState,
  useListingState,
} from "@/src/features/listings/model";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";

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
        ListingListPage,
        IResponse<ListingListPage>,
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
  return useQuery<PopularKeywordItem[]>({
    queryKey: ["popularSearch"],
    queryFn: () =>
      requestListingList<
        PopularKeywordItem[],
        IResponse<PopularKeywordItem[]>,
        undefined,
        { limit: number },
        PopularKeywordItem[]
      >(POPULAR_SEARCH_ENDPOINT, "get", { params: { limit: 5 } }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useListingSearchInfiniteQuery = (queryOpt: SearchOptions) => {
  const { enabled = true, keepPreviousData = true, staleTime = 30000 } = queryOpt;
  const sortType = useListingsSearchState(s => s.sortType);
  const status = useListingsSearchState(s => s.status);
  const searchParams = useSearchParams();
  const keywordRaw = searchParams.get("query") ?? "";
  const keyword = keywordRaw.trim();
  const debouncedKeyword = useDebounce(keyword, 350);

  return useInfiniteQuery<ListingListPage>({
    queryKey: ["listingSearchInfinite", debouncedKeyword, sortType, status],
    enabled,
    staleTime,
    initialPageParam: 1,
    placeholderData: keepPreviousData ? oldData => oldData : undefined,
    queryFn: async ({ pageParam = 1 }) => {
      return requestListingList<
        ListingListPage,
        IResponse<ListingListPage>,
        undefined,
        ListingSearchParams,
        ListingListPage
      >(LISTING_SEARCH_ENDPOINT, "get", {
        params: {
          q: keyword,
          page: Number(pageParam),
          offSet: 10,
          sortType: sortType,
          status: status,
        },
      });
    },
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};
