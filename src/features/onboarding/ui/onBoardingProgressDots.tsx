import { cn } from "@/src/shared/lib/utils";
import { ONBOARDING_STEPS, OnboardingDotProps } from "../model/onboardingContentMap";

export const OnboardingProgressDots = ({ activeKey }: OnboardingDotProps) => {
  return (
    <div className="flex w-full justify-center gap-1">
      {ONBOARDING_STEPS.map(step => {
        const isActive = step.key === activeKey;

        return (
          <span
            key={step.key}
            className={cn(
              "rounded-full transition-all duration-300",
              isActive ? "h-[6px] w-[18px]" : "h-[6px] w-[6px]",
              isActive ? "bg-button-light" : "bg-gray-200"
            )}
          />
        );
      })}
    </div>
  );
};
