export const LISTING_SEARCH_SORT_TYPES = ["LATEST", "DEADLINE"] as const;

export type ListingSearchSortType = (typeof LISTING_SEARCH_SORT_TYPES)[number];

export const DEFAULT_LISTING_SEARCH_SORT_TYPE: ListingSearchSortType = "LATEST";
export const DEFAULT_LISTING_SEARCH_STATUS = "ALL";
export const DEFAULT_LISTING_SEARCH_PAGE = 1;
export const DEFAULT_LISTING_SEARCH_OFFSET = 10;

export type ListingSearchCriteria = {
  keyword: string;
  sortType: ListingSearchSortType;
  status: string;
  page: number;
  offSet: number;
};

type ListingSearchCriteriaInput = {
  keyword?: string | null;
  q?: string | null;
  query?: string | null;
  sortType?: string | null;
  status?: string | null;
  page?: number | string | null;
  offSet?: number | string | null;
};

const LISTING_SEARCH_SORT_TYPE_SET = new Set<ListingSearchSortType>(LISTING_SEARCH_SORT_TYPES);

function normalizePositiveInt(value: number | string | null | undefined, fallback: number) {
  const next = typeof value === "number" ? value : Number(value);
  return Number.isFinite(next) && next > 0 ? Math.floor(next) : fallback;
}

export function normalizeListingSearchKeyword(
  keyword: string | null | undefined,
  fallbackKeyword?: string | null | undefined
) {
  return (keyword ?? fallbackKeyword ?? "").trim();
}

export function normalizeListingSearchCriteria(
  input: ListingSearchCriteriaInput = {}
): ListingSearchCriteria {
  const keyword = normalizeListingSearchKeyword(input.keyword, input.q ?? input.query);
  const rawSortType = input.sortType?.trim().toUpperCase() as ListingSearchSortType | undefined;
  const sortType = rawSortType && LISTING_SEARCH_SORT_TYPE_SET.has(rawSortType)
    ? rawSortType
    : DEFAULT_LISTING_SEARCH_SORT_TYPE;
  const status = input.status?.trim().toUpperCase() || DEFAULT_LISTING_SEARCH_STATUS;

  return {
    keyword,
    sortType,
    status,
    page: normalizePositiveInt(input.page, DEFAULT_LISTING_SEARCH_PAGE),
    offSet: normalizePositiveInt(input.offSet, DEFAULT_LISTING_SEARCH_OFFSET),
  };
}

type SearchParamsReader = {
  get: (key: string) => string | null;
};

export function parseListingSearchCriteriaFromSearchParams(searchParams: SearchParamsReader) {
  return normalizeListingSearchCriteria({
    query: searchParams.get("query"),
    q: searchParams.get("q"),
    sortType: searchParams.get("sortType"),
    status: searchParams.get("status"),
    page: searchParams.get("page"),
    offSet: searchParams.get("offSet"),
  });
}

export function createListingSearchParams(criteria: ListingSearchCriteria, keywordParam: "q" | "query" = "q") {
  const normalized = normalizeListingSearchCriteria(criteria);
  const searchParams = new URLSearchParams({
    page: String(normalized.page),
    offSet: String(normalized.offSet),
    sortType: normalized.sortType,
    status: normalized.status,
  });

  if (normalized.keyword) {
    searchParams.set(keywordParam, normalized.keyword);
  }

  return searchParams;
}
