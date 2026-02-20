"use client";

import { useRouter } from "next/navigation";
import { useEligibilityStore } from "@/src/features/eligibility/model/eligibilityStore";
import { useDiagnosisResult } from "@/src/features/eligibility/hooks/useDiagnosisResult";
import { useDiagnosisResultStore } from "@/src/features/eligibility/model/diagnosisResultStore";
import { mapEligibilityToDiagnosisRequest } from "@/src/features/eligibility/api/mapEligibilityToDiagnosisRequest";
import {
  ELIGIBILITY_RESULT_BUTTON,
  ELIGIBILITY_RESULT_PAGE_TITLE,
} from "@/src/features/eligibility/model/eligibilityConstants";
import {
  EligibilityResultBanner,
  EligibilityResultList,
} from "@/src/features/eligibility/ui/result";
import EligibilityLoadingState from "@/src/features/eligibility/ui/common/eligibilityLoadingState";
import { DefaultHeader } from "@/src/shared/ui/header";
import { Button } from "@/src/shared/lib/headlessUi/button/button";
import { useOAuthStore } from "@/src/features/login/model/authStore";
import { toast } from "sonner";
import { PageTransition } from "@/src/shared/ui/animation/pageTransition";

export const EligibilityResultSection = () => {
  const router = useRouter();
  const data = useEligibilityStore();
  const { userName } = useOAuthStore();
  const { submit, isLoading, error } = useDiagnosisResult();
  const setDiagnosisResult = useDiagnosisResultStore(s => s.setResult);

  const handleResultClick = async () => {
    try {
      const resultData = await submit();
      if (resultData) {
        const body = mapEligibilityToDiagnosisRequest(data);
        setDiagnosisResult(resultData, { incomeLevel: body.incomeLevel });
        router.push("/eligibility/result/final");
      } else {
        toast.error("진단 결과를 받지 못했어요. 다시 시도해 주세요.");
      }
    } catch {
      toast.error("진단 요청에 실패했어요. 다시 시도해 주세요.");
    }
  };

  return (
    <section className="flex h-full flex-col">
      <PageTransition>
        <header
          className="relative flex items-center bg-white px-5 py-4"
          aria-label={ELIGIBILITY_RESULT_PAGE_TITLE}
        >
          <DefaultHeader title={ELIGIBILITY_RESULT_PAGE_TITLE} path="/eligibility" />
        </header>
        {isLoading ? (
          <div className="flex flex-1 flex-col">
            <EligibilityLoadingState />
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-4 bg-greyscale-grey-25 px-5 pb-5">
              <EligibilityResultBanner userName={userName} />
              <EligibilityResultList data={data} />
            </div>
            <div className="bg-greyscale-grey-25 px-5">
              <Button
                type="button"
                variant="capsule"
                size="lg"
                theme="mainBlue"
                radius="xl"
                onClick={handleResultClick}
              >
                {ELIGIBILITY_RESULT_BUTTON}
              </Button>
              {error && (
                <p className="mt-2 text-sm text-red-500" role="alert">
                  {error.message}
                </p>
              )}
            </div>
          </>
        )}
      </PageTransition>
    </section>
  );
};
