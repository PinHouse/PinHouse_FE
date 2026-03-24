import type { QueryClient } from "@tanstack/react-query";
import { CompareBffResponse } from "@/src/features/listings/server/bff/getCompareInitialFromBff";
import { compareNoticeQueryKey } from "@/src/shared/config";

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
      queryKey: compareNoticeQueryKey({
        noticeId: id,
        sortType,
        nearbyFacilities,
        pinPointId,
      }),
      queryFn: async () => initial,
      staleTime: 1000 * 60 * 60 * 24,
    });
  }
}
