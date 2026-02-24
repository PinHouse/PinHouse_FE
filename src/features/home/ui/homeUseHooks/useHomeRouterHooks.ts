import { useRouter } from "next/navigation";
import { useHomeSheetStore } from "@/src/features/home/model/homeStore";
import { useMemo } from "react";
import { homeSheetParseObject } from "@/src/features/listings/model";

export const usePinhouseRouter = (searchParams: URLSearchParams) => {
  const router = useRouter();
  const closeSheet = useHomeSheetStore(s => s.closeSheet);
  const replaceRouter = () => {
    router.replace("/home");
    closeSheet();
  };

  const handleSetPinpoint = () => {
    router.push("/mypage/pinpoints");
    closeSheet();
  };

  const mode = useMemo(() => {
    return homeSheetParseObject(searchParams);
  }, [searchParams]);

  return {
    replaceRouter,
    handleSetPinpoint,
    mode,
  };
};

export const useHomeKeywordRouter = () => {
  const router = useRouter();
  const handleSearchTag = (keyword: string) => {
    if (!keyword) return;
    router.push(`/home/search/result?q=${encodeURIComponent(keyword)}`);
  };
  const handleSearchTagQuery = (keyword: string, setSearchQuery: (keyword: string) => void) => {
    if (!keyword) return;
    setSearchQuery(keyword);
    router.push(`/home/search/result?q=${encodeURIComponent(keyword)}`);
  };
  return {
    handleSearchTag,
    handleSearchTagQuery,
  };
};
