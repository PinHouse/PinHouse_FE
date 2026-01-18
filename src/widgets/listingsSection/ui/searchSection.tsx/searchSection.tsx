"use client";
import { SearchForm, SearchResults } from "@/src/features/listings";
import { useListingsSearchState } from "@/src/features/listings/model";
import { useSearchState } from "@/src/shared/hooks/store";
import { PageTransition } from "@/src/shared/ui/animation";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useRouter, useSearchParams } from "next/navigation";

export const ListingsSearch = () => {
  const { setSearchQuery } = useSearchState();
  const searchRest = useListingsSearchState.getState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") ?? "";

  const handleSearch = async (keyword: string) => {
    if (!keyword) return;
    router.push(`/listings/search?query=${keyword}`);
    setSearchQuery(keyword);
  };

  const onClear = () => {
    router.push("/listings/search?query=");
    searchRest.reset();
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
                onEnter={handleSearch}
              />
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <SearchResults />
          </div>
        </div>
      </PageTransition>
    </section>
  );
};
