"use client";
import { useOAuthRedirectToOnBoarding } from "@/src/features/auth-login/hooks/useOAuthRedirectToOnBoarding";

export default function SignupPage() {
  // OAuth 리다이렉트 처리
  useOAuthRedirectToOnBoarding();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">로그인 처리 중...</h2>
        <p className="mt-2 text-sm text-gray-600">
          잠시만 기다려주세요. 곧 온보딩 페이지로 이동합니다.
        </p>
      </div>
    </div>
  );
}
