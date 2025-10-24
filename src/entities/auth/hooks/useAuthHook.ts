"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/src/shared/api/http";
import { IResponse } from "@/src/shared/types";

/**
 * 쿠키 설정 함수들
 */
const setAuthSuccess = () => {
  document.cookie = "is_auth=true; path=/; max-age=900"; // 15분=
  console.log("✅ 인증 성공 - is_auth=true 설정");
};

const setAuthFailure = () => {
  document.cookie = "is_auth=false; path=/; max-age=900"; // 15분
  console.log("❌ 인증 실패 - is_auth=false 설정");
};

/**
 * 인증 상태를 확인하는 커스텀 훅
 * 백엔드에 /user/mypage 요청을 보내서 인증 상태를 확인하고
 * 결과에 따라 is_auth 쿠키를 설정합니다.
 */
export const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // axios instance로 백엔드에 /user/mypage 요청
        const response = await http.get<IResponse>("/users/mypage");

        if (response.success) {
          setAuthSuccess();
        } else {
          setAuthFailure();
        }
      } catch (error) {
        console.error("❌ 인증 확인 중 에러:", error);
        setAuthFailure();
        router.push("/login");
      }
    };

    checkAuthStatus();
  }, [router]);
};
