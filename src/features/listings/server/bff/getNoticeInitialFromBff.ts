import { headers } from "next/headers";
import type { ListingListPage } from "@/src/entities/listings/model/type";

export type NoticeFirstPage = {
  pinpointId: string;
  page: ListingListPage;
};

export type ListingsNoticeBffResponse = {
  success: boolean;
  data?: NoticeFirstPage;
};

type FetchNoticeInitialArgs = {
  status: string;
  sortType: string;
};

export async function fetchNoticeInitialFromBff({
  status,
  sortType,
}: FetchNoticeInitialArgs): Promise<NoticeFirstPage | null> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;
  const cookieHeader = h.get("cookie") ?? "";

  const res = await fetch(`${baseUrl}/api/listings/notice`, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    body: JSON.stringify({ status, sortType }),
  });

  if (!res.ok) return null;

  const body = (await res.json()) as ListingsNoticeBffResponse;
  if (!body.success || !body.data) return null;

  return body.data;
}
