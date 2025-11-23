"use client";

import { Button } from "@/src/shared/lib/headlessUi";
import { quickSearchStepCardContentMap } from "../../model/quickSearch.constants";
import { usePathname, useRouter } from "next/navigation";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";

export const QuickSearchNextButton = () => {
  const steps = Object.values(quickSearchStepCardContentMap);
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();
  const { livingNumber, minSize, maxSize } = useQuickSearchStore();

  // 각 페이지별 검증 로직
  const getValidationError = (): string | null => {
    if (pathname.includes("chooseLivingNumber")) {
      if (!livingNumber) return "거주 인원을 선택해주세요";
    }
    if (pathname.includes("chooseRoomSize")) {
      if (minSize > 0 && maxSize > 0 && maxSize < minSize) {
        return "최대 평수는 최소 평수보다 크거나 같아야 합니다";
      }
    }
    return null;
  };

  const validationError = getValidationError();
  const isDisabled = !!validationError;

  const handleClick = async () => {
    if (isDisabled) {
      // 에러 메시지 표시 (필요시 toast나 alert 사용)
      alert(validationError);
      return;
    }
    next && router.push(next.path);
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
