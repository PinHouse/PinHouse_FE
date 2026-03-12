import { cookies } from "next/headers";
import { NOTICE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { ListingListPage } from "@/src/entities/listings/model/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type getNoticePageProps = {
  status: string;
  sortType: string;
};

export async function getNoticeFirstPageOnServer({ status, sortType }: getNoticePageProps) {
  const cookieStore = await cookies();
  const pinpointId = cookieStore.get("pinpoint_id")?.value;
  const accessToken = cookieStore.get("access_token")?.value;
  const url = NOTICE_ENDPOINT;
  if (!pinpointId || !API_BASE_URL) return null;

  const query = new URLSearchParams({
    pinpointId,
    page: "1",
    offSet: "10",
  });

  const res = await fetch(`${API_BASE_URL}${url}?${query.toString()}`, {
    method: "POST",
    headers: {
      cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: "no-store",
    body: JSON.stringify({
      status: status,
      sortType: sortType,
    }),
  });

  if (!res.ok) return null;
  const body = (await res.json()) as IResponse<ListingListPage>;
  if (!body?.success || !body.data) return null;
  return { pinpointId, page: body.data };
}
