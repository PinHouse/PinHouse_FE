"use client";

import { findStepById, StepId } from "../../model/eligibilityDecisionTree";
import { EligibilityComponentRenderer } from "../common/eligibilityComponentRenderer";

export interface EligibilityStepRendererProps {
  /** 단계 ID */
  stepId: StepId;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * stepId를 받아서 해당 단계의 컴포넌트들을 렌더링
 */
export const EligibilityStepRenderer = ({ stepId, className }: EligibilityStepRendererProps) => {
  // 결정트리에서 단계 찾기
  const step = findStepById(stepId);

  if (!step) {
    console.warn(`Step not found: ${stepId}`);
    return null;
  }

  return (
    <div className={className}>
      {step.components.map((componentConfig, index) => {
        // 첫 번째 컴포넌트가 statusBanner가 아닌 경우, divider 추가
        const isFirstNonBanner = index === 0 && componentConfig.type !== "statusBanner";
        const prevComponent = index > 0 ? step.components[index - 1] : null;
        const needsDivider =
          prevComponent?.type === "statusBanner" && componentConfig.type !== "statusBanner";

        return (
          <div key={index}>
            {/* Divider (statusBanner 다음에만 표시) */}
            {needsDivider && (
              <div className="mx-[-20px] h-[9px] border-t border-greyscale-grey-50 bg-greyscale-grey-25" />
            )}

            {/* 컴포넌트 렌더링 */}
            <div className={componentConfig.type === "statusBanner" ? "px-5 py-10" : "px-5 py-7"}>
              <EligibilityComponentRenderer config={componentConfig} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
