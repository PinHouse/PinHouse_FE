import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GlobalListType,
  NoticeContent,
  PopularResponse,
  SearchCategory,
  SliceResponse,
} from "../model/type";
import { useOAuthStore } from "@/src/features/login/model";
import {
  getHomeNoticeCountFromBff,
  getHomeNoticePageFromBff,
  getHomeRecommendedPageFromBff,
  getHomeSearchCategoryFromBff,
  getHomeSearchOverviewFromBff,
} from "@/src/entities/home/api/homeBffApi";
import { useHomeMaxTime } from "@/src/features/home/model/homeStore";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import { ApiCategory, CATEGORY_MAP } from "@/src/features/home/model/model";
import { ListingItem } from "@/src/entities/listings/model/type";
import { eligibilityKeys } from "@/src/shared/config";

export const useNoticeInfinite = () => {
  const pinpointId = useOAuthStore(state => state.pinPointId);

  return useInfiniteQuery({
    queryKey: ["notice", pinpointId],
    enabled: !!pinpointId,
    initialPageParam: 1,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    queryFn: ({ pageParam }) => getHomeNoticePageFromBff(Number(pageParam), 10, pinpointId),
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.pages + 1 : undefined;
    },
  });
};

export const useNoticeCount = () => {
  const pinPointId = useOAuthStore(state => state.pinPointId);
  const maxTime = useHomeMaxTime(s => s.maxTime);
  const debouncedMaxTime = useDebounce(maxTime, 400);
  return useQuery({
    queryKey: ["noticeCount", pinPointId, debouncedMaxTime],
    enabled: !!pinPointId,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    placeholderData: previousData => previousData,
    queryFn: () => getHomeNoticeCountFromBff(debouncedMaxTime),
  });
};

export const useHomePopularSearchCache = () => {
  const queryClient = useQueryClient();
  return {
    data: queryClient.getQueryData<PopularResponse[]>(["global-search", "popular", ""]) ?? [],
  };
};

export const useGlobal = <T = GlobalListType>({ params, q }: { params: string; q: string }) => {
  const keyword = q.trim();

  return useQuery({
    queryKey: ["global-search", params, q],
    retry: false,
    queryFn: async () => getHomeSearchOverviewFromBff(keyword) as Promise<T>,
    enabled: params === "overview" && keyword.length > 0,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
};

export const useGlobalPageNation = <TItem>({
  q,
  category,
  enabled,
}: {
  q: string;
  category: SearchCategory | null;
  enabled: boolean;
}) => {
  const apiCategory: ApiCategory | null = category ? CATEGORY_MAP[category] : null;
  const keyword = q.trim();

  return useInfiniteQuery<SliceResponse<TItem>, Error>({
    queryKey: ["globalInfinity", apiCategory, q],
    enabled: enabled && !!apiCategory && keyword.length > 0,
    initialPageParam: 2,
    retry: false,
    queryFn: ({ pageParam }) =>
      getHomeSearchCategoryFromBff({
        type: apiCategory ?? "",
        q: keyword,
        page: Number(pageParam),
      }) as Promise<SliceResponse<TItem>>,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNext ? allPages.length + 2 : undefined),
  });
};

const recommendedFetchedKey = (userId: string) => `home-recommended-fetched:${userId ?? "anon"}`;

export const useRecommendedNotice = () => {
  const { userName } = useOAuthStore();
  const isBrowser = typeof window !== "undefined";

  const fetched =
    isBrowser && !!userName
      ? sessionStorage.getItem(recommendedFetchedKey(userName)) === "query"
      : false;

  return useInfiniteQuery<SliceResponse<ListingItem>, Error>({
    queryKey: eligibilityKeys.recommendedList(userName),
    initialPageParam: 1,
    retry: false,
    enabled: isBrowser && !!userName && !fetched,
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async ({ pageParam }) => {
      const data = await getHomeRecommendedPageFromBff(Number(pageParam), 10);

      sessionStorage.setItem(recommendedFetchedKey(userName), "query");
      return data;
    },
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.pages + 1 : undefined),
  });
};
