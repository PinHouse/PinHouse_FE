import { useQuery } from "@tanstack/react-query";
import { UseListingsHooksWithSheet } from "../model/type";
import { getListingDetailFilterFromBff } from "../api/listingDetailBffApi";

export const useListingDetailNoticeSheet = <T>({ id, url }: UseListingsHooksWithSheet) => {
  const encodedId = encodeURIComponent(id);

  return useQuery<T, Error, T | null>({
    queryKey: [url],
    enabled: !!id && !!url,
    staleTime: 1000 * 60 * 5,

    queryFn: () =>
      getListingDetailFilterFromBff<T>({
        noticeId: id,
        filterType: url,
      }),

    select: response => {
      return response ?? null;
    },
  });
};
