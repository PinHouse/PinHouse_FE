"use client";

import { Suspense, useEffect } from "react";
import { EligibilitySection } from "@/src/widgets/eligibilitySection";
import { useEligibilityStore } from "@/src/features/eligibility/model/eligibilityStore";
import { Spinner } from "@/src/shared/ui/spinner/default";

export default function EligibilityPage() {
  const reset = useEligibilityStore(state => state.reset);

  useEffect(() => {
    // 자격진단 페이지 진입 시 store 초기화
    reset();
  }, [reset]);

  return (
    <main className="flex h-full flex-col">
      <Suspense fallback={<Spinner title="로딩 중" description="페이지를 불러오는 중입니다." />}>
        <EligibilitySection />
      </Suspense>
    </main>
  );
}
