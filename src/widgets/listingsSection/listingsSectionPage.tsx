import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ListingsSection } from "./ui/listingsSection";
import { prefetchNoticeQueries } from "@/src/widgets/listingsSection/server/notice/prefetchNoticeQueries";
import { getNoticeInitialData } from "@/src/widgets/listingsSection/server/notice/getNoticeInitialData";

export async function ListingsSectionPage() {
  const queryClient = new QueryClient();
  const { initial } = await getNoticeInitialData();
  await prefetchNoticeQueries({ queryClient, initial });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full flex-col">
        <ListingsSection />
      </main>
    </HydrationBoundary>
  );
}
