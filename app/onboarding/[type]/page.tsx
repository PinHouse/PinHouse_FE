import { OnboardingPageClient } from "./onboardingPageClient";

type OnboardingPageProps = {
  params: Promise<{
    type: string;
  }>;
};

export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const { type } = await params;

  return <OnboardingPageClient type={type} />;
}
