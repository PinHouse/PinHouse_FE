import { HomeSearchTag } from "@/src/widgets/homeSection";
import { HydrationBoundary } from "@tanstack/react-query";
import { getHomeSearchTagInitialData } from "@/src/widgets/homeSection/server/getHomeSearchTagInitialData";

export default async function SearchHomePage() {
  const { dehydratedState } = await getHomeSearchTagInitialData(10);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeSearchTag />
    </HydrationBoundary>
  );
}
