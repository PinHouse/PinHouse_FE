import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getHomeSearchOverviewFromBff } from "@/src/features/home/server/bff/getHomeSearchFromBff";

export async function getHomeSearchResultInitialData(q: string) {
  const queryClient = new QueryClient();
  const keyword = q.trim();

  if (keyword) {
    // 5. 서버 컴포넌트에서 내부 BFF route(/api/home/search/overview)를 호출한다.
    const initial = await getHomeSearchOverviewFromBff(keyword);

    if (initial) {
      await queryClient.prefetchQuery({
        queryKey: ["global-search", "overview", keyword],
        queryFn: async () => initial,
        staleTime: 30_000,
      });
    }
  }

  return {
    dehydratedState: dehydrate(queryClient),
  };
}
