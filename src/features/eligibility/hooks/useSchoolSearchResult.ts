import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSchoolSearchResultStore } from "@/src/features/eligibility/model/schoolSearchResultStore";

const ELIGIBLE_KEYWORD = "가능";
const SCHOOL_SEARCH_PATH = "/eligibility/school";

export function useSchoolSearchResult() {
  const router = useRouter();
  const { keyword, message, clear } = useSchoolSearchResultStore();
  const isEligible = message != null && message.includes(ELIGIBLE_KEYWORD);

  const handleTryAgain = useCallback(() => {
    clear();
    router.push(SCHOOL_SEARCH_PATH);
  }, [clear, router]);

  return {
    keyword,
    message,
    isEligible,
    handleTryAgain,
  };
}
