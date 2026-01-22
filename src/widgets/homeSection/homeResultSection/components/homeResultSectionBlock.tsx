"use client";

import { SearchCategory } from "@/src/entities/home/model/type";
import { HomeResultSectionHeader } from "@/src/features/home";
import { HomeResultSectionItems } from "@/src/features/home/ui/result/homeResultSectionItem";
import { HomeResultSectionMore } from "@/src/features/home/ui/result/homeResultSectionMore";
import { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, limit);

  return (
    <div>
      <HomeResultSectionHeader category={category} count={items.length} />

      <span className="flex flex-col rounded-xl border">
        <HomeResultSectionItems items={visibleItems} limit={limit} q={q} />

        <HomeResultSectionMore
          total={items.length}
          limit={limit}
          expanded={expanded}
          onToggle={() => setExpanded(v => !v)}
        />
      </span>
    </div>
  );
};
