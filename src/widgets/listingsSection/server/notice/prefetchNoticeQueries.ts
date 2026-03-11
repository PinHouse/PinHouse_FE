import type { QueryClient } from "@tanstack/react-query";
import type { ListingListPage } from "@/src/entities/listings/model/type";
import { useListingsFilterStore, useListingState } from "@/src/features/listings/model";
import { ListingsNoticeBffResponse } from "@/src/features/listings/server/bff/getNoticeInitialFromBff";

type NoticeInitialData = ListingsNoticeBffResponse["data"];
type PrefetchNoticeArgs = {
  queryClient: QueryClient;
  initial: NoticeInitialData | null;
};

export async function prefetchNoticeQueries({ queryClient, initial }: PrefetchNoticeArgs) {
  if (!initial) return;

  const { regionType, rentalTypes, supplyTypes, houseTypes, sortType } =
    useListingsFilterStore.getState();
  const { status } = useListingState.getState();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "listingListInfinite",
      { regionType, rentalTypes, supplyTypes, houseTypes, sortType },
      status,
    ],
    initialPageParam: 1,
    queryFn: async () => initial.page,
    getNextPageParam: (lastPage: ListingListPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });
}
