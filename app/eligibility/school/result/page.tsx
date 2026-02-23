"use client";

import { useSchoolSearchResult } from "@/src/features/eligibility/hooks/useSchoolSearchResult";
import {
  SchoolResultHeader,
  SchoolResultContentSection,
  SchoolResultTryAgainSection,
} from "@/src/features/eligibility/ui/school";

export default function SchoolResultPage() {
  const { keyword, message, isEligible, handleTryAgain } = useSchoolSearchResult();

  return (
    <section className="flex min-h-full flex-col bg-white">
      <SchoolResultHeader />
      <SchoolResultContentSection isEligible={isEligible} message={message} keyword={keyword} />
      <SchoolResultTryAgainSection onTryAgain={handleTryAgain} />
    </section>
  );
}
