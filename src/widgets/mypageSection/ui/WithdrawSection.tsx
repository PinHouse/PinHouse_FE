"use client";

import { WithdrawBanner, WithdrawForm } from "@/src/features/mypage/ui";
import {
  WITHDRAW_BANNER_DESCRIPTION,
  WITHDRAW_BANNER_TITLE,
} from "@/src/features/mypage/model/mypageConstants";

/**
 * 마이페이지 회원 탈퇴 화면 위젯
 */
export const WithdrawSection = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
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
