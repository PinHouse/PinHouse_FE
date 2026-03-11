import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ListingsSearch } from "./ui/searchSection.tsx/searchSection";
import { getNoticeSearchInitialData } from "@/src/widgets/listingsSection/server/search/getNoticeInitialType";
import { prefetchNoticeSearchQueries } from "@/src/widgets/listingsSection/server/search/prefetchNoticeSearchQueries";

type ListingsSearchPageProps = {
  query?: string;
};

export async function ListingsSearchPage({ query = "" }: ListingsSearchPageProps) {
  const initial = await getNoticeSearchInitialData({ query });
  const queryClient = new QueryClient();
  await prefetchNoticeSearchQueries({
    queryClient,
    popular: initial.popular,
    initialPage: initial.initialPage,
    queryKey: initial.queryKey,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingsSearch />
    </HydrationBoundary>
  );
}
