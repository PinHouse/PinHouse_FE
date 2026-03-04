import type { NoticeContent, NoticeCount, SliceResponse } from "@/src/entities/home/model/type";
import { headers } from "next/headers";

type HomeNoticeBffResponse = {
  success: boolean;
  data?: {
    pinpointId: string;
    page: SliceResponse<NoticeContent>;
  };
};

type HomeCountBffResponse = {
  success: boolean;
  data?: NoticeCount;
};

export async function getHomeInitialData() {
  let initial: HomeNoticeBffResponse["data"] | null = null;
  let initialCount: HomeCountBffResponse["data"] | null = null;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;
  const cookieHeader = h.get("cookie") ?? "";

  try {
    const res = await fetch(`${baseUrl}/api/home/notice`, {
      method: "GET",
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });

    if (res.ok) {
      const body = (await res.json()) as HomeNoticeBffResponse;
      if (body.success && body.data) initial = body.data;
    }
  } catch {
    initial = null;
  }

  try {
    const res = await fetch(`${baseUrl}/api/home/count?maxTime=60`, {
      method: "GET",
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });

    if (res.ok) {
      const body = (await res.json()) as HomeCountBffResponse;
      if (body.success && body.data) initialCount = body.data;
    }
  } catch (e) {
    initialCount = null;
  }

  return { initial, initialCount };
}
