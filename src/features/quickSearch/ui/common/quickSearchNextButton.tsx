"use client";

import { Button } from "@/src/shared/lib/headlessUi";
import { quickSearchStepCardContentMap } from "../../model/quickSearch.constants";
import { usePathname, useRouter } from "next/navigation";
import { useQuickSearchStore } from "@/src/features/quickSearch/model/quickSearchStore";
import { useMutation } from "@tanstack/react-query";
import { postQuickSearchFast } from "../../api/quickSearchApi";

export const QuickSearchNextButton = () => {
  const steps = Object.values(quickSearchStepCardContentMap);
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();
  const quickSearchData = useQuickSearchStore();
  const { livingNumber, minSize, maxSize } = quickSearchData;

  // 마지막 단계인지 확인
  const isLastStep = !next;

  // 빠른 검색 API mutation
  const searchMutation = useMutation({
    mutationFn: (data: Parameters<typeof postQuickSearchFast>[0]) => postQuickSearchFast(data),
    onSuccess: () => {
      // 성공 시 결과 페이지로 이동
      router.push("/quicksearch/result");
    },
    onError: error => {
      console.error("빠른 검색 요청 실패:", error);
      // 에러 처리 (필요시 toast나 alert 사용)
      alert("검색 요청에 실패했습니다. 다시 시도해주세요.");
    },
  });

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
  const isDisabled = !!validationError || searchMutation.isPending;

  const handleClick = async () => {
    if (isDisabled) {
      // 에러 메시지 표시 (필요시 toast나 alert 사용)
      if (validationError) {
        alert(validationError);
      }
      return;
    }
    // 마지막 단계인 경우 API 요청 후 결과 페이지로 이동
    if (isLastStep) {
      // useQuickSearchStore에서 모든 데이터 가져오기
      const {
        historyId,
        pinPointId,
        transitTime,
        minSize,
        maxSize,
        maxDeposit,
        maxMonthPay,
        facilities,
        rentalTypes,
        supplyTypes,
        houseTypes,
        livingNumber,
      } = quickSearchData;

      searchMutation.mutate({
        historyId,
        pinPointId,
        transitTime,
        minSize,
        maxSize,
        maxDeposit,
        maxMonthPay,
        facilities,
        rentalTypes,
        supplyTypes,
        houseTypes,
        livingNumber,
      });
      return;
    }
    router.push(next.path);
  };

  return (
    <Button
      variant="capsule"
      theme="mainBlue"
      size="lg"
      onClick={handleClick}
      disabled={isDisabled}
    >
      {searchMutation.isPending ? "검색 중..." : "다음"}
    </Button>
  );
};
