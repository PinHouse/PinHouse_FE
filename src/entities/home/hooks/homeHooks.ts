import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNoticeByPinPoint } from "../interface/homeInterface";
import { NoticeContent, NoticeCount, SliceResponse } from "../model/type";
import { useOAuthStore } from "@/src/features/login/model";
import { HOME_NOTICE_ENDPOINT } from "@/src/shared/api";

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
  const param = {
    pinPointId,
    maxTime: 30,
  };
  const url = `${HOME_NOTICE_ENDPOINT}-count`;
  return useQuery({
    queryKey: ["noticeCount", pinPointId],
    enabled: !!pinPointId,
    queryFn: () => getNoticeByPinPoint<NoticeCount>({ url: url, params: param }),
  });
};
