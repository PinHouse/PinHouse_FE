"use client";
import {
  useListingSearchInfiniteQuery,
  usePopularSearchQuery,
} from "@/src/entities/listings/hooks/useListingHooks";
import { useRouter, useSearchParams } from "next/navigation";
import { ListingsContentHeader } from "../listingsContents/listingsContentsHeader";
import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import { ListingContentsList } from "../listingsContents/listingsContentsList";
import { SearchEmptyQueryView } from "./components/searchEmptyQueryView";
import { SearchNoResultView } from "./components/searchNoResultView";
import { useSearchState } from "@/src/shared/hooks/store";
import { Spinner } from "@/src/shared/ui/spinner/default";

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";
  const debouncedKeyword = useDebounce(keyword, 350);
  const { setSearchQuery } = useSearchState();
  const router = useRouter();
  const { data } = usePopularSearchQuery();

  const {
    data: searchList,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useListingSearchInfiniteQuery({
    enabled: !!debouncedKeyword,
    keepPreviousData: true,
  });

  const resultCount = searchList?.pages?.[0]?.content?.length ?? 0;

  // 상태 분기
  const noKeyword = keyword.length === 0;
  const loading = isFetching && debouncedKeyword.length > 0;
  const noResult = !loading && resultCount === 0 && debouncedKeyword.length > 0;

  if (!data) return;

  const handleSearchTag = (keyword: string) => {
    if (!keyword) return;
    router.push(`/listings/search?query=${keyword}`);
    setSearchQuery(keyword);
  };

  if (noKeyword) {
    return <SearchEmptyQueryView handleSearchTag={handleSearchTag} popular={data} />;
  }

  if (noResult) {
    return <SearchNoResultView handleSearchTag={handleSearchTag} popular={data} />;
  }

  return (
    <>
      <div className="flex h-full flex-col pl-5 pr-5">
        <ListingsContentHeader totalCount={resultCount ?? 0} />
        <ListingContentsList
          data={searchList}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          isBottom={false}
        />
      </div>
    </>
  );
};
