import { useQuery } from "@tanstack/react-query";
import { getPinPoints } from "../api/pinpointApi";
import { pinPointKeys } from "@/src/shared/config/queryKeys";

export const usePinPoints = () => {
  return useQuery({
    queryKey: pinPointKeys.list(),
    queryFn: getPinPoints,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    gcTime: 10 * 60 * 1000,
  });
};
