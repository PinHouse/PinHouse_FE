import {
  listingPoint,
  useListingsFilterStore,
  useListingsSearchState,
} from "@/src/features/listings/model";
import { useSearchParams } from "next/navigation";

const NOTICE_LATEST = "최신공고순";
const NOTICE_DEADLINE = "마감임박순";
const SEARCH_LATEST = "LATEST";
const SEARCH_DEADLINE = "DEADLINE";

export const useListingsContentHeaderController = () => {
  const sortType = useListingsFilterStore(state => state.sortType);
  const setSortType = useListingsFilterStore(state => state.setSortType);
  const setSearchSortType = useListingsSearchState(state => state.setSortType);
  const searchSortType = useListingsSearchState(state => state.sortType);

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

    setSortType(sortType === NOTICE_LATEST ? NOTICE_DEADLINE : NOTICE_LATEST);
  };

  return {
    listingPoint,
    sortLabel,
    onToggleSort,
  };
};
