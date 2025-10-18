"use client";
import { OnboardingNextButton } from "@/src/features/onboarding/ui";

interface OnboardingSectionProps {
  image: React.ReactNode;
  title: string;
  description: string;
  onNext?: () => void;
}
//git hub test
export const OnboardingSection = ({
  title,
  description,
  onNext,
  image,
}: OnboardingSectionProps) => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-between px-5 py-5">
      {/* 카드 */}
      <div className="flex flex-col items-center text-center">
        <div>{image}</div>
        {title && <h2 className="mt-6 text-xl font-semibold">{title}</h2>}
        {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
      </div>

      {/* 버튼 */}
      <div className="mt-10 w-full">
        <OnboardingNextButton />
      </div>
    </section>
  );
};
