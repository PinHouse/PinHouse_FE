import "server-only";

import type { PopularResponse } from "@/src/entities/home/model/type";
import { getPopularSearchOnServer } from "@/src/features/listings/server";

export type HomeSearchTagInitialData = {
  popular: PopularResponse[] | null;
  queryKey: readonly ["global-search", "popular", ""];
};

export async function getHomeSearchTagInitialOnServer(
  limit = 10
): Promise<HomeSearchTagInitialData> {
  const popular = (await getPopularSearchOnServer(limit)) as PopularResponse[] | null;

  return {
    popular,
    queryKey: ["global-search", "popular", ""] as const,
  };
}
