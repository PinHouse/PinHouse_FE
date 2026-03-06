import { useCallback, useMemo } from "react";
import { useGlobalPageNation } from "@/src/entities/home/hooks/homeHooks";
import { GlobalSearchItem, SearchCategory } from "@/src/entities/home/model/type";

type UseHomeResultsDataProps = {
  /** @category 조회할 검색 카테고리 */
  category: SearchCategory;
  /** @q 검색어 */
  q: string;
  /** @items 초기(SSR/상위) 아이템 목록 */
  items: GlobalSearchItem[];
  /** @isExpanded 확장 여부 */
  isExpanded: boolean;
};

/**
 * @category 조회 카테고리
 * @q 검색어
 * @items 초기 아이템 목록
 * @isExpanded 섹션 확장 여부
 * @returns 렌더링 아이템과 페이징 제어 상태
 */
export const useHomeResultsData = ({ category, q, items, isExpanded }: UseHomeResultsDataProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGlobalPageNation<GlobalSearchItem>({
      q,
      category,
      enabled: isExpanded,
    });

  const serverItems = useMemo<GlobalSearchItem[]>(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => (Array.isArray(page.content) ? page.content : []));
  }, [data]);

  const visibleItems = useMemo(
    () => (isExpanded ? [...items, ...serverItems] : items),
    [isExpanded, items, serverItems]
  );

  return {
    visibleItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

type UseHomeResultToggleProps = {
  /** @category 토글 대상 카테고리 */
  category: SearchCategory;
  /** @isExpanded 현재 확장 상태 */
  isExpanded: boolean;
  /** @setExpandedCategory 확장 카테고리 설정 함수 */
  setExpandedCategory: (category: SearchCategory | null) => void;
  /** @hasNextPage 다음 페이지 존재 여부 */
  hasNextPage: boolean | undefined;
  /** @isFetchingNextPage 다음 페이지 로딩 여부 */
  isFetchingNextPage: boolean;
  /** @fetchNextPage 다음 페이지 조회 함수 */
  fetchNextPage: () => Promise<unknown>;
};

/**
 * @category 토글 카테고리
 * @isExpanded 현재 확장 상태
 * @setExpandedCategory 확장 상태 제어 함수
 * @hasNextPage 다음 페이지 존재 여부
 * @isFetchingNextPage 다음 페이지 로딩 여부
 * @fetchNextPage 다음 페이지 호출 함수
 * @returns 토글/추가조회 핸들러
 */
export const useHomeResultToggle = ({
  category,
  isExpanded,
  setExpandedCategory,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseHomeResultToggleProps) => {
  const onToggle = useCallback(async () => {
    if (!isExpanded) {
      setExpandedCategory(category);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
      return;
    }

    // setExpandedCategory(null);
  }, [isExpanded, setExpandedCategory, category, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { onToggle };
};
