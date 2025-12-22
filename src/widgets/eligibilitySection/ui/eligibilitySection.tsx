"use client";

import { EligibilityNextButton } from "@/src/features/eligibility/ui/eligibilityNextButton";
import { EligibilityStepper } from "@/src/features/eligibility/ui/common/eligibilityStepper";
import {
  eligibilityContentMap,
  ELIGIBILITY_STEPS,
  ELIGIBILITY_STEP_KEYS,
} from "@/src/features/eligibility/model/eligibilityContentMap";
import { PageTransition } from "@/src/shared/ui/animation";

export interface EligibilitySectionProps {
  type: keyof typeof eligibilityContentMap;
}

// 타입별 컴포넌트 매핑 (나중에 단계별 폼 컴포넌트 추가)
import { BasicInfoStep1FormComponent } from "@/src/features/eligibility/ui/steps/BasicInfoStep1FormComponent";
import { BasicInfoStep2FormComponent } from "@/src/features/eligibility/ui/steps/BasicInfoStep2FormComponent";
import { BasicInfoStep3FormComponent } from "@/src/features/eligibility/ui/steps/BasicInfoStep3FormComponent";
import { BasicInfoStep4FormComponent } from "@/src/features/eligibility/ui/steps/BasicInfoStep4FormComponent";

const eligibilityFormComponents: Record<string, React.ComponentType> = {
  [ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_1]: BasicInfoStep1FormComponent,
  [ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_2]: BasicInfoStep2FormComponent,
  [ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_3]: BasicInfoStep3FormComponent,
  [ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_4]: BasicInfoStep4FormComponent,
};

export const EligibilitySection = ({ type }: EligibilitySectionProps) => {
  const content = eligibilityContentMap[type];

  if (!content) {
    return <div>잘못된 접근입니다.</div>;
  }

  const { groupId } = content;

  // 현재 그룹 찾기
  const currentGroup = ELIGIBILITY_STEPS.find(step => step.id === groupId);

  // 해당 타입의 폼 컴포넌트 가져오기
  const FormComponent =
    type in eligibilityFormComponents
      ? eligibilityFormComponents[type as keyof typeof eligibilityFormComponents]
      : null;

  return (
    <section className="flex h-full w-full flex-col">
      {/* Stepper */}
      {ELIGIBILITY_STEPS.length > 0 && currentGroup && (
        <div className="px-5 pt-5">
          <EligibilityStepper steps={ELIGIBILITY_STEPS} currentStepId={groupId} />
        </div>
      )}

      <PageTransition>
        {/* 단계별 폼 컴포넌트 */}
        {FormComponent && (
          <div className="px-5">
            <FormComponent />
          </div>
        )}
      </PageTransition>

      {/* 다음 버튼 */}
      <div className="w-full flex-none px-5 pb-3">
        <EligibilityNextButton />
      </div>
    </section>
  );
};
