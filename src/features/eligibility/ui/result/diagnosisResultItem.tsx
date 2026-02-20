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
        "shadow-result-card flex flex-col gap-3 rounded-lg border border-solid border-greyscale-grey-75 bg-white",
        className
      )}
    >
      <div className="flex flex-row items-center gap-3 px-3.5 py-3.5">
        <span
          className={cn(
            tagClass,
            "flex min-w-[60px] shrink-0 items-center justify-center rounded-lg px-1 py-[3px] text-xs-10 font-semibold tracking-[-0.01em]"
          )}
        >
          {housingType}
        </span>
        <p className="text-xs-10 font-medium leading-[134%] text-greyscale-grey-800">
          {description}
        </p>
      </div>
      <div className="flex flex-row gap-3 rounded-b-lg bg-greyscale-grey-25 px-3.5 py-3.5">
        <span className="shrink-0 text-xs-10 font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-600">
          신청 가능 유형
        </span>
        <div className="flex flex-wrap gap-1">
          {applicationTypes.map((type, index) => (
            <span
              key={`${type}-${index}`}
              className="font-regular rounded border border-greyscale-grey-100 bg-white px-1 py-[0.75px] text-xs-10 tracking-[-0.01em] text-greyscale-grey-600"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
