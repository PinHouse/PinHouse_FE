import type { ListingListFilterBody, ListingListPage } from "@/src/entities/listings/model/type";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

export type NoticeFirstPage = {
  pinpointId: string;
  page: ListingListPage;
};

export type ListingsNoticeBffResponse = {
  success: boolean;
  data?: NoticeFirstPage;
};

type FetchNoticeInitialArgs = ListingListFilterBody;

export async function fetchNoticeInitialFromBff({
  regionType,
  rentalTypes,
  supplyTypes,
  houseTypes,
  status,
  sortType,
}: FetchNoticeInitialArgs): Promise<NoticeFirstPage | null> {
  const { baseUrl, forwardedHeaders } = await getBffRequestContext();
  const query = new URLSearchParams({
    page: "1",
    offSet: "10",
  });

  const res = await fetch(`${baseUrl}/api/listings/notice?${query.toString()}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      ...Object.fromEntries(forwardedHeaders.entries()),
      "Content-Type": "application/json",
    },
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

  const body = (await res.json()) as ListingsNoticeBffResponse;
  if (!body.success || !body.data) return null;

  return body.data;
}
