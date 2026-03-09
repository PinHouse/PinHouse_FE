import type { NoticeContent, NoticeCount, SliceResponse } from "@/src/entities/home/model/type";
import { headers } from "next/headers";
import { ListingListPage } from "@/src/entities/listings/model/type";

type ListingsNoticeBffResponse = {
  success: boolean;
  data?: {
    pinpointId: string;
    page: ListingListPage;
  };
};

type ListingsCountBffResponse = {
  success: boolean;
  data?: NoticeCount;
};

export async function getNoticeInitialData() {
  let initial: ListingsNoticeBffResponse["data"] | null = null;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;
  const cookieHeader = h.get("cookie") ?? "";

  try {
    const res = await fetch(`${baseUrl}/api/listings/notice`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader, // 서버 컴포넌트에서 쿠키 전달이 필요할 때만
      },
      body: JSON.stringify({
        status: "전체",
        sortType: "최신공고순",
      }),
    });

    if (res.ok) {
      const body = (await res.json()) as ListingsNoticeBffResponse;
      if (body.success && body.data) initial = body.data;
    }
  } catch (e) {
    initial = null;
  }

  return {
    initial,
  };
}
