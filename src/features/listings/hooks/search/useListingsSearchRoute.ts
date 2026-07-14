import { useRouter, useSearchParams } from "next/navigation";
import { useSearchState } from "@/src/shared/hooks/store";
import {
  createListingSearchParams,
  parseListingSearchCriteriaFromSearchParams,
  useListingsSearchState,
} from "@/src/features/listings/model";

export function useListingsSearchRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const criteria = parseListingSearchCriteriaFromSearchParams(searchParams);
  const keyword = criteria.keyword;
  const { setSearchQuery } = useSearchState();
  const searchState = useListingsSearchState();

  const submit = (next: string) => {
    if (!next.trim()) return;
    const query = createListingSearchParams(
      {
        ...criteria,
        keyword: next,
        page: 1,
      },
      "query"
    );
    router.push(`/listings/search?${query.toString()}`);
    setSearchQuery(next);
  };

  const clear = () => {
    router.push("/listings/search");
    searchState.reset();
  };

  return { keyword, submit, clear };
}
