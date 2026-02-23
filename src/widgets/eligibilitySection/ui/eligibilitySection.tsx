"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EligibilityNextButton } from "@/src/features/eligibility/ui/eligibilityNextButton";
import { EligibilityStepper } from "@/src/features/eligibility/ui/common/eligibilityStepper";
import { ELIGIBILITY_STEPS } from "@/src/features/eligibility/model/eligibilityContentMap";
import { EligibilityStepRenderer } from "@/src/features/eligibility/ui/steps/eligibilityStepRenderer";
import {
  findStepById,
  FIRST_STEP_ID,
  StepId,
} from "@/src/features/eligibility/model/eligibilityDecisionTree";
import { PageTransition } from "@/src/shared/ui/animation";
import { DefaultHeader } from "@/src/shared/ui/header/header/defaultHeader/defaultHeader";
import { ELIGIBILITY_COMPONENT_RENDERER_PAGE_TITLE } from "@/src/features/eligibility/model/eligibilityConstants";
import { Modal } from "@/src/shared/ui/modal/default/modal";

export const EligibilitySection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [leaveConfirmModalOpen, setLeaveConfirmModalOpen] = useState(false);

  // 쿼리 파라미터에서 현재 stepId 읽기
  const currentStepId = (searchParams.get("step") || FIRST_STEP_ID) as StepId;

  // 결정트리에서 현재 단계 찾기
  const currentStep = findStepById(currentStepId);

  if (!currentStep) {
    return <div>잘못된 접근입니다.</div>;
  }

  const { groupId } = currentStep;

  // 현재 그룹 찾기
  const currentGroup = ELIGIBILITY_STEPS.find(step => step.id === groupId);

  const handleLeaveConfirmButton = (index: number) => {
    setLeaveConfirmModalOpen(false);
    if (index === 0) router.push("/home");
  };

  return (
    <section className="flex h-full w-full flex-col">
      <PageTransition>
        {/* Header */}
        <header
          className="relative flex items-center bg-white px-5 py-4"
          aria-label={ELIGIBILITY_COMPONENT_RENDERER_PAGE_TITLE}
        >
          <DefaultHeader
            title={ELIGIBILITY_COMPONENT_RENDERER_PAGE_TITLE}
            showCloseButton
            onCloseClick={() => setLeaveConfirmModalOpen(true)}
          />
        </header>

        <Modal
          type="eligibilityLeaveConfirm"
          open={leaveConfirmModalOpen}
          showCloseButton
          onClose={() => setLeaveConfirmModalOpen(false)}
          onButtonClick={handleLeaveConfirmButton}
        />
        {/* Stepper */}
        {ELIGIBILITY_STEPS.length > 0 && currentGroup && (
          <div className="px-5 pt-5">
            <EligibilityStepper steps={ELIGIBILITY_STEPS} currentStepId={groupId} />
          </div>
        )}

        <PageTransition>
          {/* 단계별 폼 컴포넌트 */}
          <EligibilityStepRenderer stepId={currentStepId} />
        </PageTransition>

        {/* 다음 버튼 */}
        <div className="w-full flex-none px-5 pb-3">
          <EligibilityNextButton />
        </div>
      </PageTransition>
    </section>
  );
};
