"use client";

import { SearchResultsProps } from "../../model";
import { cn } from "@/lib/utils";
import {
  useListingSearchInfiniteQuery,
  usePopularSearchQuery,
} from "@/src/entities/listings/hooks/useListingHooks";
import { useSearchState } from "@/src/shared/hooks/store";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { useSearchParams } from "next/navigation";
import { ListingNoSearchResult } from "../listingsNoSearchResult/listingNoSearchResult";
import { AnimatePresence, motion } from "framer-motion";
import { SearchHistory } from "./listingsSearchHistory";
import { ListingContentsCard } from "../listingsContents/listingsContentCard";
import { ListingsContentHeader } from "../listingsContents/listingsContentsHeader";

export const SearchResults = ({ handleSearch }: SearchResultsProps) => {
  const { setQuery } = useSearchState();
  const { data } = usePopularSearchQuery();
  const { data: searchList, isError, isLoading } = useListingSearchInfiniteQuery();
  const pageData = searchList?.pages[0].notices;
  const totalCount = searchList?.pages[0].totalElements;
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";

  if (!data) return;
  return (
    <>
      {keyword !== "" && pageData?.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center pb-[88px]">
          <ListingNoSearchResult
            text={"검색 결과가 없습니다. <br /> 다른 검색어로 검색해보세요."}
          />
          <section className="mt-6">
            <h3 className={`mb-2 flex justify-center text-sm font-semibold`}>인기 검색어</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {data?.map((word, index) => (
                <TagButton
                  key={index}
                  size="sm"
                  onClick={() => {
                    setQuery(word.keyword);
                    handleSearch(word.keyword);
                  }}
                  className={cn(
                    "font-suit text-text-greyscale-grey-85 rounded-full border px-3 py-1 text-sm transition-all"
                  )}
                >
                  {word.keyword}
                </TagButton>
              ))}
            </div>
          </section>
        </div>
      ) : keyword !== "" && pageData?.length !== 0 ? (
        <div className="flex h-full flex-col pl-5 pr-5">
          <ListingsContentHeader totalCount={totalCount ?? 0} />

          <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
            <ListingContentsCard data={pageData ?? []} />

            {isLoading && (
              <div className="py-5 text-center text-sm text-gray-400">불러오는 중...</div>
            )}

            {isError && (
              <div className="flex h-full flex-col items-center justify-center gap-5">
                <ListingNoSearchResult text="정보를 가져오지 못했어요 <br /> 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요." />
              </div>
            )}

            {!isError && !isLoading && (
              <div className="py-3 text-center text-sm text-gray-400">
                더 이상 데이터가 없습니다.
              </div>
            )}
          </div>
        </div>
      ) : (
        keyword === "" &&
        !pageData && (
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
                <section className="mt-6">
                  <h3 className={`mb-2 flex text-sm font-semibold`}>인기 검색어</h3>
                  <div className="flex flex-wrap gap-2">
                    {data?.map((word, index) => (
                      <TagButton
                        key={index}
                        size="sm"
                        onClick={() => {
                          setQuery(word.keyword);
                          handleSearch(word.keyword);
                        }}
                        className={cn(
                          "font-suit text-text-greyscale-grey-85 rounded-full border px-3 py-1 text-sm transition-all"
                        )}
                      >
                        {word.keyword}
                      </TagButton>
                    ))}
                  </div>
                </section>
              </motion.div>
            </AnimatePresence>
          </div>
        )
      )}
    </>
  );
};
