"use client";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { LeftButton } from "@/src/assets/icons/button";
import { useSearchHeader } from "@/src/shared/ui/header/header/searchHeader/useSearchHeader";

/**
 * @resultPath resultPath 검색 결과 페이지의 기본 경로 (검색 시 쿼리스트링이 붙습니다)
 * @clearPath 검색어를 지웠을 때 이동할 경로.
 * @queryKey 읽고/쓸 쿼리스트링 키 (예: "keyword").
 * @mainUrl 메인/기준 페이지로 이동할 URL.
 */
type SearchConfig = {
  resultPath: string;
  clearPath: string;
  queryKey: string;
  mainUrl: string;
};

/**
 * @placeHolder  검색 입력창에 표시할 플레이스홀더 텍스트
 * @searchQuery  검색 제출 시 부가 처리 (스토어 업데이트를 위한 콜백)
 */
type SearchHeaderProps = {
  searchConfig: SearchConfig;
  placeHolder: string;
  searchQuery: (q: string) => void;
};

export const SearchHeader = ({ placeHolder, searchQuery, searchConfig }: SearchHeaderProps) => {
  const { resultPath, clearPath, queryKey, mainUrl } = searchConfig;
  const { keyword, search, clear, goMain } = useSearchHeader({
    resultPath,
    clearPath,
    queryKey,
    mainUrl,
    onSearch: searchQuery,
  });

  return (
    <>
      <LeftButton onClick={goMain} className="h-8 w-8 cursor-pointer text-greyscale-grey-400" />

      <SearchBarLabel
        direction="vertical"
        placeholder={placeHolder}
        className="rounded-3xl"
        variant="capsule"
        value={keyword}
        onEnter={search}
        onClear={clear}
        xBtnDef="default"
      />
    </>
  );
};
