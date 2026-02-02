"use client";

import { onboardingContentMap } from "../model/onboardingContentMap";
import { usePathname, useRouter } from "next/navigation";
import { useAddressStore } from "@/src/entities/address";
import { onBoardingButtonPreset } from "@/src/shared/ui/button/preset";
import { useEnvtagStore } from "@/src/entities/tag/envTag";
import { useOnboardingFlow } from "@/src/features/onboarding/hooks";
import { Button } from "@/src/shared/lib/headlessUi";

export const OnboardingNextButton = () => {
  const steps = Object.values(onboardingContentMap);
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();
  const { address, pinPoint } = useAddressStore();
  const btnDisable = pathname.includes("/agent") && address === "" ? true : false;

  // 마지막 단계
  const isLastStep = currentIndex === steps.length - 1;
  const { envTag } = useEnvtagStore();
  const { onCompleteOnboarding, isLoading } = useOnboardingFlow({
    pinpointData: isLastStep
      ? {
          address,
          name: pinPoint || "핀 포인트",
          first: false,
        }
      : undefined,
    onSuccess: () => {
      // 모든 작업이 완료되면 메인 페이지로 리다이렉트
      router.push("/");
    },
    onError: error => {
      console.error("온보딩 완료 또는 핀포인트 설정 중 에러:", error);
      // 에러 발생 시에도 메인 페이지로 이동
      router.push("/");
    },
  });

  const handleClick = async () => {
    if (isLastStep) {
      /*
       * TODO: 백엔드에 FacilityType 동기화 완료 여부 문의 후 반영
       */
      console.log(envTag);
      try {
        await onCompleteOnboarding({ facilityTypes: [] });
      } catch (error) {
        console.error("온보딩 완료 중 에러:", error);
      }
    } else {
      // 다음 단계로 이동
      next && router.push(next.path);
    }
  };

  return (
    <Button {...onBoardingButtonPreset} onClick={handleClick} disabled={btnDisable || isLoading}>
      {isLoading ? "처리 중..." : isLastStep ? "완료" : "다음"}
    </Button>
  );
};
