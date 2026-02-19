"use client";

import { cn } from "@/lib/utils";
import { HOUSING_TYPE_TAG_CLASS } from "./diagnosisResultConstants";

export interface DiagnosisResultItemProps {
  /** 임대주택 유형 (예: "통합공공임대") */
  housingType: string;
  /** 유형 설명 문단 */
  description: string;
  /** 신청 가능 유형 목록 (예: ["일반 공급", "청년 특별공급"]) */
  applicationTypes: string[];
  className?: string;
}

const DEFAULT_TAG_CLASS = "bg-greyscale-grey-100 text-greyscale-grey-700";

export const DiagnosisResultItem = ({
  housingType,
  description,
  applicationTypes,
  className,
}: DiagnosisResultItemProps) => {
  const tagClass = HOUSING_TYPE_TAG_CLASS[housingType] ?? DEFAULT_TAG_CLASS;

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-lg bg-white px-5 py-4 shadow-result-card",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <span
          className={cn(
            "w-fit rounded-full px-3 py-1 text-xs font-medium",
            tagClass
          )}
        >
          {housingType}
        </span>
        <p className="text-sm leading-[140%] tracking-[-0.02em] text-greyscale-grey-700">
          {description}
        </p>
      </div>
      <div className="h-px bg-greyscale-grey-100" aria-hidden />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-greyscale-grey-500">
          신청 가능 유형
        </span>
        <div className="flex flex-wrap gap-2">
          {applicationTypes.map((type, index) => (
            <span
              key={`${type}-${index}`}
              className="rounded-full bg-greyscale-grey-100 px-3 py-1 text-xs font-medium text-greyscale-grey-700"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
