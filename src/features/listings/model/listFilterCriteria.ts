import { ListingListFilterBody } from "@/src/entities/listings/model/type";

export type ListingsFilterCriteria = ListingListFilterBody;

export const DEFAULT_LISTINGS_FILTER_SORT_TYPE = "최신공고순";
export const DEFAULT_LISTINGS_FILTER_STATUS = "";
export const DEFAULT_LISTINGS_STATUS = "전체";
export const DEADLINE_LISTINGS_SORT_QUERY_VALUE = "deadline";

export const createDefaultListingsFilterCriteria = (): ListingsFilterCriteria => ({
  regionType: [],
  rentalTypes: [],
  supplyTypes: [],
  houseTypes: [],
  status: DEFAULT_LISTINGS_FILTER_STATUS,
  sortType: DEFAULT_LISTINGS_FILTER_SORT_TYPE,
});

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function normalizeListingsFilterCriteria(
  criteria: Partial<ListingsFilterCriteria>
): ListingsFilterCriteria {
  const defaults = createDefaultListingsFilterCriteria();

  return {
    regionType: uniqueSorted(criteria.regionType ?? defaults.regionType),
    rentalTypes: uniqueSorted(criteria.rentalTypes ?? defaults.rentalTypes),
    supplyTypes: uniqueSorted(criteria.supplyTypes ?? defaults.supplyTypes),
    houseTypes: uniqueSorted(criteria.houseTypes ?? defaults.houseTypes),
    status: criteria.status ?? defaults.status,
    sortType: criteria.sortType ?? defaults.sortType,
  };
}

type SearchParamsReader = {
  get: (key: string) => string | null;
};

export function parseListingsFilterCriteriaFromSearchParams(searchParams: SearchParamsReader) {
  const requestedSortType = searchParams.get("sortType");
  const parseList = (key: string) =>
    (searchParams.get(key) ?? "")
      .split(",")
      .map(value => value.trim())
      .filter(Boolean);

  return normalizeListingsFilterCriteria({
    regionType: parseList("region"),
    rentalTypes: parseList("target"),
    supplyTypes: parseList("rental"),
    houseTypes: parseList("housing"),
    sortType: requestedSortType === "deadline" ? "마감임박순" : DEFAULT_LISTINGS_FILTER_SORT_TYPE,
  });
}

export function createListingsFilterSearchParams(
  criteria: ListingsFilterCriteria,
  existingSearchParams?: URLSearchParams
) {
  const normalized = normalizeListingsFilterCriteria(criteria);
  const next = new URLSearchParams(existingSearchParams?.toString() ?? "");

  next.delete("tab");

  const setList = (key: string, values: string[]) => {
    if (values.length === 0) {
      next.delete(key);
      return;
    }

    next.set(key, values.join(","));
  };

  setList("region", normalized.regionType);
  setList("target", normalized.rentalTypes);
  setList("rental", normalized.supplyTypes);
  setList("housing", normalized.houseTypes);

  if (normalized.sortType === DEFAULT_LISTINGS_FILTER_SORT_TYPE) {
    next.delete("sortType");
  } else {
    next.set("sortType", DEADLINE_LISTINGS_SORT_QUERY_VALUE);
  }

  return next;
}
