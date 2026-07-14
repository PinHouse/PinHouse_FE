import {
  createListingSearchParams,
  DEFAULT_LISTING_SEARCH_OFFSET,
  DEFAULT_LISTING_SEARCH_PAGE,
  DEFAULT_LISTING_SEARCH_SORT_TYPE,
  DEFAULT_LISTING_SEARCH_STATUS,
  normalizeListingSearchCriteria,
  parseListingSearchCriteriaFromSearchParams,
} from "@/src/features/listings/model/searchCriteria";
import { listingSearchInfiniteQueryKey } from "@/src/shared/config";

describe("listing search criteria", () => {
  it("normalizes keyword, sort, status, and paging defaults", () => {
    expect(
      normalizeListingSearchCriteria({
        q: "  행복주택  ",
        sortType: "latest",
        status: "all",
        page: "0",
        offSet: "-1",
      })
    ).toEqual({
      keyword: "행복주택",
      sortType: DEFAULT_LISTING_SEARCH_SORT_TYPE,
      status: DEFAULT_LISTING_SEARCH_STATUS,
      page: DEFAULT_LISTING_SEARCH_PAGE,
      offSet: DEFAULT_LISTING_SEARCH_OFFSET,
    });
  });

  it("parses search params with query alias and keeps valid sort type", () => {
    const searchParams = new URLSearchParams({
      query: "  seoul ",
      sortType: "DEADLINE",
      status: "recruiting",
      page: "3",
      offSet: "20",
    });

    expect(parseListingSearchCriteriaFromSearchParams(searchParams)).toEqual({
      keyword: "seoul",
      sortType: "DEADLINE",
      status: "RECRUITING",
      page: 3,
      offSet: 20,
    });
  });

  it("creates stable query keys from normalized criteria", () => {
    const a = listingSearchInfiniteQueryKey(
      normalizeListingSearchCriteria({
        keyword: "  seoul ",
        sortType: "latest",
        status: "all",
      })
    );
    const b = listingSearchInfiniteQueryKey(
      normalizeListingSearchCriteria({
        q: "seoul",
        sortType: "LATEST",
        status: "ALL",
        page: 1,
        offSet: 10,
      })
    );

    expect(a).toEqual(b);
  });

  it("serializes params without leaking an empty keyword", () => {
    const searchParams = createListingSearchParams(
      normalizeListingSearchCriteria({
        keyword: "",
        sortType: "LATEST",
        status: "ALL",
        page: 2,
        offSet: 15,
      }),
      "query"
    );

    expect(searchParams.toString()).toBe("page=2&offSet=15&sortType=LATEST&status=ALL");
  });
});
