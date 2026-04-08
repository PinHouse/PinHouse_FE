import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getHomeSearchTagInitialOnServer } from "@/src/features/home/server/callServer/getHomeSearchTagInitialOnServer";

export async function getHomeSearchTagInitialData(limit = 10) {
  const queryClient = new QueryClient();
  const initial = await getHomeSearchTagInitialOnServer(limit);

  if (initial.popular) {
    await queryClient.prefetchQuery({
      queryKey: initial.queryKey,
      queryFn: async () => initial.popular,
    });
  }

  return {
    dehydratedState: dehydrate(queryClient),
  };
}
