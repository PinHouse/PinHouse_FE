import { useRouter } from "next/navigation";
import { useHomeSheetStore } from "@/src/features/home/model/homeStore";
import { useMemo } from "react";
import { homeSheetParseObject } from "@/src/features/listings/model";

/**
 * @searchParams URLSearchParams 객체
 * @returns 홈 시트 라우팅 제어 핸들러
 */
export const usePinhouseRouter = (searchParams: URLSearchParams) => {
  const router = useRouter();
  const closeSheet = useHomeSheetStore(s => s.closeSheet);

  /** @description 홈 메인으로 교체 이동 후 시트 닫기 */
  const replaceRouter = () => {
    router.replace("/home");
    closeSheet();
  };

  /** @description 핀포인트 설정 페이지 이동 후 시트 닫기 */
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

/**
 * @returns 홈 검색 라우팅 핸들러
 */
export const useHomeKeywordRouter = () => {
  const router = useRouter();

  /**
   * @keyword 검색어
   */
  const handleSearchTag = (keyword: string) => {
    if (!keyword) return;
    router.push(`/home/search/result?q=${encodeURIComponent(keyword)}`);
  };

  /**
   * @keyword 검색어
   * @setSearchQuery 최근 검색어 저장 함수
   */
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
