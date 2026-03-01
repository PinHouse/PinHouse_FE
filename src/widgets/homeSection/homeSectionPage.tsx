import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HomeSection } from "./homeSection";
import { getHomeNoticesFirstPageOnServer } from "@/src/features/home/server/getHomeNoticesFirstPageOnServer";
import type { NoticeContent, SliceResponse } from "@/src/entities/home/model/type";

export async function HomeSectionPage() {
  const queryClient = new QueryClient();
  const initial = await getHomeNoticesFirstPageOnServer();

  if (initial) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["notice", initial.pinpointId],
      initialPageParam: 1,
      queryFn: async () => initial.page,
      getNextPageParam: (lastPage: SliceResponse<NoticeContent>) =>
        lastPage.hasNext ? lastPage.pages + 1 : undefined,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full flex-col">
        <HomeSection />
      </main>
    </HydrationBoundary>
  );
}
