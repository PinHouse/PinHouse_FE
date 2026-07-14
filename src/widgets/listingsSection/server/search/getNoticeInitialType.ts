import { ListingListPage, PopularKeywordItem } from "@/src/entities/listings/model/type";
import {
  getPopularSearchFromBff,
  getSearchNoticeInitialFromBff,
} from "@/src/features/listings/server";
import {
  DEFAULT_LISTING_SEARCH_OFFSET,
  DEFAULT_LISTING_SEARCH_PAGE,
  DEFAULT_LISTING_SEARCH_SORT_TYPE,
  DEFAULT_LISTING_SEARCH_STATUS,
  ListingSearchCriteria,
  normalizeListingSearchCriteria,
} from "@/src/features/listings/model";
import { listingSearchInfiniteQueryKey } from "@/src/shared/config";

export type SearchInitialParams = {
  query?: string;
};

export type ListingSearchInfiniteKey = ReturnType<typeof listingSearchInfiniteQueryKey>;

export type NoticeSearchInitialData = {
  criteria: ListingSearchCriteria;
  queryKey: ListingSearchInfiniteKey;
  popular: PopularKeywordItem[] | null;
  initialPage: ListingListPage | null;
};

export async function getNoticeSearchInitialData({
  query = "",
}: SearchInitialParams): Promise<NoticeSearchInitialData> {
  const criteria = normalizeListingSearchCriteria({
    query,
    sortType: DEFAULT_LISTING_SEARCH_SORT_TYPE,
    status: DEFAULT_LISTING_SEARCH_STATUS,
    page: DEFAULT_LISTING_SEARCH_PAGE,
    offSet: DEFAULT_LISTING_SEARCH_OFFSET,
  });

  const [popular, initialPage] = await Promise.all([
    getPopularSearchFromBff(5),
    criteria.keyword
      ? getSearchNoticeInitialFromBff(criteria)
      : Promise.resolve(null),
  ]);

  return {
    criteria,
    queryKey: listingSearchInfiniteQueryKey(criteria),
    popular,
    initialPage,
  };
}
