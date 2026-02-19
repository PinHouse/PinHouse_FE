"use client";

import { useMemo } from "react";
import { DiagnosisResultItem } from "./diagnosisResultItem";
import { HOUSING_TYPE_DESCRIPTIONS } from "./diagnosisResultConstants";

export interface DiagnosisResultListProps {
  /** API recommended 배열 (예: ["통합공공임대 : 청년 특별공급", "통합공공임대 : 신혼부부 특별공급"]) */
  recommended: string[];
  className?: string;
}

const SECTION_TITLE = "신청 가능한 임대주택";

/** "통합공공임대 : 청년 특별공급" 형태를 { housingType, applicationType } 로 파싱 */
function parseRecommendedItem(item: string): { housingType: string; applicationType: string } {
  const sep = " : ";
  const idx = item.indexOf(sep);
  if (idx === -1) {
    return { housingType: item.trim(), applicationType: "" };
  }
  return {
    housingType: item.slice(0, idx).trim(),
    applicationType: item.slice(idx + sep.length).trim(),
  };
}

/** recommended 배열을 housingType 기준으로 묶어서, 유형별 신청 가능 유형 목록으로 변환 */
function groupByHousingType(
  recommended: string[]
): Array<{ housingType: string; applicationTypes: string[] }> {
  const map = new Map<string, Set<string>>();
  for (const raw of recommended) {
    const { housingType, applicationType } = parseRecommendedItem(raw);
    if (!housingType) continue;
    if (!map.has(housingType)) map.set(housingType, new Set());
    if (applicationType) map.get(housingType)!.add(applicationType);
  }
  return Array.from(map.entries()).map(([housingType, set]) => ({
    housingType,
    applicationTypes: Array.from(set),
  }));
}

export const DiagnosisResultList = ({
  recommended,
  className,
}: DiagnosisResultListProps) => {
  const items = useMemo(() => groupByHousingType(recommended), [recommended]);

  if (items.length === 0) return null;

  return (
    <section className={className} aria-labelledby="diagnosis-result-list-title">
      <h2
        id="diagnosis-result-list-title"
        className="mb-3 text-lg font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900"
      >
        {SECTION_TITLE}
      </h2>
      <ul className="flex flex-col gap-3" role="list">
        {items.map(({ housingType, applicationTypes }) => (
          <li key={housingType}>
            <DiagnosisResultItem
              housingType={housingType}
              description={
                HOUSING_TYPE_DESCRIPTIONS[housingType] ??
                "해당 유형의 공공임대주택입니다."
              }
              applicationTypes={applicationTypes}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
