"use client";

import { Button } from "@/src/shared/lib/headlessUi";
import { useSearchParams, useRouter } from "next/navigation";
import { useEligibilityStore } from "../model/eligibilityStore";
import { findStepById, FIRST_STEP_ID, StepId } from "../model/eligibilityDecisionTree";

export const EligibilityNextButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const data = useEligibilityStore();

  // 쿼리 파라미터에서 현재 stepId 읽기
  const currentStepId = (searchParams.get("step") || FIRST_STEP_ID) as StepId;

  // 결정트리에서 현재 단계 찾기
  const currentStep = findStepById(currentStepId);

  if (!currentStep) {
    console.warn(`Step not found: ${currentStepId}`);
    return null;
  }

  // 검증 실행
  const validationError = currentStep.validation ? currentStep.validation(data) : null;
  const isDisabled = !!validationError;

  // 다음 단계 결정
  const nextStepId = currentStep.getNextStep(data);
  const isLastStep = nextStepId === null;

  const handleClick = () => {
    if (isDisabled) {
      // 에러 메시지 표시 (필요시 toast나 alert 사용)
      if (validationError) {
        console.log(validationError);
        // TODO: toast나 alert로 표시
      }
      return;
    }

    // 마지막 단계인 경우 결과 페이지로 이동 (나중에 구현)
    if (isLastStep) {
      // router.push("/eligibility/result");
      return;
    }

    // 다음 단계로 이동
    if (nextStepId) {
      router.push(`/eligibility?step=${nextStepId}`);
    }
  };

  return (
    <Button
      variant="capsule"
      theme="mainBlue"
      size="lg"
      onClick={handleClick}
      disabled={isDisabled}
    >
      다음
    </Button>
  );
};
