import { headers } from "next/headers";
import { UnitTypeRespnse } from "@/src/entities/listings/model/type";

export type CompareBffResponse = {
  success: boolean;
  data?: UnitTypeRespnse;
};

type FetchCompareInitialFromBffArgs = {
  noticeId: string;
  sortType: string;
  nearbyFacilities?: string[];
};

export async function fetchCompareInitialFromBff({
  noticeId,
  sortType,
  nearbyFacilities = [],
}: FetchCompareInitialFromBffArgs) {
  if (!noticeId) return null;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;
  const cookieHeader = h.get("cookie") ?? "";

  const query = new URLSearchParams({
    noticeId,
    sortType,
  });

  for (const f of nearbyFacilities) query.append("nearbyFacilities", f);

  const res = await fetch(`${baseUrl}/api/listings/compare?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  const body = (await res.json()) as CompareBffResponse;
  if (!body?.success || !body.data) return null;

  return body.data;
}
