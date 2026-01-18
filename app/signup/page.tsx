"use client";

import { Suspense } from "react";
import { useOAuthRedirectToOnBoarding } from "@/src/features/login/hooks/useOAuthRedirectToOnBoarding";
import { Spinner } from "@/src/shared/ui/spinner/default";

function SignupContent() {
  // OAuth 리다이렉트 처리
  useOAuthRedirectToOnBoarding();

  return (
    <Spinner
      title="회원 가입 중"
      description="잠시만 기다려주세요. 곧 온보딩 페이지로 이동합니다."
    />
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<Spinner title="로딩 중" description="페이지를 불러오는 중입니다." />}>
      <SignupContent />
    </Suspense>
  );
}
