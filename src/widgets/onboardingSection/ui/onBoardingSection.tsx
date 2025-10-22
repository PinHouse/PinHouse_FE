"use client";
import {
  OnbaordingTagButton,
  OnboardingNextButton,
  OnboardingProgressDots,
  OnboardingSectionProps,
  OnboardingSelcted,
} from "@/src/features/onboarding/ui";
import { PageTransition } from "@/src/shared/ui/animation";
import { ENVIRONMENT_TAGS } from "@/src/shared/ui/button/tagButton/types";

export const OnboardingSection = ({ title, description, image, type }: OnboardingSectionProps) => {
  return (
    <PageTransition>
      <section className="flex h-full w-full flex-col justify-between overflow-hidden px-5 py-5">
        <OnboardingProgressDots activeKey={type} />

        <div className="mt-10 flex flex-[1] flex-col items-center justify-start overflow-y-auto text-center">
          <div className="flex">{image}</div>
          {title && <h2 className="mt-4 text-[24px] font-bold">{title}</h2>}
          {description && (
            <p className="mt-1 whitespace-pre-line text-center text-[16px] text-gray-500">
              {description}
            </p>
          )}

          {type === "agent" && (
            <div className="mt-8 w-full">
              <OnboardingSelcted />
            </div>
          )}

          {type === "environment" && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {ENVIRONMENT_TAGS.map(tag => (
                <OnbaordingTagButton key={tag.key} label={tag.label} />
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex-none py-2.5">
          <OnboardingNextButton />
        </div>
      </section>
    </PageTransition>
  );
};
