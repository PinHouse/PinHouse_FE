"use client";

import { DefaultHeader } from "@/src/shared/ui/header";
import { ELIGIBILITY_RECOMMENDED_LIST_TITLE } from "../../model/eligibilityConstants";

type EligibilityRecommendedHeaderProps = {
  totalElements: number | null;
};

export function EligibilityRecommendedHeader({ totalElements }: EligibilityRecommendedHeaderProps) {
  return (
    <header className="relative flex items-center px-5 py-4">
      <DefaultHeader title={ELIGIBILITY_RECOMMENDED_LIST_TITLE} />
    </header>
  );
}
