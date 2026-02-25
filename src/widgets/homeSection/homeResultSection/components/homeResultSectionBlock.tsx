"use client";

import { GlobalSearchItem, SearchCategory } from "@/src/entities/home/model/type";
import { HomeResultSectionHeader } from "@/src/features/home";
import { HomeResultSectionItems } from "@/src/features/home/ui/result/homeResultSectionItem";
import { HomeResultSectionMore } from "@/src/features/home/ui/result/homeResultSectionMore";
import {
  useHomeResultsData,
  useHomeResultToggle,
} from "@/src/features/home/ui/homeUseHooks/homeResultHooks/useHomeResultHooks";
import { useState } from "react";
import { useHomeResultAnimationHooks } from "@/src/features/home/ui/homeUseHooks/homeResultHooks/useHomeResultAnimationHooks";

type Props = {
  category: SearchCategory;
  items: GlobalSearchItem[]; // 최초 미리보기 (최대 5개)
  q: string;
  nextPage: boolean;
};

export const HomeResultSectionBlock = ({ category, items, q, nextPage }: Props) => {
  /**
   * 현재 펼쳐진 카테고리
   * - null: 아무 것도 펼쳐지지 않음
   * - category 값: 해당 카테고리 펼쳐짐
   */
  const [expandedCategory, setExpandedCategory] = useState<SearchCategory | null>(null);
  const isExpanded = expandedCategory === category;
  const { visibleItems, hasNextPage, isFetchingNextPage, fetchNextPage } = useHomeResultsData({
    category,
    q,
    items,
    isExpanded,
  });
  const { onToggle } = useHomeResultToggle({
    category,
    isExpanded,
    setExpandedCategory,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const { animateFromIndex } = useHomeResultAnimationHooks({ visibleCount: visibleItems.length });

  return (
    <div>
      <HomeResultSectionHeader category={category} count={visibleItems.length} />

      <span className="flex flex-col rounded-xl border">
        <HomeResultSectionItems
          items={visibleItems}
          q={q}
          limit={visibleItems.length}
          animateFromIndex={animateFromIndex}
        />

        <HomeResultSectionMore
          category={category}
          canLoadMore={isExpanded ? Boolean(hasNextPage) : nextPage}
          onToggle={onToggle}
          nextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </span>
    </div>
  );
};
