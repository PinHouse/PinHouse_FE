"use client";

import { onboardingContentMap } from "@/src/features/onboarding/model/onboardingContentMap";
import { OnboardingSection } from "@/src/widgets/onboardingSection";
import { useParams } from "next/navigation";

export default function OnboardingPage() {
  const { type } = useParams(); // e.g. "compare" | "diagnosis" | "agent"
  const content = onboardingContentMap[type as keyof typeof onboardingContentMap];

  if (!content) return <div>잘못된 접근입니다.</div>;

  const { Icon, title, description } = content;

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <OnboardingSection image={<Icon />} title={title} description={description} />
    </main>
  );
}
