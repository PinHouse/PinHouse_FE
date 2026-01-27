"use client";

import { useGlobalPageNation } from "@/src/entities/home/hooks/homeHooks";
import {
  GlobalSearchCategoryItem,
  GlobalSearchItem,
  SearchCategory,
} from "@/src/entities/home/model/type";
import { HomeResultSectionHeader } from "@/src/features/home";
import { HomeResultSectionItems } from "@/src/features/home/ui/result/homeResultSectionItem";
import { HomeResultSectionMore } from "@/src/features/home/ui/result/homeResultSectionMore";
import { useMemo, useState } from "react";

type Props = {
  category: SearchCategory;
  items: GlobalSearchItem[]; // 최초 미리보기 (최대 5개)
  q: string;
};

export const HomeResultSectionBlock = ({ category, items, q }: Props) => {
  /**
   * 현재 펼쳐진 카테고리
   * - null: 아무 것도 펼쳐지지 않음
   * - category 값: 해당 카테고리 펼쳐짐
   */
  const [expandedCategory, setExpandedCategory] = useState<SearchCategory | null>(null);

  const isExpanded = expandedCategory === category;

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

  const visibleItems: GlobalSearchItem[] = isExpanded ? serverItems : items;

  /**
   * 더보기 노출 기준
   * - 펼쳐진 이후에만 판단
   * - 서버 기준(hasNextPage)만 신뢰
   */
  const hasMore = isExpanded && Boolean(hasNextPage);

  const handleToggle = async (clickedCategory: SearchCategory) => {
    // 최초 펼침
    if (!isExpanded) {
      setExpandedCategory(clickedCategory);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <div>
      <HomeResultSectionHeader category={category} count={visibleItems.length} />

      <span className="flex flex-col rounded-xl border">
        <HomeResultSectionItems items={visibleItems} q={q} />

        <HomeResultSectionMore
          category={category}
          expanded={isExpanded}
          hasNextPage={hasNextPage}
          onToggle={handleToggle}
        />
      </span>
    </div>
  );
};
