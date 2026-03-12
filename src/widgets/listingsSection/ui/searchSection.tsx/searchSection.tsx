"use client";

import { SearchForm, SearchResults } from "@/src/features/listings";
import { PageTransition } from "@/src/shared/ui/animation";
import { SearchBarLabel } from "@/src/shared/ui/searchBarLabel";
import { useListingsSearchRoute } from "@/src/features/listings/hooks";

export const ListingsSearch = () => {
  const { keyword, submit, clear } = useListingsSearchRoute();

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
                onClear={clear}
                onEnter={submit}
              />
            </div>
          </div>
          <div className="min-h-0 flex-1">
            <SearchResults keyword={keyword} submit={submit} />
          </div>
        </div>
      </PageTransition>
    </section>
  );
};
