import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import type { ListingSearchCriteria } from "@/src/features/listings/model/searchCriteria";
import type { ListingsFilterCriteria } from "@/src/features/listings/model/listFilterCriteria";
import { getListingsCacheAdapter } from "@/src/features/listings/server/bff/listingsCacheAdapter";
import {
  normalizeListingSearchCriteria,
} from "@/src/features/listings/model/searchCriteria";
import { normalizeListingsFilterCriteria } from "@/src/features/listings/model/listFilterCriteria";

const LISTINGS_BFF_CACHE_VERSION = "v1";
const LISTINGS_ROUTE_CACHE_TTL_MS = 5 * 60 * 1000;

const inFlightStore = new Map<string, Promise<unknown>>();

type ListingsCacheStatus = "HIT" | "MISS" | "BYPASS";

function stableHash(value: unknown) {
  return createHash("sha1").update(JSON.stringify(value)).digest("hex");
}

async function cleanupExpiredCacheEntry(key: string, now: number) {
  const cached = await getListingsCacheAdapter().get(key);
  if (!cached) return null;
  if (cached.expiresAt > now) return cached;
  await getListingsCacheAdapter().deleteByPrefix(key);
  return null;
}

export function resolveListingsRouteCacheScope(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value ?? "";
  const pinpointId = request.cookies.get("pinpoint_id")?.value ?? "";

  if (!accessToken && !pinpointId) {
    return "public";
  }

  return `session:${stableHash({ accessToken, pinpointId })}`;
}

export function createListingSearchRouteCacheKey(
  criteria: ListingSearchCriteria,
  scope: string
) {
  const normalized = normalizeListingSearchCriteria(criteria);
  return `${LISTINGS_BFF_CACHE_VERSION}:listing-search:${scope}:${stableHash(normalized)}`;
}

export function createListingNoticeRouteCacheKey(
  filter: ListingsFilterCriteria,
  page: number,
  offSet: number,
  status: string,
  scope: string
) {
  const normalizedFilter = normalizeListingsFilterCriteria(filter);
  return `${LISTINGS_BFF_CACHE_VERSION}:listing-notice:${scope}:${stableHash({
    filter: normalizedFilter,
    page,
    offSet,
    status,
  })}`;
}

export async function getOrLoadListingsRouteCache<T>(
  key: string | null,
  loader: () => Promise<T | null>
): Promise<{ cacheStatus: ListingsCacheStatus; data: T | null }> {
  if (!key) {
    return {
      cacheStatus: "BYPASS",
      data: await loader(),
    };
  }

  const now = Date.now();
  const cached = await cleanupExpiredCacheEntry(key, now);
  if (cached) {
    return {
      cacheStatus: "HIT",
      data: cached.value as T,
    };
  }

  const existingTask = inFlightStore.get(key) as Promise<T | null> | undefined;
  if (existingTask) {
    const data = await existingTask;
    return {
      cacheStatus: "HIT",
      data,
    };
  }

  const task = loader()
    .then(data => {
      if (data) {
        return getListingsCacheAdapter().set(key, {
          value: data,
          expiresAt: Date.now() + LISTINGS_ROUTE_CACHE_TTL_MS,
        }).then(() => data);
      }
      return data;
    })
    .finally(() => {
      inFlightStore.delete(key);
    });

  inFlightStore.set(key, task);

  return {
    cacheStatus: "MISS",
    data: await task,
  };
}

export async function invalidateListingsRouteCacheByPrefix(prefix: string) {
  await getListingsCacheAdapter().deleteByPrefix(prefix);
  for (const key of inFlightStore.keys()) {
    if (key.startsWith(prefix)) {
      inFlightStore.delete(key);
    }
  }
}

export async function invalidateAllListingsRouteCaches() {
  await invalidateListingsRouteCacheByPrefix(`${LISTINGS_BFF_CACHE_VERSION}:listing-search:`);
  await invalidateListingsRouteCacheByPrefix(`${LISTINGS_BFF_CACHE_VERSION}:listing-notice:`);
}
