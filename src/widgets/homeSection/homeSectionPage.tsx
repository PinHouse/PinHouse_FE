import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HomeSection } from "./homeSection";
import type { NoticeContent, SliceResponse } from "@/src/entities/home/model/type";
import type { ListingItem } from "@/src/entities/listings/model/type";
import { getHomeInitialData } from "./server/getHomeInitialData";
import { eligibilityKeys, pinPointKeys } from "@/src/shared/config/queryKeys";
import { HomeStoreBootstrap } from "./ui/homeStoreBootstrap";

interface HomeSectionPageProps {
  initialChatOpen?: boolean;
  initialQuery?: string;
}

export async function HomeSectionPage({
  initialChatOpen = false,
  initialQuery = "",
}: HomeSectionPageProps) {
  const queryClient = new QueryClient();
  const { initial, initialCount, initialPinpoints, initialRecommended } = await getHomeInitialData();

  if (initial) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["notice", initial.pinpointId],
      initialPageParam: 1,
      queryFn: async () => initial.page,
      getNextPageParam: (lastPage: SliceResponse<NoticeContent>) =>
        lastPage.hasNext ? lastPage.pages + 1 : undefined,
    });
  }

  if (initialCount) {
    await queryClient.prefetchQuery({
      queryKey: ["noticeCount", initialCount.pinpointId, 60],
      queryFn: async () => ({ count: initialCount.count }),
    });
  }

  if (initialPinpoints) {
    await queryClient.prefetchQuery({
      queryKey: pinPointKeys.list(),
      queryFn: async () => initialPinpoints,
    });
  }

  if (initialRecommended && initialPinpoints?.userName) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: eligibilityKeys.recommendedList(initialPinpoints.userName),
      initialPageParam: 1,
      queryFn: async () => initialRecommended,
      getNextPageParam: (lastPage: SliceResponse<ListingItem>) =>
        lastPage.hasNext ? lastPage.pages + 1 : undefined,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex h-full flex-col">
        <HomeStoreBootstrap initialPinpoints={initialPinpoints} />
        <HomeSection initialChatOpen={initialChatOpen} initialQuery={initialQuery} />
      </main>
    </HydrationBoundary>
  );
}
