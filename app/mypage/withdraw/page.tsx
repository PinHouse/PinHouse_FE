"use client";

import { WithdrawForm } from "@/src/features/mypage/ui/withdrawForm";
import { WithdrawBanner } from "@/src/features/mypage/ui";

export default function WithdrawPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 상단 아이콘 및 문구 */}
      <WithdrawBanner
        className="py-6"
        title="그동안 핀하우스를 이용해 주셔서 감사합니다."
        description="탈퇴 사유를 알려주시면 서비스 개선에 참고하겠습니다."
      />

      {/* 구분선 */}
      <div className="mb-7 h-[9px] w-full border border-greyscale-grey-50 bg-greyscale-grey-25" />

      {/* 탈퇴 폼 */}
      <div className="px-5">
        <WithdrawForm />
      </div>
    </div>
  );
}
