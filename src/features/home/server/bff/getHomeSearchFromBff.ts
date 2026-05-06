import "server-only";

import type {
  GlobalListType,
  GlobalSearchItem,
  SliceResponse,
} from "@/src/entities/home/model/type";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

type HomeSearchBffResponse<T> = {
  success: boolean;
  data?: T;
};

async function fetchHomeSearchFromBff<T>(path: string, query: URLSearchParams) {
  const { baseUrl, forwardedHeaders } = await getBffRequestContext();

  const res = await fetch(`${baseUrl}${path}?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: forwardedHeaders,
  });

  if (!res.ok) return null;

  const body = (await res.json()) as HomeSearchBffResponse<T>;
  if (!body.success || !body.data) return null;

  return body.data;
}

export async function getHomeSearchOverviewFromBff(q: string) {
  const keyword = q.trim();
  if (!keyword) return null;

  // 6. SSR용 BFF 호출 endpoint: GET /api/home/search/overview?q={keyword}
  return fetchHomeSearchFromBff<GlobalListType>(
    "/api/home/search/overview",
    new URLSearchParams({ q: keyword })
  );
}

export async function getHomeSearchCategoryFromBff({
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

  // 추가 조회 endpoint: GET /api/home/search/category?type={type}&q={keyword}&page={page}
  return fetchHomeSearchFromBff<SliceResponse<GlobalSearchItem>>(
    "/api/home/search/category",
    new URLSearchParams({
      type,
      q: keyword,
      page: String(page),
    })
  );
}
