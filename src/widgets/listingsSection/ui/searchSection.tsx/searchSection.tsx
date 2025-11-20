"use client";
import { SearchHistory, SearchForm, SearchResults } from "@/src/features/listings";
import { useSearchState } from "@/src/shared/hooks/store";
import { PageTransition } from "@/src/shared/ui/animation";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useEffect, useState } from "react";

export const ListingsSearch = () => {
  const { setSearchQuery } = useSearchState();

  const handleSearch = (keyword: string) => {
    if (!keyword) return;
    setSearchQuery(keyword);
  };

  return (
    <section className="relative h-full overflow-hidden">
      <PageTransition>
        <div className="flex h-screen flex-col">
          <div className="flex shrink-0 flex-col gap-2 px-5">
            <SearchForm />
            <SearchBarLabel
              direction="horizontal"
              placeholder="검색어를 입력하세요"
              className="rounded-3xl"
              onEnter={handleSearch}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <SearchHistory />
            <SearchResults />
          </div>
        </div>
      </PageTransition>
    </section>
  );
};
