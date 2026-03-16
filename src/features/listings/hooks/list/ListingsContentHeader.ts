import {
  listingPoint,
  useListingsFilterStore,
  useListingsSearchState,
} from "@/src/features/listings/model";
import { useSearchParams } from "next/navigation";

const LATEST_LABEL = "최신공고";
const DEADLINE_LABEL = "마감임박";

export const useListingsContentHeaderController = () => {
  const sortType = useListingsFilterStore(state => state.sortType);
  const setSortType = useListingsFilterStore(state => state.setSortType);
  const setSearchSortType = useListingsSearchState(state => state.setSortType);
  const searchSortType = useListingsSearchState(state => state.sortType);

  const searchParams = useSearchParams();
  const isSearchPage = searchParams.has("query");

  const sortLabel = isSearchPage
    ? searchSortType === "LATEST"
      ? LATEST_LABEL
      : DEADLINE_LABEL
    : sortType;

  const onToggleSort = () => {
    if (isSearchPage) {
      setSearchSortType(searchSortType === "LATEST" ? "DEADLINE" : "LATEST");
      return;
    }

    setSortType(sortType === LATEST_LABEL ? DEADLINE_LABEL : LATEST_LABEL);
  };

  return {
    listingPoint,
    sortLabel,
    onToggleSort,
  };
};
