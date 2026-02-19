"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EligibilitySection } from "@/src/widgets/eligibilitySection";
import { useEligibilityStore } from "@/src/features/eligibility/model/eligibilityStore";
import { useDiagnosisResultStore } from "@/src/features/eligibility/model/diagnosisResultStore";
import { getDiagnosisLatest } from "@/src/features/eligibility/api/diagnosisApi";
import type { DiagnosisResultData } from "@/src/features/eligibility/api/diagnosisTypes";
import { Modal } from "@/src/shared/ui/modal/default/modal";
import { Spinner } from "@/src/shared/ui/spinner/default";

export default function EligibilityPage() {
  const router = useRouter();
  const reset = useEligibilityStore(state => state.reset);
  const setDiagnosisResult = useDiagnosisResultStore(s => s.setResult);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkLatest = async () => {
      try {
        const response = await getDiagnosisLatest<DiagnosisResultData>();
        if (!mounted) return;
        const data = response?.data;
        if (data != null && typeof data === "object" && "eligible" in data) {
          setDiagnosisResult(data as DiagnosisResultData);
          setIsModalOpen(true);
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
  }, [reset, setDiagnosisResult]);

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
