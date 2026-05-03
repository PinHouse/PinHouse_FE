import "server-only";

import { cookies } from "next/headers";
import { COMPLEXES_ENDPOINT, NOTICE_ENDPOINT } from "@/src/shared/api";
import type { IResponse } from "@/src/shared/types";
import type {
  Environmnt,
  ListingDetailData,
  ListingSummary,
  LstingBody,
  UnitTypeRespnse,
} from "@/src/entities/listings/model/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type QueryValue = string | number | boolean | string[] | undefined | null;
type QueryParams = Record<string, QueryValue>;

async function getServerRequestContext() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const pinPointId = cookieStore.get("pinpoint_id")?.value;

  return {
    pinPointId,
    headers: {
      cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };
}

function appendQuery(params?: QueryParams) {
  const query = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach(item => query.append(key, item));
      return;
    }
    query.set(key, String(value));
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

async function fetchFromApi<T>(
  path: string,
  options: RequestInit & { query?: QueryParams } = {}
): Promise<T | null> {
  if (!API_BASE_URL) return null;

  const { headers, query, ...init } = options;
  const context = await getServerRequestContext();
  const res = await fetch(`${API_BASE_URL}${path}${appendQuery(query)}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...context.headers,
      ...headers,
    },
  });

  if (!res.ok) return null;

  const body = (await res.json()) as IResponse<T>;
  if (!body?.success || body.data === undefined || body.data === null) return null;

  return body.data;
}

export async function getListingDetailBasicOnServer(noticeId: string, body: LstingBody) {
  if (!noticeId) return null;

  const { pinPointId } = await getServerRequestContext();
  const resolvedPinPointId = body.pinPointId || pinPointId;
  if (!resolvedPinPointId) return null;
  console.log(body, "body");
  return fetchFromApi<ListingDetailData>(`${NOTICE_ENDPOINT}/${encodeURIComponent(noticeId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
      pinPointId: resolvedPinPointId,
    }),
  });
}

export async function getListingComplexSummaryOnServer(complexId: string, pinPointId?: string) {
  if (!complexId) return null;

  const { pinPointId: cookiePinPointId } = await getServerRequestContext();
  const resolvedPinPointId = pinPointId || cookiePinPointId;
  if (!resolvedPinPointId) return null;

  return fetchFromApi<ListingSummary>(`${COMPLEXES_ENDPOINT}/${encodeURIComponent(complexId)}`, {
    method: "GET",
    query: { pinPointId: resolvedPinPointId },
  });
}

export async function getListingComplexInfraOnServer(complexId: string) {
  if (!complexId) return null;

  return fetchFromApi<Environmnt>(`${COMPLEXES_ENDPOINT}/infra/${encodeURIComponent(complexId)}`, {
    method: "GET",
  });
}

export async function getListingComplexResourceOnServer<T>(complexId: string, resource: string) {
  if (!complexId || !resource) return null;

  return fetchFromApi<T>(`${COMPLEXES_ENDPOINT}/${resource}/${encodeURIComponent(complexId)}`, {
    method: "GET",
  });
}

export async function getListingComplexTransitOnServer<T>(
  complexId: string,
  params: QueryParams = {}
) {
  if (!complexId) return null;

  const { pinPointId } = await getServerRequestContext();
  const resolvedPinPointId = params.pinPointId || pinPointId;
  if (!resolvedPinPointId) return null;

  return fetchFromApi<T>(`${COMPLEXES_ENDPOINT}/transit/${encodeURIComponent(complexId)}`, {
    method: "GET",
    query: {
      ...params,
      pinPointId: resolvedPinPointId,
    },
  });
}

export async function getListingDetailFilterOnServer<T>(noticeId: string, filterType: string) {
  if (!noticeId || !filterType) return null;

  return fetchFromApi<T>(
    `${NOTICE_ENDPOINT}/${encodeURIComponent(noticeId)}/filter/${filterType}`,
    {
      method: "GET",
    }
  );
}

export async function getListingCompareOnServer({
  noticeId,
  sortType,
  nearbyFacilities = [],
  pinPointId,
}: {
  noticeId: string;
  sortType: string;
  nearbyFacilities?: string[];
  pinPointId?: string;
}) {
  if (!noticeId) return null;

  const { pinPointId: cookiePinPointId } = await getServerRequestContext();
  const resolvedPinPointId = pinPointId || cookiePinPointId;
  if (!resolvedPinPointId) return null;

  return fetchFromApi<UnitTypeRespnse>(
    `${NOTICE_ENDPOINT}/${encodeURIComponent(noticeId)}/compare`,
    {
      method: "GET",
      query: {
        pinPointId: resolvedPinPointId,
        sortType,
        nearbyFacilities,
      },
    }
  );
}
