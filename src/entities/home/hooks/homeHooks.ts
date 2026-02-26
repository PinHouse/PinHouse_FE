import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNoticeByPinPoint } from "../interface/homeInterface";
import { NoticeContent, NoticeCount, SearchCategory, SliceResponse } from "../model/type";
import { useOAuthStore } from "@/src/features/login/model";
import {
  HOME_NOTICE_ENDPOINT,
  HOME_RECOMMENDED_ENDPOINT,
  HOME_SEARCH_POPULAR_ENDPOINT,
} from "@/src/shared/api";
import { useHomeMaxTime } from "@/src/features/home/model/homeStore";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import { ApiCategory, CATEGORY_MAP } from "@/src/features/home/model/model";
import { ListingItem } from "@/src/entities/listings/model/type";
import axios from "axios";
import { toast } from "sonner";

export const useNoticeInfinite = () => {
  const pinpointId = useOAuthStore(state => state.pinPointId);
  console.log(pinpointId);
  return useInfiniteQuery({
    queryKey: ["notice", pinpointId],
    enabled: !!pinpointId,
    initialPageParam: 1,
    retry: false,
    queryFn: ({ pageParam }) =>
      getNoticeByPinPoint<SliceResponse<NoticeContent>>({
        url: HOME_NOTICE_ENDPOINT,
        params: {
          pinpointId,
          page: Number(pageParam),
          offSet: 10,
        },
      }),
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.pages + 1 : undefined;
    },
  });
};

export const useNoticeCount = () => {
  const pinPointId = useOAuthStore(state => state.pinPointId);
  const maxTime = useHomeMaxTime(s => s.maxTime);
  const debouncedMaxTime = useDebounce(maxTime, 400);
  const param = {
    pinPointId,
    maxTime: maxTime,
  };
  const url = `${HOME_NOTICE_ENDPOINT}-count`;
  return useQuery({
    queryKey: ["noticeCount", pinPointId, debouncedMaxTime],
    enabled: !!pinPointId,
    retry: false,
    placeholderData: previousData => previousData,
    queryFn: () => getNoticeByPinPoint<NoticeCount>({ url: url, params: param }),
  });
};

export const useGlobal = <T>({ params, q }: { params: string; q: string }) => {
  const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/${params}`;
  const param = params === "popular" ? { limit: 10 } : { q: q };
  return useQuery({
    queryKey: ["global-search", params, q],
    retry: false,
    queryFn: () => getNoticeByPinPoint<T>({ url, params: param }),
    enabled: params === "popular" || q?.length > 0,
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
  const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/category`;
  const apiCategory: ApiCategory | null = category ? CATEGORY_MAP[category] : null;

  return useInfiniteQuery<SliceResponse<TItem>, Error>({
    queryKey: ["globalInfinity", apiCategory, q],
    enabled: enabled,
    initialPageParam: 2,
    retry: false,
    queryFn: ({ pageParam }) =>
      getNoticeByPinPoint<SliceResponse<TItem>>({
        url,
        params: {
          type: apiCategory,
          q,
          page: Number(pageParam),
        },
      }),
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
    queryKey: ["HOME_RECOMMENDED", userName],
    initialPageParam: 1,
    retry: false,
    enabled: isBrowser && !!userName && !fetched,
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async ({ pageParam }) => {
      const data = await getNoticeByPinPoint<SliceResponse<ListingItem>>({
        url: HOME_RECOMMENDED_ENDPOINT,
        params: { page: Number(pageParam), offSet: 10 },
      });

      sessionStorage.setItem(recommendedFetchedKey(userName), "query");
      return data;
    },
    getNextPageParam: lastPage => (lastPage.hasNext ? lastPage.pages + 1 : undefined),
  });
};
