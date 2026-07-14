import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ListingsSection } from "./ui/listingsSection";
import { ListingsFilterStoreBootstrap } from "./ui/listingsFilterStoreBootstrap";
import { prefetchNoticeQueries } from "@/src/widgets/listingsSection/server/notice/prefetchNoticeQueries";
import { getNoticeInitialData } from "@/src/widgets/listingsSection/server/notice/getNoticeInitialData";
import { ListingsFilterCriteria } from "@/src/features/listings/model";

type ListingsSectionPageProps = {
  initialFilter: ListingsFilterCriteria;
  initialStatus: string;
};

export async function ListingsSectionPage({
  initialFilter,
  initialStatus,
}: ListingsSectionPageProps) {
  const queryClient = new QueryClient();
  const { initial } = await getNoticeInitialData({
    filter: initialFilter,
    status: initialStatus,
  });
  await prefetchNoticeQueries({ queryClient, initial, filter: initialFilter, status: initialStatus });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full flex-col">
        <ListingsFilterStoreBootstrap initialFilter={initialFilter} initialStatus={initialStatus} />
        <ListingsSection />
      </main>
    </HydrationBoundary>
  );
}
