import type {
  GlobalListType,
  GlobalSearchItem,
  NoticeContent,
  NoticeCount,
  SliceResponse,
} from "@/src/entities/home/model/type";
import type { ListingItem } from "@/src/entities/listings/model/type";

type HomeNoticeBffResponse = {
  success: boolean;
  data?: {
    pinpointId: string;
    page: SliceResponse<NoticeContent>;
  };
};

type HomeCountBffResponse = {
  success: boolean;
  data?: {
    pinpointId: string;
    count: number;
  };
};

type HomeRecommendedBffResponse = {
  success: boolean;
  data?: SliceResponse<ListingItem>;
};

type HomeSearchOverviewBffResponse = {
  success: boolean;
  data?: GlobalListType;
};

type HomeSearchCategoryBffResponse = {
  success: boolean;
  data?: SliceResponse<GlobalSearchItem>;
};

export async function getHomeNoticePageFromBff(
  page = 1,
  offSet = 10,
  pinpointId: string
): Promise<SliceResponse<NoticeContent>> {
  const query = new URLSearchParams({
    pinpointId,
    page: String(page),
    offSet: String(offSet),
  });

  const res = await fetch(`/api/home/notice?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch home notice page.");

  const body = (await res.json()) as HomeNoticeBffResponse;
  if (!body.success || !body.data?.page) throw new Error("Invalid home notice response.");

  return body.data.page;
}

export async function getHomeNoticeCountFromBff(maxTime = 60): Promise<NoticeCount> {
  const query = new URLSearchParams({
    maxTime: String(maxTime),
  });

  const res = await fetch(`/api/home/count?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch home notice count.");

  const body = (await res.json()) as HomeCountBffResponse;
  if (!body.success || typeof body.data?.count !== "number") {
    throw new Error("Invalid home notice count response.");
  }

  return { count: body.data.count };
}

export async function getHomeRecommendedPageFromBff(
  page = 1,
  offSet = 10
): Promise<SliceResponse<ListingItem>> {
  const query = new URLSearchParams({
    page: String(page),
    offSet: String(offSet),
  });

  const res = await fetch(`/api/home/recommended?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch home recommended page.");

  const body = (await res.json()) as HomeRecommendedBffResponse;
  if (!body.success || !body.data) throw new Error("Invalid home recommended response.");

  return body.data;
}

export async function getHomeSearchOverviewFromBff(q: string): Promise<GlobalListType> {
  const query = new URLSearchParams({ q });

  // 클라이언트 캐시가 비었거나 stale이면 동일한 BFF endpoint를 호출한다.
  const res = await fetch(`/api/home/search/overview?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch home search overview.");

  const body = (await res.json()) as HomeSearchOverviewBffResponse;
  if (!body.success || !body.data) throw new Error("Invalid home search overview response.");

  return body.data;
}

export async function getHomeSearchCategoryFromBff({
  type,
  q,
  page = 1,
}: {
  type: string;
  q: string;
  page?: number;
}): Promise<SliceResponse<GlobalSearchItem>> {
  const query = new URLSearchParams({
    type,
    q,
    page: String(page),
  });

  // 카테고리 더보기는 페이지 단위로 BFF endpoint를 호출한다.
  const res = await fetch(`/api/home/search/category?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch home search category.");

  const body = (await res.json()) as HomeSearchCategoryBffResponse;
  if (!body.success || !body.data) throw new Error("Invalid home search category response.");

  return body.data;
}
