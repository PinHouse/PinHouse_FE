"use client";
import {
  SearchHistory,
  SearchForm,
  SearchResults,
  ListingNoSearchResult,
} from "@/src/features/listings";
import { useSearchState } from "@/src/shared/hooks/store";
import { PageTransition } from "@/src/shared/ui/animation";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ListingsSearch = () => {
  const { setSearchQuery } = useSearchState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";
  const [isSearched, setIsSearched] = useState([]);
  console.log(keyword, isSearched);
  const handleSearch = (keyword: string) => {
    if (!keyword) return;
    setSearchQuery(keyword);
    router.push(`/listings/search?query=${keyword}`);
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
          {keyword && isSearched.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-red-300">
              <ListingNoSearchResult />
              <SearchResults />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5">
              <SearchHistory />
              <SearchResults />
            </div>
          )}
        </div>
      </PageTransition>
    </section>
  );
};
