"use client";

import { Button } from "@/src/shared/lib/headlessUi";
import { quickSearchStepCardContentMap } from "../../model/quickSearch.constants";
import { usePathname, useRouter } from "next/navigation";
import { useQuickSearchStore } from "@/src/features/quickSearch/hooks/quickSearchStore";

export const QuickSearchNextButton = () => {
  const steps = Object.values(quickSearchStepCardContentMap);
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();
  const { livingNumber } = useQuickSearchStore();

  // chooseLivingNumber 페이지에서는 선택된 값이 있을 때만 활성화
  const isDisabled = pathname.includes("chooseLivingNumber") && !livingNumber;

  const handleClick = async () => {
    if (isDisabled) return;
    next && router.push(next.path);
  };
  return (
    <Button
      variant="quicksearch"
      text="lg"
      size="lg"
      onClick={handleClick}
      disabled={isDisabled}
      className="h-[54px] rounded-[50px] font-semibold"
    >
      다음
    </Button>
  );
};
