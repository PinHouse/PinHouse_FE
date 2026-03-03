import { useInfiniteQuery } from "@tanstack/react-query";
import { useOAuthStore } from "@/src/features/login/model";
import { ListingItem } from "@/src/entities/listings/model/type";
import { SliceResponse } from "@/src/entities/home/model/type";
import { eligibilityKeys } from "@/src/shared/config/queryKeys";
import { getRecommendedList } from "@/src/features/eligibility/api/getRecommendedList";

const OFF_SET = 10;

export function useEligibilityRecommendedList() {
  const { userName } = useOAuthStore();

  return useInfiniteQuery<SliceResponse<ListingItem>, Error>({
    queryKey: eligibilityKeys.recommendedList(userName),
    initialPageParam: 1,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async ({ pageParam }) => {
      const res = await getRecommendedList({
        page: Number(pageParam),
        offSet: OFF_SET,
      });
      return (res as { data?: SliceResponse<ListingItem> }).data as SliceResponse<ListingItem>;
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.hasNext ? (lastPageParam as number) + 1 : undefined,
  });
}
