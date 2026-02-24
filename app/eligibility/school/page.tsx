"use client";

import { useSchoolSearch } from "@/src/features/eligibility/hooks/useSchoolSearch";
import {
  SchoolSearchHeader,
  SchoolSearchFormSection,
  SchoolSearchResultButtonSection,
} from "@/src/features/eligibility/ui/school";

export default function SchoolSearchPage() {
  const {
    keyword,
    setKeyword,
    options,
    hasKeyword,
    handleSelect,
    handleResultClick,
  } = useSchoolSearch();

  return (
    <section className="flex min-h-full flex-col bg-white">
      <SchoolSearchHeader />
      <SchoolSearchFormSection
        keyword={keyword}
        options={options}
        onKeywordChange={setKeyword}
        onSelect={handleSelect}
      />
      <SchoolSearchResultButtonSection
        hasKeyword={hasKeyword}
        onResultClick={handleResultClick}
      />
    </section>
  );
}
