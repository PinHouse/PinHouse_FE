import type { ListingListFilterBody, ListingListPage } from "@/src/entities/listings/model/type";

type ListingsNoticeBffResponse = {
  success: boolean;
  data?: {
    pinpointId: string;
    page: ListingListPage;
  };
};

type ListingsSearchBffResponse = {
  success: boolean;
  data?: ListingListPage;
};

type GetListingNoticePageFromBffArgs = ListingListFilterBody & {
  page?: number;
  offSet?: number;
};

type GetListingSearchPageFromBffArgs = {
  q: string;
  sortType: string;
  status: string;
  page?: number;
  offSet?: number;
};

export async function getListingNoticePageFromBff({
  regionType,
  rentalTypes,
  supplyTypes,
  houseTypes,
  status,
  sortType,
  page = 1,
  offSet = 10,
}: GetListingNoticePageFromBffArgs): Promise<ListingListPage> {
  const query = new URLSearchParams({
    page: String(page),
    offSet: String(offSet),
  });

  const res = await fetch(`/api/listings/notice?${query.toString()}`, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    headers: {
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

  if (!res.ok) {
    throw new Error("Failed to fetch listings notice page.");
  }

  const body = (await res.json()) as ListingsNoticeBffResponse;
  if (!body.success || !body.data?.page) {
    throw new Error("Invalid listings notice response.");
  }

  return body.data.page;
}

export async function getListingSearchPageFromBff({
  q,
  sortType,
  status,
  page = 1,
  offSet = 10,
}: GetListingSearchPageFromBffArgs): Promise<ListingListPage> {
  const query = new URLSearchParams({
    q,
    page: String(page),
    offSet: String(offSet),
    sortType,
    status,
  });

  const res = await fetch(`/api/listings/search?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch listings search page.");
  }

  const body = (await res.json()) as ListingsSearchBffResponse;
  if (!body.success || !body.data) {
    throw new Error("Invalid listings search response.");
  }

  return body.data;
}
