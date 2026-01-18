import { useQuery } from "@tanstack/react-query";
import { getQuickSearchHistory } from "../api/quickSearchApi";
import { quickSearchKeys } from "@/src/shared/config/queryKeys";

/**
 * 이전 빠른 탐색 결과 조회 Hook
 */
export const useQuickSearchHistory = () => {
  return useQuery({
    queryKey: quickSearchKeys.history(),
    queryFn: getQuickSearchHistory,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
