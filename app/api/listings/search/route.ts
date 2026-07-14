import { NextRequest, NextResponse } from "next/server";
import { parseListingSearchCriteriaFromSearchParams } from "@/src/features/listings/model";
import {
  createListingSearchRouteCacheKey,
  getOrLoadListingsRouteCache,
  resolveListingsRouteCacheScope,
} from "@/src/features/listings/server/bff/listingsRouteCache";
import { getSearchPageOnServer } from "@/src/features/listings/server/callServer/getSearchPageOnServer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const criteria = parseListingSearchCriteriaFromSearchParams(req.nextUrl.searchParams);
    const cacheScope = resolveListingsRouteCacheScope(req);
    const cacheKey = createListingSearchRouteCacheKey(criteria, cacheScope);
    const { cacheStatus, data } = await getOrLoadListingsRouteCache(cacheKey, () =>
      getSearchPageOnServer(criteria)
    );
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listings search page." },
        { status: 404, headers: { "x-pinhouse-cache": cacheStatus } }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200, headers: { "x-pinhouse-cache": cacheStatus } }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
