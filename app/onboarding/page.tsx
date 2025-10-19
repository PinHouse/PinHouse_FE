"use client";
import { useOAuthStore } from "@/src/features/auth-login/model/authStore";
import { useEffect, useState } from "react";

export default function OnBoardingPage() {
  const { tempUserId, clearTempUserId } = useOAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg bg-white p-6 shadow">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">온보딩 페이지</h1>

          {tempUserId ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="font-semibold text-green-800">OAuth 로그인 성공!</h3>
                <p className="mt-1 text-sm text-green-600">
                  임시 사용자 ID: <code className="rounded bg-green-100 px-1">{tempUserId}</code>
                </p>
              </div>

              <p className="text-gray context-sm">이제 온보딩 프로세스를 진행할 수 있습니다.</p>

              <button
                onClick={clearTempUserId}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                온보딩 시작하기
              </button>
            </div>
          ) : (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <h3 className="font-semibold text-yellow-800">임시 사용자 정보 없음</h3>
              <p className="mt-1 text-sm text-yellow-600">
                OAuth 로그인 정보가 없습니다. 다시 로그인해주세요.
              </p>
              <a
                href="/login"
                className="mt-2 inline-block rounded bg-yellow-600 px-3 py-1 text-sm text-white hover:bg-yellow-700"
              >
                로그인 페이지로 이동
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
