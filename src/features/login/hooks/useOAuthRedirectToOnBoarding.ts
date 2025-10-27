"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOAuthStore } from "@/src/features/login/model/authStore";

export const useOAuthRedirectToOnBoarding = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTempUserId } = useOAuthStore();

  useEffect(() => {
    // searchParams가 로드될 때까지 기다림
    if (!searchParams) return;

    const stateParam = searchParams.get("state");

    if (stateParam) {
      const tempUserId = stateParam;
      // Zustand 스토어에 저장
      setTempUserId(tempUserId);
      // onBoarding 페이지로 리다이렉션
      router.push("/onboarding/diagnosis");
    } else {
      console.error("잘못된 state 파라미터 형식:", stateParam);
      // 에러 처리 - 로그인 페이지로 리다이렉션
      router.push("/login");
    }
  }, [searchParams, setTempUserId, router]);
};
