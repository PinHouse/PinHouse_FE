import { ResultLifecycle } from "./resultLifecycle";
import { Metadata } from "next";
import { HydrationBoundary } from "@tanstack/react-query";
import { getHomeSearchResultInitialData } from "@/src/widgets/homeSection/server/getHomeSearchResultInitialData";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function HomeSearchResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; query?: string }>;
}) {
  const params = await searchParams;

  const q =
    typeof params.q === "string" ? params.q : typeof params.query === "string" ? params.query : "";
  // 4. URL의 q로 검색 결과 overview를 서버에서 먼저 가져와 React Query 캐시에 hydrate한다.
  const { dehydratedState } = await getHomeSearchResultInitialData(q);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ResultLifecycle q={q} />
    </HydrationBoundary>
  );
}
