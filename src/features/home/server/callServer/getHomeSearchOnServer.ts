import "server-only";

import { cookies } from "next/headers";
import { HOME_SEARCH_POPULAR_ENDPOINT } from "@/src/shared/api";
import type {
  GlobalListType,
  GlobalSearchItem,
  SliceResponse,
} from "@/src/entities/home/model/type";
import type { IResponse } from "@/src/shared/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function getHomeSearchHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return {
    cookie: cookieStore.toString(),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}

async function fetchHomeSearchFromApi<T>(path: string, params: URLSearchParams) {
  if (!API_BASE_URL) return null;

  const res = await fetch(`${API_BASE_URL}${path}?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: await getHomeSearchHeaders(),
  });

  if (!res.ok) return null;

  const body = (await res.json()) as IResponse<T>;
  if (!body?.success || !body.data) return null;

  return body.data;
}

export async function getHomeSearchOverviewOnServer(q: string) {
  const keyword = q.trim();
  if (!keyword) return null;

  const params = new URLSearchParams({ q: keyword });

  // 8. 최종 외부 API endpoint: GET {API_BASE_URL}/home/search/overview?q={keyword}
  return fetchHomeSearchFromApi<GlobalListType>(
    `${HOME_SEARCH_POPULAR_ENDPOINT}/overview`,
    params
  );
}

export async function getHomeSearchCategoryOnServer({
  type,
  q,
  page = 1,
}: {
  type: string;
  q: string;
  page?: number;
}) {
  const keyword = q.trim();
  if (!keyword || !type) return null;

  const params = new URLSearchParams({
    type,
    q: keyword,
    page: String(page),
  });

  // 최종 외부 API endpoint: GET {API_BASE_URL}/home/search/category?type={type}&q={keyword}&page={page}
  return fetchHomeSearchFromApi<SliceResponse<GlobalSearchItem>>(
    `${HOME_SEARCH_POPULAR_ENDPOINT}/category`,
    params
  );
}
