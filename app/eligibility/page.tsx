"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EligibilitySection } from "@/src/widgets/eligibilitySection";
import { useEligibilityStore } from "@/src/features/eligibility/model/eligibilityStore";
import { useDiagnosisResultStore } from "@/src/features/eligibility/model/diagnosisResultStore";
import { getDiagnosisLatest } from "@/src/features/eligibility/api/diagnosisApi";
import type { DiagnosisLatestData } from "@/src/features/eligibility/api/diagnosisTypes";
import { Modal } from "@/src/shared/ui/modal/default/modal";
import { Spinner } from "@/src/shared/ui/spinner/default";

export default function EligibilityPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reset = useEligibilityStore(state => state.reset);
  const setDiagnosisResult = useDiagnosisResultStore(s => s.setResult);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkLatest = async () => {
      try {
        const response = await getDiagnosisLatest<DiagnosisLatestData>();
        if (!mounted) return;
        const data = response?.data as DiagnosisLatestData | undefined;
        if (data != null && typeof data === "object" && "eligible" in data) {
          setDiagnosisResult(
            {
              eligible: data.eligible,
              decisionMessage: data.diagnosisResult,
              recommended: data.recommended,
            },
            { incomeLevel: data.myIncomeLevel }
          );
          // 주소가 정확히 /eligibility 일 때만 모달 표시 (쿼리 있으면 표시 안 함)
          const isEligibilityOnly =
            pathname === "/eligibility" && searchParams.toString() === "";
          if (isEligibilityOnly) {
            setIsModalOpen(true);
          }
        } else {
          reset();
        }
      } catch {
        if (mounted) reset();
      }
    };

    checkLatest();
    return () => {
      mounted = false;
    };
  }, [pathname, reset, searchParams, setDiagnosisResult]);

  const handleModalButtonClick = (index: number) => {
    setIsModalOpen(false);
    if (index === 0) {
      setDiagnosisResult(null);
      reset();
    } else {
      router.push("/eligibility/result/final");
    }
  };

  return (
    <main className="flex h-full flex-col">
      <Suspense fallback={<Spinner title="로딩 중" description="페이지를 불러오는 중입니다." />}>
        <EligibilitySection />
      </Suspense>
      <Modal
        type="eligibilityPreviousDiagnosis"
        open={isModalOpen}
        onButtonClick={handleModalButtonClick}
      />
    </main>
  );
}
