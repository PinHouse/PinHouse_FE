"use client";

import { useQuery } from "@tanstack/react-query";
import { getMypageUser } from "../api/mypageApi";
import { mypageKeys } from "@/src/shared/config/queryKeys";

/**
 * 마이페이지 진입 시 사용자 정보 조회 훅
 * GET /users/mypage
 */
export const useMypageUser = () => {
  return useQuery({
    queryKey: mypageKeys.user(),
    queryFn: getMypageUser,
    select: (response) => response.data, // MypageUserData | undefined
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
