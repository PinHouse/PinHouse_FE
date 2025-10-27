"use client";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/src/features/onboarding/api";
import { IOnboardingCompleteRequest } from "@/src/features/onboarding/model";

/**
 * 온보딩 플로우를 관리하는 커스텀 훅
 */
export const useOnboardingFlow = () => {
  const router = useRouter();
  /**
   * 다음 온보딩 단계로 이동하거나 완료 처리
   * @param currentType 현재 온보딩 타입
   * @param onboardingData 온보딩 완료 시 전송할 데이터
   */
  const handleNextStep = async (
    currentType: string,
    onboardingData?: IOnboardingCompleteRequest
  ) => {
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
          if (onboardingData) {
            const success = await completeOnboarding(onboardingData);
            if (success) {
              console.log("온보딩 완료 성공");
              router.push("/"); // 메인 페이지로 이동
              return;
            } else {
              console.error("온보딩 완료 실패");
              router.push("/");
              return;
            }
          }
          console.error("온보딩 데이터가 없습니다");
          router.push("/"); // 메인 페이지로 이동
          return;
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

  return {
    handleNextStep,
  };
};
