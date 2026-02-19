"use client";

import ResultBannerImg from "@/src/assets/images/eligibility/resultBannerImg";
import { cn } from "@/lib/utils";

export interface DiagnosisResultBannerProps {
  /** 사용자 이름 */
  userName: string;
  /** 소득 구간 (예: "4구간" → "4분위"로 표시) */
  incomeLevel: string | null;
  /** 추천 유형 요약 (예: ["청년 특별공급", "신혼부부 특별공급"] → "청년 특별공급, 신혼부부 특별공급 으로 신청이 가능합니다") */
  applicationTypeSummary: string[];
  className?: string;
}

/** 소득 구간 문자열을 분위 표시로 변환 (예: "4구간" → "4분위") */
function toIncomeBunwi(incomeLevel: string | null): string {
  if (!incomeLevel) return "0분위";
  const match = incomeLevel.replace("구간", "").trim();
  return /^\d+$/.test(match) ? `${match}분위` : incomeLevel;
}

export const DiagnosisResultBanner = ({
  userName,
  incomeLevel,
  applicationTypeSummary,
  className,
}: DiagnosisResultBannerProps) => {
  const bunwi = toIncomeBunwi(incomeLevel);
  const summaryText =
    applicationTypeSummary.length > 0
      ? `${applicationTypeSummary.join(", ")} 으로 신청이 가능합니다`
      : "추천 매물이 있습니다";

  return (
    <div
      className={cn(
        "shadow-result-card flex gap-4 rounded-lg border border-solid border-greyscale-grey-75 bg-white px-5 py-4",
        className
      )}
      role="banner"
    >
      <div className="relative flex-shrink-0">
        <ResultBannerImg width={60} height={60} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p className="text-sm font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
          <span className="underline decoration-greyscale-grey-300 underline-offset-2">
            {userName}님은 <br />
          </span>
          <span className="underline decoration-greyscale-grey-300 underline-offset-2">
            소득 {bunwi}
          </span>
        </p>
        <p className="text-sm font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
          <span className="underline decoration-greyscale-grey-300 underline-offset-2">
            {summaryText}
          </span>
        </p>
      </div>
    </div>
  );
};
