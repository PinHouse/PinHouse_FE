import { UnitTypeRespnse } from "@/src/entities/listings/model/type";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

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

  const { baseUrl, forwardedHeaders } = await getBffRequestContext();
  const query = new URLSearchParams({
    noticeId,
    sortType,
  });

  for (const f of nearbyFacilities) query.append("nearbyFacilities", f);

  const res = await fetch(`${baseUrl}/api/listings/compare?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: forwardedHeaders,
  });

  if (!res.ok) return null;
  const body = (await res.json()) as CompareBffResponse;
  if (!body?.success || !body.data) return null;

  return body.data;
}
