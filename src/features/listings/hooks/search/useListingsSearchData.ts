import { useDebounce } from "@/src/shared/hooks/useDebounce/useDebounce";
import {
  useListingSearchInfiniteQuery,
  usePopularSearchQuery,
} from "@/src/entities/listings/hooks/useListingHooks";

export const useListingsSearchData = (keyword: string) => {
  const debounced = useDebounce(keyword);
  const popular = usePopularSearchQuery();
  const search = useListingSearchInfiniteQuery({
    keyword: debounced,
    enabled: !!debounced,
    keepPreviousData: true,
  });
  return {
    debounced,
    popular,
    search,
  };
};
