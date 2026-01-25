import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNoticeByPinPoint } from "../interface/homeInterface";
import {
  NoticeContent,
  NoticeCount,
  PopularResponse,
  SearchCategory,
  SliceResponse,
} from "../model/type";
import { useOAuthStore } from "@/src/features/login/model";
import { HOME_NOTICE_ENDPOINT, HOME_SEARCH_POPULAR_ENDPOINT } from "@/src/shared/api";
import { useHomeMaxTime } from "@/src/features/home/model/homeStore";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import { ApiCategory, CATEGORY_MAP } from "@/src/features/home/hooks/hooks";

export const useNoticeInfinite = () => {
  const pinpointId = useOAuthStore(state => state.pinPointId);

  return useInfiniteQuery({
    queryKey: ["notice", pinpointId],
    enabled: !!pinpointId,
    initialPageParam: 1,
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
    placeholderData: previousData => previousData,
    queryFn: () => getNoticeByPinPoint<NoticeCount>({ url: url, params: param }),
  });
};

export const useGlobal = <T>({ params, q }: { params: string; q: string }) => {
  const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/${params}`;

  const param = params === "popular" ? { limit: 10 } : { q: q };

  return useQuery({
    queryKey: ["global-search", params, q],
    queryFn: () => getNoticeByPinPoint<T>({ url, params: param }),
    enabled: params === "popular" || q?.length > 0,
  });
};

export const useGlobalPageNation = <T>({
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

  return useInfiniteQuery({
    queryKey: ["globalInfinity", enabled],
    enabled: enabled && Boolean(category),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getNoticeByPinPoint<SliceResponse<NoticeContent>>({
        url: url,
        params: {
          type: apiCategory,
          q,
          page: Number(pageParam),
        },
      }),
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.pages + 1 : undefined;
    },
  });
};
