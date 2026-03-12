import { cookies } from "next/headers";
import { LISTING_SEARCH_ENDPOINT, POPULAR_SEARCH_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { ListingListPage, PopularKeywordItem } from "@/src/entities/listings/model/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type GetSearchPageOnServerProps = {
  q: string;
  page?: number;
  offSet?: number;
  sortType: string;
  status: string;
};

export async function getSearchPageOnServer({
  q,
  page = 1,
  offSet = 10,
  sortType,
  status,
}: GetSearchPageOnServerProps) {
  const keyword = q.trim();
  if (!keyword || !API_BASE_URL) return null;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const query = new URLSearchParams({
    q: keyword,
    page: String(page),
    offSet: String(offSet),
    sortType,
    status,
  });

  const res = await fetch(`${API_BASE_URL}${LISTING_SEARCH_ENDPOINT}?${query.toString()}`, {
    method: "GET",
    headers: {
      cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const body = (await res.json()) as IResponse<ListingListPage>;
  if (!body?.success || !body.data) return null;

  return body.data;
}

export async function getPopularSearchOnServer(limit = 5) {
  if (!API_BASE_URL) return null;
  const query = new URLSearchParams({ limit: String(limit) });
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${API_BASE_URL}${POPULAR_SEARCH_ENDPOINT}?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!res.ok) return null;
  const body = (await res.json()) as IResponse<PopularKeywordItem[]>;
  if (!body?.success || !body.data) return null;

  return body.data;
}
