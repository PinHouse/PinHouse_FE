"use client";

import { useEffect } from "react";
import { EligibilitySection } from "@/src/widgets/eligibilitySection";
import { useEligibilityStore } from "@/src/features/eligibility/model/eligibilityStore";

export default function EligibilityPage() {
  const reset = useEligibilityStore(state => state.reset);

  useEffect(() => {
    // 자격진단 페이지 진입 시 store 초기화
    reset();
  }, [reset]);

  return (
    <main className="flex h-full flex-col">
      <EligibilitySection />
    </main>
  );
}
