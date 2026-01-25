"use client";

import { useGlobalPageNation } from "@/src/entities/home/hooks/homeHooks";
import { SearchCategory } from "@/src/entities/home/model/type";
import { HomeResultSectionHeader } from "@/src/features/home";
import { HomeResultSectionItems } from "@/src/features/home/ui/result/homeResultSectionItem";
import { HomeResultSectionMore } from "@/src/features/home/ui/result/homeResultSectionMore";
import { useState } from "react";

type ExpendedType = {
  open: boolean;
  category: SearchCategory | null;
};

export const HomeResultSectionBlock = ({
  category,
  items,
  limit,
  q,
}: {
  category: SearchCategory;
  items: any[];
  limit: number;
  q: string;
}) => {
  const [expanded, setExpanded] = useState<ExpendedType>({ open: false, category: null });
  const visibleItems =
    expanded.open && expanded.category === category ? items : items.slice(0, limit);
  const isExpanded = expanded.open && expanded.category === category;
  const {
    data: categoryData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGlobalPageNation({ q, category: expanded.category, enabled: isExpanded });

  return (
    <div>
      <HomeResultSectionHeader category={category} count={items.length} />

      <span className="flex flex-col rounded-xl border">
        <HomeResultSectionItems items={visibleItems} limit={limit} q={q} />

        <HomeResultSectionMore
          total={items.length}
          limit={limit}
          expanded={expanded.open}
          onToggle={() =>
            setExpanded(prev =>
              prev.open && prev.category === category
                ? { open: false, category: null }
                : { open: true, category }
            )
          }
          category={category}
        />
      </span>
    </div>
  );
};
