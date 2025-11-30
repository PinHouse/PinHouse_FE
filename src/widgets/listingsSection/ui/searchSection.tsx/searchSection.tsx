"use client";
import { SearchForm, SearchResults } from "@/src/features/listings";
import { useSearchState } from "@/src/shared/hooks/store";
import { PageTransition } from "@/src/shared/ui/animation";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ListingsSearch = () => {
  const { setSearchQuery, setQuery, resetQuery } = useSearchState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";
  const [isSearched, setIsSearched] = useState([]);

  const handleSearch = (keyword: string) => {
    if (!keyword) return;
    setSearchQuery(keyword);
    setQuery(keyword);
    router.push(`/listings/search?query=${keyword}`);
  };

  const onClear = () => {
    resetQuery();
    router.push("/listings/search?query=");
  };

  return (
    <section className="relative h-full overflow-hidden">
      <PageTransition>
        <div className="flex h-screen flex-col">
          <div className="flex shrink-0 flex-col gap-2">
            <SearchForm />
            <div className="px-5">
              <SearchBarLabel
                direction="horizontal"
                placeholder="검색어를 입력하세요"
                className="rounded-3xl"
                value={keyword}
                onClear={onClear}
                // onChange={onChangeHandle}
                onEnter={handleSearch}
              />
            </div>
          </div>
          <SearchResults center={true} handleSearch={handleSearch} />
        </div>
      </PageTransition>
    </section>
  );
};
