import { ListingListPage, PopularKeywordItem } from "@/src/entities/listings/model/type";
import {
  getPopularSearchOnServer,
  getSearchNoticeInitialFromBff,
} from "@/src/features/listings/server/bff/getSearchNoticeInitialFromBff";

export const DEFAULT_SEARCH_SORT = "LATEST" as const;
export const DEFAULT_SEARCH_STATUS = "ALL" as const;

export type SearchInitialParams = {
  query?: string;
};

export type ListingSearchInfiniteKey = readonly [
  "listingSearchInfinite",
  string, // keyword
  typeof DEFAULT_SEARCH_SORT,
  typeof DEFAULT_SEARCH_STATUS,
];

export type NoticeSearchInitialData = {
  keyword: string;
  sortType: typeof DEFAULT_SEARCH_SORT;
  status: typeof DEFAULT_SEARCH_STATUS;
  queryKey: ListingSearchInfiniteKey;
  popular: PopularKeywordItem[] | null;
  initialPage: ListingListPage | null;
};

export async function getNoticeSearchInitialData({
  query = "",
}: SearchInitialParams): Promise<NoticeSearchInitialData> {
  const keyword = query.trim();
  const sortType = DEFAULT_SEARCH_SORT;
  const status = DEFAULT_SEARCH_STATUS;

  const [popular, initialPage] = await Promise.all([
    getPopularSearchOnServer(5),
    keyword
      ? getSearchNoticeInitialFromBff({ q: keyword, sortType, status })
      : Promise.resolve(null),
  ]);

  return {
    keyword,
    sortType,
    status,
    queryKey: ["listingSearchInfinite", keyword, sortType, status] as const,
    popular,
    initialPage,
  };
}
