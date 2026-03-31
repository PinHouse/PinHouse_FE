import { cookies } from "next/headers";
import { NOTICE_ENDPOINT, POPULAR_SEARCH_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { UnitTypeRespnse } from "@/src/entities/listings/model/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type GetCompareFirstPageOnServerArgs = {
  noticeId: string;
  sortType: string;
  nearbyFacilities?: string[];
  pinPointId?: string; // route에서 넘기면 fallback으로 사용
};

export async function getCompareFirstPageOnServer({
  noticeId,
  sortType,
  nearbyFacilities = [],
  pinPointId: pinPointIdFromArg,
}: GetCompareFirstPageOnServerArgs) {
  if (!API_BASE_URL || !noticeId) return null;

  const cookieStore = await cookies();
  const pinPointId = cookieStore.get("pinpoint_id")?.value ?? pinPointIdFromArg;
  const accessToken = cookieStore.get("access_token")?.value;

  if (!pinPointId) return null;

  const query = new URLSearchParams({
    pinPointId,
    sortType,
  });

  for (const f of nearbyFacilities) query.append("nearbyFacilities", f);

  const url = `${API_BASE_URL}${NOTICE_ENDPOINT}/${encodeURIComponent(noticeId)}/compare?${query.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    // headers: {
    //   cookie: cookieStore.toString(),
    //   ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    // },
  });

  if (!res.ok) return null;

  const body = (await res.json()) as IResponse<UnitTypeRespnse>;
  if (!body?.success || !body.data) return null;

  return body.data;
}
