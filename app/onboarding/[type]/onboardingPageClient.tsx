"use client";

import { onboardingContentMap } from "@/src/features/onboarding/model/onboardingContentMap";
import { OnboardingSection } from "@/src/widgets/onboardingSection";

type OnboardingPageClientProps = {
  type: string;
};

export function OnboardingPageClient({ type }: OnboardingPageClientProps) {
  const content = onboardingContentMap[type as keyof typeof onboardingContentMap];

  if (!content) return <div>잘못된 접근입니다.</div>;
  const { Icon, title, description } = content;

  return (
    <main className="flex h-full flex-col">
      <OnboardingSection image={<Icon />} title={title} description={description} type={type} />
    </main>
  );
}
