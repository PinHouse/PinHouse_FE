import type { QueryClient } from "@tanstack/react-query";
import { CompareBffResponse } from "@/src/features/listings/server/bff/getCompareInitialFromBff";
import { cookies } from "next/headers";

type CompareInitialData = CompareBffResponse["data"];
type PrefetchNoticeArgs = {
  queryClient: QueryClient;
  initial: CompareInitialData | null;
  id: string;
  sortType: string;
  nearbyFacilities: string[];
  pinPointId: string;
};

export async function preFetchCompareQueries({
  queryClient,
  initial,
  id,
  sortType,
  nearbyFacilities,
  pinPointId,
}: PrefetchNoticeArgs) {
  if (initial) {
    await queryClient.prefetchQuery({
      queryKey: ["compareNotice", id, sortType, nearbyFacilities, pinPointId],
      queryFn: async () => initial,
    });
  }
}
