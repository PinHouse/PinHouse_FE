import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import type { SearchBarOption } from "@/src/shared/ui/searchBar/type";
import {
  getUnivSearch,
  getSchoolSearch,
  getUnivAvailability,
  getSchoolAvailability,
} from "@/src/features/eligibility/api/schoolUnivSearchApi";
import { useSchoolSearchResultStore } from "@/src/features/eligibility/model/schoolSearchResultStore";

function toSearchBarOption(item: {
  id: string;
  name: string;
  collegeType: string;
}): SearchBarOption {
  return {
    key: item.id,
    value: item.name,
    description: item.collegeType,
  };
}

const DEBOUNCE_MS = 300;

const RESULT_PATH = "/eligibility/school/result";

export function useSchoolSearch() {
  const router = useRouter();
  const setResult = useSchoolSearchResultStore(s => s.setResult);
  const [keyword, setKeywordState] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [options, setOptions] = useState<SearchBarOption[]>([]);
  const debouncedKeyword = useDebounce(keyword, DEBOUNCE_MS);
  const hasKeyword = keyword.trim().length > 0;
  const skipNextSearchRef = useRef(false);

  const setKeyword = useCallback((value: string) => {
    setKeywordState(value);
    setSelectedSchoolId(null);
  }, []);

  useEffect(() => {
    const q = debouncedKeyword.trim();
    if (!q) {
      setOptions([]);
      return;
    }
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      setOptions([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const univRes = await getUnivSearch(q);
        if (cancelled) return;
        const schoolRes = await getSchoolSearch(q);
        if (cancelled) return;
        const univList = univRes.data ?? [];
        const schoolList = schoolRes.data ?? [];
        const merged = [...univList.map(toSearchBarOption), ...schoolList.map(toSearchBarOption)];
        setOptions(merged);
      } catch {
        if (!cancelled) setOptions([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedKeyword]);

  const handleSelect = (option: SearchBarOption) => {
    skipNextSearchRef.current = true;
    setKeywordState(option.value);
    setSelectedSchoolId(option.key);
    setOptions([]);
  };

  const handleResultClick = useCallback(async () => {
    if (!hasKeyword) return;
    const q = keyword.trim();
    if (!q) return;
    const ELIGIBLE_KEYWORD = "가능";
    try {
      const [univRes, schoolRes] = await Promise.all([
        getUnivAvailability(q),
        getSchoolAvailability(q),
      ]);
      const univMsg = typeof univRes.data === "string" ? univRes.data : null;
      const schoolMsg = typeof schoolRes.data === "string" ? schoolRes.data : null;
      const successMessage = [univMsg, schoolMsg].find(m => m?.includes(ELIGIBLE_KEYWORD)) ?? null;
      const message = successMessage ?? univMsg ?? schoolMsg ?? null;
      setResult(keyword.trim(), message);
      router.push(RESULT_PATH);
    } catch {
      setResult(keyword.trim(), null);
      router.push(RESULT_PATH);
    }
  }, [hasKeyword, keyword, setResult, router]);

  return {
    keyword,
    setKeyword,
    options,
    hasKeyword,
    hasSelection: selectedSchoolId != null,
    handleSelect,
    handleResultClick,
  };
}
