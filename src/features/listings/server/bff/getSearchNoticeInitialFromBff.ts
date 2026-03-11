import { headers } from "next/headers";
import { ListingListPage, PopularKeywordItem } from "@/src/entities/listings/model/type";

type GetSearchFirstPageProps = {
  q: string;
  sortType: string;
  status: string;
};

type SearchBffResponse = {
  success: boolean;
  data?: ListingListPage;
};

type PopularSearchBffResponse = {
  success: boolean;
  data?: PopularKeywordItem[];
};

export async function getSearchNoticeInitialFromBff({
  q,
  sortType,
  status,
}: GetSearchFirstPageProps) {
  const keyword = q.trim();
  if (!keyword) return null;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;
  const cookieHeader = h.get("cookie") ?? "";
  const query = new URLSearchParams({
    q: keyword,
    page: "1",
    offSet: "10",
    sortType,
    status,
  });

  const res = await fetch(`${baseUrl}/api/listings/search?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  const body = (await res.json()) as SearchBffResponse;
  if (!body?.success || !body.data) return null;

  return body.data;
}

export async function getPopularSearchOnServer(limit = 5) {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const query = new URLSearchParams({ limit: String(limit) });
  const res = await fetch(`${baseUrl}/api/listings/search/popular?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  const body = (await res.json()) as PopularSearchBffResponse;
  if (!body?.success || !body.data) return null;

  return body.data;
}
