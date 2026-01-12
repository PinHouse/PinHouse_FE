import { IResponse } from "@/src/shared/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UseListingsHooksWithSheet } from "../model/type";
import { getNoticeSheetFilter, PostParamsBodyRequest } from "../api/listingsApi";
import { NOTICE_ENDPOINT } from "@/src/shared/api";

export const useListingDetailNoticeSheet = <T>({ id, url }: UseListingsHooksWithSheet) => {
  const encodedId = encodeURIComponent(id);

  return useQuery<T, Error, T | null>({
    queryKey: [url],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,

    queryFn: () =>
      getNoticeSheetFilter<IResponse<T>, T>(`${NOTICE_ENDPOINT}/${encodedId}/filter/${url}`),

    select: (response: any) => {
      return response?.data ?? response ?? null;
    },
  });
};
