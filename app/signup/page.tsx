"use client";

import { useOAuthRedirectToOnBoarding } from "@/src/features/login/hooks/useOAuthRedirectToOnBoarding";
import { Spinner } from "@/src/shared/ui/spinner/default";

export default function SignupPage() {
  // OAuth 리다이렉트 처리
  useOAuthRedirectToOnBoarding();

  return (
    <Spinner
      title="회원가입 처리 중"
      description="잠시만 기다려주세요. 곧 온보딩 페이지로 이동합니다."
    />
  );
}
