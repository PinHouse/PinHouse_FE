"use client";

import { useMemo } from "react";
import { ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/src/shared/lib/headlessUi";
import {
  MYPAGE_PIN_REPORT_BUTTON,
  MYPAGE_PIN_REPORT_DESCRIPTION_LINES,
  MYPAGE_PIN_REPORT_TITLE,
  MYPAGE_PIN_REPORT_REDIAGNOSIS,
  MYPAGE_PIN_REPORT_VIEW_DETAIL,
  MYPAGE_PIN_REPORT_INCOME_LABEL,
  MYPAGE_PIN_REPORT_TARGET_LABEL,
  MYPAGE_PIN_REPORT_HOUSING_LABEL,
} from "@/src/features/mypage/model/mypageConstants";
import type { DiagnosisResultData } from "@/src/features/eligibility/api/diagnosisTypes";
import { useDiagnosisResultStore } from "@/src/features/eligibility/model/diagnosisResultStore";

interface PinReportSectionProps {
  /** 자격진단 최신 결과. 있으면 요약 카드, 없으면 '자격진단 하러가기' 빈 상태 표시 */
  diagnosisResult: DiagnosisResultData | null;
  onDiagnosisClick?: () => void;
  onRediagnosisClick?: () => void;
  onViewDetailClick?: () => void;
}

const PIN_REPORT_HEADING_ID = "pin-report-heading";
const TAG_CLASS =
  "inline-flex items-center rounded-full bg-primary-blue-100 px-2.5 py-1 text-xs font-medium text-primary-blue-700";

/** recommended 항목에서 housingType만 추출 (예: "통합공공임대 : 청년 특별공급" → "통합공공임대") */
function getUniqueHousingTypes(recommended: string[]): string[] {
  const set = new Set<string>();
  const sep = " : ";
  for (const raw of recommended) {
    const idx = raw.indexOf(sep);
    const housingType = (idx === -1 ? raw : raw.slice(0, idx)).trim();
    if (housingType) set.add(housingType);
  }
  return Array.from(set);
}

export const PinReportSection = ({
  diagnosisResult,
  onDiagnosisClick,
  onRediagnosisClick,
  onViewDetailClick,
}: PinReportSectionProps) => {
  const storeIncomeLevel = useDiagnosisResultStore(s => s.incomeLevel);

  const hasResult = diagnosisResult != null && Array.isArray(diagnosisResult.recommended);
  const incomeLevel =
    diagnosisResult?.incomeLevel ?? storeIncomeLevel ?? null;
  const targetGroups = diagnosisResult?.targetGroups ?? [];
  const housingTypes = useMemo(
    () =>
      hasResult && diagnosisResult?.recommended?.length
        ? getUniqueHousingTypes(diagnosisResult.recommended)
        : [],
    [hasResult, diagnosisResult?.recommended]
  );

  if (hasResult) {
    return (
      <section
        aria-labelledby={PIN_REPORT_HEADING_ID}
        className="flex flex-col rounded-lg bg-white"
      >
        <div className="flex items-center justify-between border-b border-greyscale-grey-50 px-4 py-4">
          <h2
            id={PIN_REPORT_HEADING_ID}
            className="text-base font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900"
          >
            {MYPAGE_PIN_REPORT_TITLE}
          </h2>
          <button
            type="button"
            onClick={onRediagnosisClick}
            className="flex items-center gap-1 text-sm font-medium text-greyscale-grey-500 hover:text-greyscale-grey-700"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            {MYPAGE_PIN_REPORT_REDIAGNOSIS}
          </button>
        </div>

        <div className="flex flex-col gap-4 px-4 py-5">
          {incomeLevel != null && incomeLevel !== "" && (
            <div>
              <h3 className="mb-2 text-sm font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                {MYPAGE_PIN_REPORT_INCOME_LABEL}
              </h3>
              <span className={TAG_CLASS}>{incomeLevel}</span>
            </div>
          )}

          {targetGroups.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                {MYPAGE_PIN_REPORT_TARGET_LABEL}
              </h3>
              <div className="flex flex-wrap gap-2">
                {targetGroups.map(label => (
                  <span key={label} className={TAG_CLASS}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {housingTypes.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                {MYPAGE_PIN_REPORT_HOUSING_LABEL}
              </h3>
              <div className="flex flex-wrap gap-2">
                {housingTypes.map(name => (
                  <span key={name} className={TAG_CLASS}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {onViewDetailClick && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={onViewDetailClick}
                className="flex items-center gap-1 text-sm font-bold text-primary-blue-600 hover:underline"
              >
                {MYPAGE_PIN_REPORT_VIEW_DETAIL}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={PIN_REPORT_HEADING_ID}
      className="flex flex-col rounded-lg bg-white"
    >
      <div className="px-4 py-4">
        <h2
          id={PIN_REPORT_HEADING_ID}
          className="border-b border-greyscale-grey-50 text-base font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900"
        >
          {MYPAGE_PIN_REPORT_TITLE}
        </h2>
      </div>
      <div className="flex flex-col items-center gap-4 px-4 py-6">
        <p className="text-center text-sm font-medium leading-[132%] tracking-[-0.012em] text-greyscale-grey-500">
          {MYPAGE_PIN_REPORT_DESCRIPTION_LINES.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        <Button
          type="button"
          variant="solid"
          size="md"
          theme="mainBlue"
          radius="xl"
          disabled={!onDiagnosisClick}
          onClick={onDiagnosisClick}
          className="w-fit px-8 py-2.5"
        >
          {MYPAGE_PIN_REPORT_BUTTON}
        </Button>
      </div>
    </section>
  );
};
