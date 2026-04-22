import type { NoticeContent, NoticeCount, SliceResponse } from "@/src/entities/home/model/type";

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

export async function getHomeNoticePageFromBff(
  page = 1,
  offSet = 10
): Promise<SliceResponse<NoticeContent>> {
  const query = new URLSearchParams({
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
