import {
  createListingsFilterSearchParams,
  DEFAULT_LISTING_SEARCH_SORT_TYPE,
  listingPoint,
  useListingsFilterStore,
  useListingsSearchState,
} from "@/src/features/listings/model";
import type { ListingsFilterState, SearchState } from "@/src/entities/listings/model/type";
import { useRouter, useSearchParams } from "next/navigation";

const NOTICE_LATEST = "최신공고순";
const NOTICE_DEADLINE = "마감임박순";
const SEARCH_LATEST = DEFAULT_LISTING_SEARCH_SORT_TYPE;
const SEARCH_DEADLINE = "DEADLINE";

export const useListingsContentHeaderController = () => {
  const sortType = useListingsFilterStore(
    (state: ListingsFilterState) => state.applied.sortType
  );
  const setSortType = useListingsFilterStore((state: ListingsFilterState) => state.setSortType);
  const applied = useListingsFilterStore((state: ListingsFilterState) => state.applied);
  const setSearchSortType = useListingsSearchState((state: SearchState) => state.setSortType);
  const searchSortType = useListingsSearchState((state: SearchState) => state.sortType);

  const router = useRouter();
  const searchParams = useSearchParams();
  const isSearchPage = searchParams.has("query");

  const sortLabel = isSearchPage
    ? searchSortType === SEARCH_LATEST
      ? NOTICE_LATEST
      : NOTICE_DEADLINE
    : sortType;

  const onToggleSort = () => {
    if (isSearchPage) {
      setSearchSortType(searchSortType === SEARCH_LATEST ? SEARCH_DEADLINE : SEARCH_LATEST);
      return;
    }

    const nextSortType = sortType === NOTICE_LATEST ? NOTICE_DEADLINE : NOTICE_LATEST;
    setSortType(nextSortType);
    const nextParams = createListingsFilterSearchParams(
      {
        ...applied,
        sortType: nextSortType,
      },
      new URLSearchParams(searchParams.toString())
    );
    const query = nextParams.toString();
    router.replace(query ? `/listings?${query}` : "/listings", { scroll: false });
  };

  return {
    listingPoint,
    sortLabel,
    onToggleSort,
  };
};
