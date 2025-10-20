"use client";

import { IOnboardingCompleteRequest } from "@/src/features/onboarding/model";
import { onboardingContentMap } from "@/src/features/onboarding/model/onboardingContentMap";
import { useOnboardingFlow } from "@/src/features/onboarding/hooks";
import { OnboardingSection } from "@/src/widgets/onboardingSection";
import { useParams } from "next/navigation";

export default function OnboardingPage() {
  const { type } = useParams(); // e.g. "compare" | "diagnosis" | "agent"
  const { handleNextStep } = useOnboardingFlow();
  const content = onboardingContentMap[type as keyof typeof onboardingContentMap];

  if (!content) return <div>잘못된 접근입니다.</div>;

  const { Icon, title, description } = content;

  /**
   * TODO: 회원 가입 요청 샘플 추후 백엔드 API 연동 완료되면 삭제 요망
   */
  const sampleRequestOnBoarding: IOnboardingCompleteRequest = {
    facilityTypes: ["도서관", "산책로"],
    pinpoint: {
      address: "테스트 주소",
      name: "핀 포인트 샘플",
      first: true,
    },
  };

  const handleOnNext = () => {
    handleNextStep(type as string, sampleRequestOnBoarding);
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <OnboardingSection
        image={<Icon />}
        title={title}
        description={description}
        onNext={handleOnNext}
      />
    </main>
  );
}
