"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/src/shared/lib/headlessUi";
import { useSearchParams, useRouter } from "next/navigation";
import { useEligibilityStore } from "../model/eligibilityStore";
import {
  findStepById,
  FIRST_STEP_ID,
  StepId,
  ValidationResult,
} from "../model/eligibilityDecisionTree";
import { toast } from "sonner";

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
  const validationError: ValidationResult = currentStep.validation
    ? currentStep.validation(data)
    : null;
  const isDisabled = !!validationError;

  // validationError가 변경되었을 때 Toast 표시 (객체이고 toast가 true인 경우)
  const prevErrorRef = useRef<ValidationResult>(null);
  useEffect(() => {
    if (
      validationError &&
      typeof validationError === "object" &&
      "message" in validationError &&
      validationError.toast &&
      prevErrorRef.current !== validationError
    ) {
      toast.error(validationError.message);
    }
    prevErrorRef.current = validationError;
  }, [validationError]);

  // 다음 단계 결정
  const nextStepId = currentStep.getNextStep(data);
  const isLastStep = nextStepId === null;

  const handleClick = () => {
    // validation을 다시 체크 (버튼이 disabled가 아니어도 클릭 시점에 재검증)
    const error: ValidationResult = currentStep.validation ? currentStep.validation(data) : null;

    if (error) {
      // ValidationError 객체인지 문자열인지 확인
      if (typeof error === "object" && "message" in error) {
        // ValidationError 객체인 경우
        if (error.toast) {
          toast.error(error.message);
        }
      } else if (typeof error === "string") {
        // 문자열인 경우 (기존 호환성 유지, toast 표시 안함)
        // 필요시 여기서 toast 표시할 수도 있음
      }
      return;
    }

    // 마지막 단계인 경우 진단종료 페이지로 이동
    if (isLastStep) {
      router.push("/eligibility?step=diagnosisEnd");
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
