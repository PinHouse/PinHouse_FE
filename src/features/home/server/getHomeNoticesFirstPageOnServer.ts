import "server-only";
import { cookies } from "next/headers";
import { HOME_NOTICE_ENDPOINT } from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";
import type { NoticeContent, SliceResponse } from "@/src/entities/home/model/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getHomeNoticesFirstPageOnServer() {
  const cookieStore = await cookies();
  const pinpointId = cookieStore.get("pinpoint_id")?.value;
  const accessToken = cookieStore.get("access_token")?.value;

  if (!pinpointId || !API_BASE_URL) return null;

  const query = new URLSearchParams({
    pinpointId,
    page: "1",
    offSet: "10",
  });

  const res = await fetch(`${API_BASE_URL}${HOME_NOTICE_ENDPOINT}?${query.toString()}`, {
    method: "GET",
    headers: {
      cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const body = (await res.json()) as IResponse<SliceResponse<NoticeContent>>;
  console.log("[SSR body]", body);
  if (!body?.success || !body.data) return null;

  return { pinpointId, page: body.data };
}
