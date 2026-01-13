"use client";

import { cn } from "@/src/shared/lib/utils";
import { Check } from "lucide-react";

export interface EligibilityStep {
  /** 단계 ID */
  id: string;
  /** 단계 라벨 (예: "개인정보", "신분정보", "자산정보") */
  label: string;
}

export interface EligibilityStepperProps {
  /** 단계 배열 */
  steps: EligibilityStep[];
  /** 현재 활성 단계 ID */
  currentStepId: string;
  /** 추가 클래스명 */
  className?: string;
}

export const EligibilityStepper = ({
  steps,
  currentStepId,
  className,
}: EligibilityStepperProps) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  const getStepStatus = (index: number): "completed" | "active" | "pending" => {
    if (index < currentStepIndex) return "completed";
    if (index === currentStepIndex) return "active";
    return "pending";
  };

  return (
    <div className={cn("aligin-center flex justify-center", className)}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            {/* 단계 아이콘 및 라벨 */}
            <div className="flex items-center gap-1">
              {/* 아이콘 */}
              <div
                className={cn(
                  "flex h-3.5 w-3.5 items-center justify-center rounded-[6px]",
                  status === "completed" && "bg-primary-blue-100",
                  status === "active" && "bg-primary-blue-300",
                  status === "pending" && "border border-greyscale-grey-100 bg-transparent"
                )}
              >
                {status === "completed" ? (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                ) : (
                  <span
                    className={cn(
                      "text-[8px] font-semibold tracking-[-0.01em]",
                      status === "active" && "text-white",
                      status === "pending" && "text-greyscale-grey-400"
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              {/* 라벨 */}
              <span
                className={cn(
                  "text-[10px] font-semibold leading-[140%] tracking-[-0.01em]",
                  status === "completed" && "text-primary-blue-100",
                  status === "active" && "text-primary-blue-300",
                  status === "pending" && "text-greyscale-grey-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* 연결선 */}
            {!isLast && (
              <div
                className={cn(
                  "mx-1 h-[1px] w-5 transition-colors",
                  index < currentStepIndex
                    ? "bg-primary-blue-300"
                    : "border-t border-dashed border-greyscale-grey-100"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
