import { cookies } from "next/headers";
import { NOTICE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";
import { ListingListFilterBody, ListingListPage } from "@/src/entities/listings/model/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type getNoticePageProps = ListingListFilterBody & {
  page?: number;
  offSet?: number;
};

export async function getNoticeFirstPageOnServer({
  regionType,
  rentalTypes,
  supplyTypes,
  houseTypes,
  status,
  sortType,
  page = 1,
  offSet = 10,
}: getNoticePageProps) {
  const cookieStore = await cookies();
  const pinpointId = cookieStore.get("pinpoint_id")?.value;
  const accessToken = cookieStore.get("access_token")?.value;
  const url = NOTICE_ENDPOINT;

  if (!pinpointId || !API_BASE_URL) return null;

  const query = new URLSearchParams({
    page: String(page),
    offSet: String(offSet),
  });

  const res = await fetch(`${API_BASE_URL}${url}?${query.toString()}`, {
    method: "POST",
    headers: {
      cookie: cookieStore.toString(),
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: "no-store",
    body: JSON.stringify({
      regionType,
      rentalTypes,
      supplyTypes,
      houseTypes,
      status,
      sortType,
    }),
  });

  if (!res.ok) return null;
  const body = (await res.json()) as IResponse<ListingListPage>;
  if (!body?.success || !body.data) return null;
  return { pinpointId, page: body.data };
}
