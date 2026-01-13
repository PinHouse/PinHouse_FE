import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getNoticeByPinPoint } from "../interface/homeInterface";
import { NoticeContent, SliceResponse } from "../model/type";
import { useOAuthStore } from "@/src/features/login/model";
import { HOME_NOTICE_ENDPOINT } from "@/src/shared/api";

export const useNoticeInfinite = () => {
  const pinpointId = useOAuthStore(state => state.pinPointId);
  return useInfiniteQuery<
    SliceResponse<NoticeContent>,
    Error,
    InfiniteData<SliceResponse<NoticeContent>>,
    [string, string],
    number
  >({
    queryKey: ["notice", pinpointId],
    initialPageParam: 1,
    enabled: !!pinpointId,
    queryFn: ({ pageParam }) =>
      getNoticeByPinPoint({
        params: {
          pinpointId: pinpointId,
          page: Number(pageParam),
          offSet: 10,
        },
        url: HOME_NOTICE_ENDPOINT,
      }),
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.pages + 1 : undefined;
    },
  });
};
