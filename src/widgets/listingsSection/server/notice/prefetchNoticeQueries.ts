import type { QueryClient } from "@tanstack/react-query";
import type { ListingListPage } from "@/src/entities/listings/model/type";
import { ListingsFilterCriteria } from "@/src/features/listings/model";
import { ListingsNoticeBffResponse } from "@/src/features/listings/server/bff/getNoticeInitialFromBff";
import { listingListInfiniteQueryKey } from "@/src/shared/config";

type NoticeInitialData = ListingsNoticeBffResponse["data"];
type PrefetchNoticeArgs = {
  queryClient: QueryClient;
  initial: NoticeInitialData | null;
  filter: ListingsFilterCriteria;
  status: string;
};

export async function prefetchNoticeQueries({
  queryClient,
  initial,
  filter,
  status,
}: PrefetchNoticeArgs) {
  if (!initial) return;

  await queryClient.prefetchInfiniteQuery({
    queryKey: listingListInfiniteQueryKey({ filter, status }),
    initialPageParam: 1,
    queryFn: async () => initial.page,
    getNextPageParam: (lastPage: ListingListPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });
}
