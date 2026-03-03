import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HomeSection } from "./homeSection";
import type { NoticeContent, NoticeCount, SliceResponse } from "@/src/entities/home/model/type";

type HomeNoticeBffResponse = {
  success: boolean;
  data?: {
    pinpointId: string;
    page: SliceResponse<NoticeContent>;
  };
};

type HomeCountBffResponse = {
  success: boolean;
  data?: NoticeCount;
};

export async function HomeSectionPage() {
  const queryClient = new QueryClient();

  let initial: HomeNoticeBffResponse["data"] | null = null;
  let initialCountBffResponse: HomeCountBffResponse["data"] | null = null;

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

  try {
    const res = await fetch(`/api/home/count?maxTime=60`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const body = (await res.json()) as HomeCountBffResponse;
      if (body.success && body.data) {
        initialCountBffResponse = body.data;
      }
    }
  } catch {
    initialCountBffResponse = null;
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

  if (initial && initialCountBffResponse) {
    await queryClient.prefetchQuery({
      queryKey: ["noticeCount", initial.pinpointId, 60],
      queryFn: async () => initialCountBffResponse,
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
