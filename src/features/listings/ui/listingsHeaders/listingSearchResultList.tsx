"use client";

import { listingsResults, SearchResultsProps } from "../../model";
import { cn } from "@/lib/utils";
import { useSearchState } from "@/src/shared/hooks/store";
import { TagButton } from "@/src/shared/ui/button/tagButton";

export const SearchResults = ({ center = false, handleSearch }: SearchResultsProps) => {
  const { setQuery } = useSearchState();
  return (
    <section className="mt-6">
      <h3 className={`mb-2 flex text-sm font-semibold ${center ? "justify-center" : ""}`}>
        인기 검색어
      </h3>
      <div className="flex flex-wrap gap-2">
        {listingsResults.map((word, index) => (
          <TagButton
            key={index}
            size="sm"
            onClick={() => {
              setQuery(word);
              handleSearch(word);
            }}
            className={cn(
              "rounded-full border px-3 py-1 font-suit text-sm text-text-greyscale-grey-85 transition-all"
            )}
          >
            {word}
          </TagButton>
        ))}
      </div>
    </section>
  );
};
