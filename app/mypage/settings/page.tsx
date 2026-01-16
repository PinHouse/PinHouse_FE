"use client";

import Link from "next/link";
import { logout } from "@/src/features/login/utils/logout";

export default function MypageSettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white px-5">
      <div className="flex flex-col">
        <Link
          href="/mypage/profile"
          className="font-regular block w-full px-5 py-3 text-base leading-[140%] tracking-[-0.02em] text-greyscale-grey-900 hover:no-underline"
        >
          프로필 설정
        </Link>
        <div className="-mx-[20px] h-[9px] border-t border-greyscale-grey-50 bg-greyscale-grey-25"></div>

        <button
          type="button"
          onClick={logout}
          className="font-regular block w-full px-5 py-3 text-left text-base leading-[140%] tracking-[-0.02em] text-greyscale-grey-900"
        >
          로그아웃
        </button>

        <Link
          href="/mypage/withdraw"
          className="font-regular block w-full px-5 py-3 text-base leading-[140%] tracking-[-0.02em] text-greyscale-grey-900 hover:no-underline"
        >
          회원 탈퇴
        </Link>
      </div>
    </div>
  );
}
