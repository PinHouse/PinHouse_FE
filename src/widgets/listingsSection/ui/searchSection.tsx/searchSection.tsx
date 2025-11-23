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
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const ListingsSearch = () => {
  const { setSearchQuery, query, setQuery } = useSearchState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";
  const [isSearched, setIsSearched] = useState([]);

  const handleSearch = (keyword: string) => {
    if (!keyword) return;
    setSearchQuery(keyword);
    router.push(`/listings/search?query=${keyword}`);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setQuery(target.value);
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
                value={query}
                onChange={onChangeHandle}
                onEnter={handleSearch}
              />
            </div>
          </div>

          {keyword && isSearched.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center pb-[88px]">
              <ListingNoSearchResult
                text={"검색 결과가 없습니다. <br /> 다른 검색어로 검색해보세요."}
              />

              <SearchResults center={true} handleSearch={handleSearch} />
            </div>
          ) : (
            <div className="flex-1 p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="flex flex-col"
                >
                  <SearchHistory handleSearch={handleSearch} />
                  <SearchResults handleSearch={handleSearch} />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </PageTransition>
    </section>
  );
};
