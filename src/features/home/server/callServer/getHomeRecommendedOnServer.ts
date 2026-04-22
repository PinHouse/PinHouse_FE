import "server-only";
import { cookies } from "next/headers";
import { HOME_RECOMMENDED_ENDPOINT } from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";
import type { SliceResponse } from "@/src/entities/home/model/type";
import type { ListingItem } from "@/src/entities/listings/model/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getHomeRecommendedOnServer(
  page = 1,
  offSet = 10
): Promise<SliceResponse<ListingItem> | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!API_BASE_URL) return null;

  const query = new URLSearchParams({
    page: String(page),
    offSet: String(offSet),
  });

  const res = await fetch(`${API_BASE_URL}${HOME_RECOMMENDED_ENDPOINT}?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!res.ok) return null;

  const body = (await res.json()) as IResponse<SliceResponse<ListingItem>>;
  if (!body?.success || !body.data) return null;

  return body.data;
}
