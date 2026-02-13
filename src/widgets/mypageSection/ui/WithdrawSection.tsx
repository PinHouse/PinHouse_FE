"use client";

import { WithdrawBanner, WithdrawForm } from "@/src/features/mypage/ui";
import {
    MYPAGE_WITHDRAW_HEADER_TITLE,
  WITHDRAW_BANNER_DESCRIPTION,
  WITHDRAW_BANNER_TITLE,
} from "@/src/features/mypage/model/mypageConstants";
import { DefaultHeader } from "@/src/shared/ui/header";

/**
 * 마이페이지 회원 탈퇴 화면 위젯
 */
export const WithdrawSection = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
        <header className="relative flex items-center py-4 px-5" aria-label={MYPAGE_WITHDRAW_HEADER_TITLE}>
            <DefaultHeader title={MYPAGE_WITHDRAW_HEADER_TITLE} path="/mypage/settings" />
        </header>
        <div className="border-b border-greyscale-grey-25"></div>
      <WithdrawBanner
        className="py-6 px-5"
        title={WITHDRAW_BANNER_TITLE}
        description={WITHDRAW_BANNER_DESCRIPTION}
      />
      <div className="mb-7 h-[9px] w-full border border-greyscale-grey-50 bg-greyscale-grey-25" />
      <div className="px-5">
        <WithdrawForm />
      </div>
    </div>
  );
};
