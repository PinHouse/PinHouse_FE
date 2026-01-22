import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNoticeByPinPoint } from "../interface/homeInterface";
import { NoticeContent, NoticeCount, PopularResponse, SliceResponse } from "../model/type";
import { useOAuthStore } from "@/src/features/login/model";
import { HOME_NOTICE_ENDPOINT, HOME_SEARCH_POPULAR_ENDPOINT } from "@/src/shared/api";
import { useHomeMaxTime } from "@/src/features/home/model/homeStore";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";

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

export const useGlobalPopular = () => {
  const param = {
    limit: 10,
  };
  const url = `${HOME_SEARCH_POPULAR_ENDPOINT}/popular`;
  return useQuery({
    queryKey: ["globalPopular"],
    placeholderData: previousData => previousData,
    queryFn: () => getNoticeByPinPoint<PopularResponse[]>({ url: url, params: param }),
  });
};
