"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosisResultStore } from "@/src/features/eligibility/model/diagnosisResultStore";
import { DiagnosisResultBanner, DiagnosisResultList } from "@/src/features/eligibility/ui/result";
import { RightIconDefaultHeader } from "@/src/shared/ui/header";
import { ErrorState } from "@/src/shared/ui/errorState";
import { useOAuthStore } from "@/src/features/login/model/authStore";
import { PageTransition } from "@/src/shared/ui/animation/pageTransition";

const FINAL_RESULT_PAGE_TITLE = "진단 결과";
const INELIGIBLE_MESSAGE = "조건 미충족으로 인해 자격미달입니다.";
const NULL_RESULT_MESSAGE = "결과가 없습니다.";

/** "통합공공임대 : 청년 특별공급" 에서 신청 유형만 추출 (배너 요약용) */
function getApplicationTypeSummary(recommended: string[], maxCount = 3): string[] {
  const sep = " : ";
  const set = new Set<string>();
  for (const raw of recommended) {
    const idx = raw.indexOf(sep);
    const applicationType = idx === -1 ? raw.trim() : raw.slice(idx + sep.length).trim();
    if (applicationType) set.add(applicationType);
    if (set.size >= maxCount) break;
  }
  return Array.from(set);
}

export const EligibilityFinalResultSection = () => {
  const router = useRouter();
  const result = useDiagnosisResultStore(s => s.result);
  const incomeLevel = useDiagnosisResultStore(s => s.incomeLevel);
  const { userName } = useOAuthStore();

  const applicationTypeSummary = useMemo(
    () => (result?.recommended ? getApplicationTypeSummary(result.recommended) : []),
    [result?.recommended]
  );

  const showErrorState = result === null || !result.eligible;

  if (showErrorState) {
    return (
      <section className="flex h-full flex-col">
        <PageTransition>
          <header
            className="relative flex items-center bg-white px-5 py-4"
            aria-label={FINAL_RESULT_PAGE_TITLE}
          >
            <RightIconDefaultHeader
              title={FINAL_RESULT_PAGE_TITLE}
              onRightClick={() => router.push("/home")}
            />
          </header>
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-greyscale-grey-25 px-5">
            <ErrorState
              text={result === null ? NULL_RESULT_MESSAGE : INELIGIBLE_MESSAGE}
              className="flex h-full min-h-0 w-full flex-col items-center justify-center px-0"
            />
          </div>
        </PageTransition>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col">
      <PageTransition>
        <header
          className="relative flex items-center bg-white px-5 py-4"
          aria-label={FINAL_RESULT_PAGE_TITLE}
        >
          <RightIconDefaultHeader
            title={FINAL_RESULT_PAGE_TITLE}
            onRightClick={() => router.push("/home")}
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 px-5 pb-5">
          <DiagnosisResultBanner
            userName={userName ?? "회원"}
            incomeLevel={incomeLevel}
            applicationTypeSummary={applicationTypeSummary}
          />
          {result.recommended.length > 0 && (
            <DiagnosisResultList recommended={result.recommended} />
          )}
        </div>
      </PageTransition>
    </section>
  );
};
