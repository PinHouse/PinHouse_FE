import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HomeSection } from "./homeSection";
import type { NoticeContent, SliceResponse } from "@/src/entities/home/model/type";
import { getHomeInitialData } from "./server/getHomeInitialData";

export async function HomeSectionPage() {
  const queryClient = new QueryClient();
  const { initial, initialCount } = await getHomeInitialData();

  if (initial) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["notice", initial.pinpointId],
      initialPageParam: 1,
      queryFn: async () => initial.page,
      getNextPageParam: (lastPage: SliceResponse<NoticeContent>) =>
        lastPage.hasNext ? lastPage.pages + 1 : undefined,
    });
  }

  if (initial && initialCount) {
    await queryClient.prefetchQuery({
      queryKey: ["noticeCount", initial.pinpointId, 60],
      queryFn: async () => initialCount,
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
