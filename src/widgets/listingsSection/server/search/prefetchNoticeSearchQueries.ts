import type { QueryClient } from "@tanstack/react-query";
import type { ListingListPage, PopularKeywordItem } from "@/src/entities/listings/model/type";
import { ListingSearchInfiniteKey } from "@/src/widgets/listingsSection/server/search/getNoticeInitialType";

type PrefetchNoticeSearchArgs = {
  queryClient: QueryClient;
  popular: PopularKeywordItem[] | null;
  initialPage: ListingListPage | null;
  queryKey: ListingSearchInfiniteKey;
};

export async function prefetchNoticeSearchQueries({
  queryClient,
  popular,
  initialPage,
  queryKey,
}: PrefetchNoticeSearchArgs) {
  if (popular) {
    await queryClient.prefetchQuery({
      queryKey: ["popularSearch"],
      queryFn: async () => popular,
    });
  }

  if (initialPage) {
    await queryClient.prefetchInfiniteQuery({
      queryKey,
      initialPageParam: 1,
      queryFn: async () => initialPage,
      getNextPageParam: (lastPage: ListingListPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    });
  }
}
