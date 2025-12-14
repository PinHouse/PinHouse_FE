import { useQuery } from "@tanstack/react-query";
import { getPinPoints } from "../api/pinpointApi";
import { pinPointKeys } from "@/src/shared/config/queryKeys";

/**
 * 핀포인트 목록 조회 Hook
 */
export const usePinPoints = () => {
  return useQuery({
    queryKey: pinPointKeys.list(),
    queryFn: getPinPoints,
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10분
  });
};
