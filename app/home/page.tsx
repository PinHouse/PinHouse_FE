"use client";

import { logout } from "@/src/features/login/utils/logout";

export default function OnhomePage() {
  const onLogout = () => {
    logout();
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
    </main>
  );
}
