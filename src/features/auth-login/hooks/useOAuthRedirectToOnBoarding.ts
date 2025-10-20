"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOAuthStore } from "@/src/features/auth-login/model/authStore";
import { extractTempUserId } from "@/src/shared/utils";

export const useOAuthRedirectToOnBoarding = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTempUserId } = useOAuthStore();

  useEffect(() => {
    const stateParam = searchParams.get("state");

    if (stateParam) {
      // OAUTH2_TEMP_USER 값 추출
      const tempUserId = extractTempUserId(stateParam);

      if (tempUserId) {
        // Zustand 스토어에 저장
        setTempUserId(tempUserId);

        // onBoarding 페이지로 리다이렉션
        router.push("/onboarding/diagnosis");
      } else {
        console.error("잘못된 state 파라미터 형식:", stateParam);
        // 에러 처리 - 로그인 페이지로 리다이렉션
        router.push("/login");
      }
    }
  }, [searchParams, setTempUserId, router]);
};
