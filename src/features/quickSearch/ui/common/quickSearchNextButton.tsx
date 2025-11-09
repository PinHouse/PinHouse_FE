"use client";

import { Button } from "@/src/shared/lib/headlessUi";
import { quickSearchStepCardContentMap } from "../../model/quickSearch.constants";
import { usePathname, useRouter } from "next/navigation";

export const QuickSearchNextButton = () => {
  const steps = Object.values(quickSearchStepCardContentMap);
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();

  const handleClick = async () => {
    next && router.push(next.path);
  };
  return (
    <Button variant="quicksearch" size="lg" text="lg" onClick={handleClick}>
      다음
    </Button>
  );
};
