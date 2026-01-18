"use client";

import { cn } from "@/lib/utils";
import { WithdrawBannerImg } from "@/src/assets/images/mypage/withdrawBannerImg";

export interface WithdrawBannerProps {
  /** 첫 번째 줄 텍스트 (예: "청년층에 해당하시네요!") */
  title: string;
  /** 두 번째 줄 텍스트 (예: "다음은 신분정보를 자세히 확인해 볼게요") */
  description: string;
  /** 추가 클래스명 */
  className?: string;
}

export const WithdrawBanner = ({ title, description, className }: WithdrawBannerProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      {/* 일러스트 영역 */}
      <div className="flex items-center justify-center">
        <WithdrawBannerImg />
      </div>
      <div>
        {/* 제목 */}
        <h2 className="text-center text-lg font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
          {title}
        </h2>

        {/* 부제목 */}
        <p className="text-center text-lg font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
          {description}
        </p>
      </div>
    </div>
  );
};
