import type { PopularKeywordItem } from "@/src/entities/listings/model/type";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

type PopularSearchBffResponse = {
  success: boolean;
  data?: PopularKeywordItem[];
};

export async function getPopularSearchFromBff(limit = 5) {
  const { baseUrl, forwardedHeaders } = await getBffRequestContext();
  const query = new URLSearchParams({ limit: String(limit) });

  const res = await fetch(`${baseUrl}/api/listings/search/popular?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: forwardedHeaders,
  });

  if (!res.ok) return null;

  const body = (await res.json()) as PopularSearchBffResponse;
  if (!body?.success || !body.data) return null;

  return body.data;
}
