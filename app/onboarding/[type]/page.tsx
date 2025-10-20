"use client";

import { onboardingContentMap } from "@/src/features/onboarding/model/onboardingContentMap";
import { OnboardingSection } from "@/src/widgets/onboardingSection";
import { useParams, useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { type } = useParams(); // e.g. "compare" | "diagnosis" | "agent"
  const router = useRouter();
  const content = onboardingContentMap[type as keyof typeof onboardingContentMap];

  if (!content) return <div>잘못된 접근입니다.</div>;

  const { Icon, title, description } = content;

  const handelOnNext = async () => {
    const currentType = type as string;

    // 온보딩 순서: diagnosis -> compare -> agent
    switch (currentType) {
      case "diagnosis":
        router.push("/onboarding/compare");
        break;
      case "compare":
        router.push("/onboarding/agent");
        break;
      case "agent":
        // 마지막 단계에서는 백엔드 요청을 보내고 메인 페이지로 이동
        try {
          //   await completeOnboarding({
          //     preferences: {
          //       // TODO: 각 단계에서 수집한 사용자 데이터를 여기에 추가
          //       diagnosis: {},
          //       compare: {},
          //       agent: {},
          //     },
          //   });
          console.log("온보딩 완료 성공");
          router.push("/"); // 메인 페이지로 이동
        } catch (error) {
          console.error("온보딩 완료 실패:", error);
          // 에러가 발생해도 메인 페이지로 이동 (사용자 경험 고려)
          router.push("/");
        }
        break;
      default:
        console.error("알 수 없는 온보딩 타입:", currentType);
    }
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <OnboardingSection
        image={<Icon />}
        title={title}
        description={description}
        onNext={handelOnNext}
      />
    </main>
  );
}
