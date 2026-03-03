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

    await queryClient.prefetchQuery({
      queryKey: ["noticeCount", initial.pinpointId, 60],
      queryFn: async () => {
        const res = await fetch(`/api/home/count?maxTime=60`, {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch home notice count");

        const body = (await res.json()) as HomeCountBffResponse;
        if (!body.success || !body.data) throw new Error("Invalid home notice count response");

        return body.data;
      },
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
