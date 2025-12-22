"use client";

import { Button } from "@/src/shared/lib/headlessUi";
import { eligibilityContentMap, ELIGIBILITY_STEP_KEYS } from "../model/eligibilityContentMap";
import { usePathname, useRouter } from "next/navigation";
import { useEligibilityStore } from "../model/eligibilityStore";

export const EligibilityNextButton = () => {
  const steps = Object.values(eligibilityContentMap) as Array<{ path: string }>;
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();
  const {
    hasKoreanNationality,
    gender,
    birthDate,
    hasIncomeWork,
    monthlyIncome,
    hasHousingSubscriptionSavings,
    housingSubscriptionPeriod,
    housingSubscriptionPaymentCount,
    totalPaymentAmount,
  } = useEligibilityStore();

  // 마지막 단계인지 확인
  const isLastStep = !next;

  // 각 페이지별 검증 로직
  const getValidationError = (): string | null => {
    if (pathname.includes(ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_1)) {
      // "예" (id: "1")를 선택했을 때만 활성화
      if (!hasKoreanNationality || hasKoreanNationality !== "1") {
        return "대한민국 국적을 선택해주세요";
      }
    }
    if (pathname.includes(ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_2)) {
      // 성별과 생년월일 모두 선택해야 활성화
      if (!gender) {
        return "성별을 선택해주세요";
      }
      if (!birthDate) {
        return "생년월일을 선택해주세요";
      }
    }
    if (pathname.includes(ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_3)) {
      // 소득 업무 종사 여부와 월평균 소득 모두 입력해야 활성화
      if (!hasIncomeWork) {
        return "소득이 발생하는 업무 종사 여부를 선택해주세요";
      }
      if (!monthlyIncome || monthlyIncome === "0") {
        return "월평균 소득을 입력해주세요";
      }
    }
    if (pathname.includes(ELIGIBILITY_STEP_KEYS.BASIC_INFO_STEP_4)) {
      // 청약저축 관련 정보 모두 입력해야 활성화
      if (!hasHousingSubscriptionSavings) {
        return "청약저축 가입 여부를 선택해주세요";
      }
      if (!housingSubscriptionPeriod) {
        return "청약저축 가입 기간을 선택해주세요";
      }
      if (!housingSubscriptionPaymentCount) {
        return "청약저축 납입횟수를 선택해주세요";
      }
      if (!totalPaymentAmount) {
        return "총 납입 금액을 선택해주세요";
      }
    }
    return null;
  };

  const validationError = getValidationError();
  const isDisabled = !!validationError;

  const handleClick = () => {
    if (isDisabled) {
      // 에러 메시지 표시 (필요시 toast나 alert 사용)
      if (validationError) {
        console.log(validationError);
      }
      return;
    }

    // 마지막 단계인 경우 결과 페이지로 이동 (나중에 구현)
    if (isLastStep) {
      // router.push("/eligibility/result");
      return;
    }

    // 다음 단계로 이동
    if (next) {
      router.push(next.path);
    }
  };

  return (
    <Button
      variant="capsule"
      theme="mainBlue"
      size="lg"
      onClick={handleClick}
      disabled={isDisabled}
    >
      다음
    </Button>
  );
};
