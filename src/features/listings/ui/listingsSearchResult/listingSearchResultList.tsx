"use client";

import { ListingsContentHeader } from "../listingsContents/listingsContentsHeader";
import { ListingContentsList } from "../listingsContents/listingsContentsList";
import { SearchEmptyQueryView } from "./components/searchEmptyQueryView";
import { SearchNoResultView } from "./components/searchNoResultView";
import { getSearchViewMode, useListingsSearchData } from "@/src/features/listings/hooks";

type SearchResultsProps = {
  keyword: string;
  submit: (next: string) => void;
};

export const SearchResults = ({ keyword, submit }: SearchResultsProps) => {
  const { debounced, popular, search } = useListingsSearchData(keyword);

  if (!popular.data) return null;
  const resultCount = search.data?.pages?.[0]?.content?.length ?? 0;
  const mode = getSearchViewMode({
    keyword,
    debounced,
    isFetching: search.isFetching,
    resultCount,
  });

  if (mode === "EMPTY")
    return <SearchEmptyQueryView handleSearchTag={submit} popular={popular.data} />;
  if (mode === "NO_RESULT")
    return <SearchNoResultView handleSearchTag={submit} popular={popular.data} />;

  return (
    <>
      <div className="flex h-full flex-col pl-5 pr-5">
        <ListingsContentHeader totalCount={resultCount ?? 0} />
        <ListingContentsList
          data={search.data}
          fetchNextPage={search.fetchNextPage}
          hasNextPage={search.hasNextPage}
          isFetchingNextPage={search.isFetchingNextPage}
          isError={search.isError}
          isBottom={false}
        />
      </div>
    </>
  );
};
