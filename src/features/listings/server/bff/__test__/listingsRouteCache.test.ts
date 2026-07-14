import {
  createListingNoticeRouteCacheKey,
  createListingSearchRouteCacheKey,
  getOrLoadListingsRouteCache,
  invalidateAllListingsRouteCaches,
  resolveListingsRouteCacheScope,
} from "@/src/features/listings/server/bff/listingsRouteCache";
import {
  setListingsCacheAdapter,
  type ListingsCacheAdapter,
  type ListingsCacheEntry,
} from "@/src/features/listings/server/bff/listingsCacheAdapter";
import { normalizeListingSearchCriteria } from "@/src/features/listings/model/searchCriteria";
import { normalizeListingsFilterCriteria } from "@/src/features/listings/model/listFilterCriteria";

class TestListingsCacheAdapter implements ListingsCacheAdapter {
  private readonly store = new Map<string, ListingsCacheEntry<unknown>>();

  async get<T>(key: string) {
    const entry = this.store.get(key);
    return (entry as ListingsCacheEntry<T> | undefined) ?? null;
  }

  async set<T>(key: string, entry: ListingsCacheEntry<T>) {
    this.store.set(key, entry);
  }

  async deleteByPrefix(prefix: string) {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
  }
}

describe("listings route cache", () => {
  beforeEach(async () => {
    setListingsCacheAdapter(new TestListingsCacheAdapter());
    await invalidateAllListingsRouteCaches();
  });

  it("creates stable search cache keys for equivalent criteria", () => {
    const a = createListingSearchRouteCacheKey(
      normalizeListingSearchCriteria({
        q: " 행복주택 ",
        sortType: "latest",
        status: "all",
      }),
      "public"
    );
    const b = createListingSearchRouteCacheKey(
      normalizeListingSearchCriteria({
        keyword: "행복주택",
        sortType: "LATEST",
        status: "ALL",
        page: 1,
        offSet: 10,
      }),
      "public"
    );

    expect(a).toBe(b);
  });

  it("creates stable notice cache keys for equivalent filter order", () => {
    const a = createListingNoticeRouteCacheKey(
      normalizeListingsFilterCriteria({
        regionType: ["서울", "경기", "서울"],
        rentalTypes: ["청년", "신혼부부"],
        supplyTypes: ["행복주택"],
        houseTypes: ["오피스텔", "아파트"],
        sortType: "최신공고순",
        status: "",
      }),
      1,
      10,
      "",
      "public"
    );
    const b = createListingNoticeRouteCacheKey(
      normalizeListingsFilterCriteria({
        regionType: ["경기", "서울"],
        rentalTypes: ["신혼부부", "청년"],
        supplyTypes: ["행복주택"],
        houseTypes: ["아파트", "오피스텔"],
        sortType: "최신공고순",
        status: "",
      }),
      1,
      10,
      "",
      "public"
    );

    expect(a).toBe(b);
  });

  it("scopes cookie-backed requests away from public cache", () => {
    const publicRequest = {
      cookies: {
        get: () => undefined,
      },
    } as never;
    const scopedRequest = {
      cookies: {
        get: (key: string) =>
          key === "access_token"
            ? { value: "token-a" }
            : key === "pinpoint_id"
              ? { value: "pin-1" }
              : undefined,
      },
    } as never;

    expect(resolveListingsRouteCacheScope(publicRequest)).toBe("public");
    expect(resolveListingsRouteCacheScope(scopedRequest)).not.toBe("public");
    expect(resolveListingsRouteCacheScope(scopedRequest)).toContain("session:");
  });

  it("invalidates cached listings route entries", async () => {
    const key = createListingSearchRouteCacheKey(
      normalizeListingSearchCriteria({
        keyword: "행복주택",
        sortType: "LATEST",
        status: "ALL",
      }),
      "public"
    );

    const first = await getOrLoadListingsRouteCache(key, async () => ({
      id: "first",
    }));
    const second = await getOrLoadListingsRouteCache(key, async () => ({
      id: "second",
    }));

    expect(first.cacheStatus).toBe("MISS");
    expect(second.cacheStatus).toBe("HIT");
    expect(second.data).toEqual({ id: "first" });

    await invalidateAllListingsRouteCaches();

    const third = await getOrLoadListingsRouteCache(key, async () => ({
      id: "third",
    }));

    expect(third.cacheStatus).toBe("MISS");
    expect(third.data).toEqual({ id: "third" });
  });
});
