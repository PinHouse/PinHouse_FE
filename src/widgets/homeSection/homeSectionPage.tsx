import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HomeSection } from "./homeSection";
import type { NoticeContent, SliceResponse } from "@/src/entities/home/model/type";

type HomeNoticeBffResponse = {
  success: boolean;
  data?: {
    pinpointId: string;
    page: SliceResponse<NoticeContent>;
  };
};

export async function HomeSectionPage() {
  const queryClient = new QueryClient();

  let initial: HomeNoticeBffResponse["data"] | null = null;
  try {
    const res = await fetch(`/api/home/notice`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const body = (await res.json()) as HomeNoticeBffResponse;
      if (body.success && body.data) {
        initial = body.data;
      }
    }
  } catch {
    initial = null;
  }

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
