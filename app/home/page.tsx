"use client";

import { logout } from "@/src/features/login/utils/logout";
import { useRouter } from "next/navigation";

export default function OnhomePage() {
  const router = useRouter();
  const onLogout = () => {
    logout();
  };
  const onQuickSearch = () => {
    router.push("/quicksearch/init");
  };
  const onEligibility = () => {
    router.push("/eligibility/basicInfoStep1");
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">홈</h1>
      <button
        onClick={onLogout}
        className="rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600 active:bg-red-700"
      >
        로그아웃
      </button>
      <button
        onClick={onQuickSearch}
        className="rounded-lg bg-primary-blue-300 px-6 py-3 text-white hover:bg-red-600 active:bg-red-700"
      >
        빠른탐색
      </button>
      <button
        onClick={onEligibility}
        className="rounded-lg bg-primary-blue-300 px-6 py-3 text-white hover:bg-red-600 active:bg-red-700"
      >
        자격진단
      </button>
    </main>
  );
}
