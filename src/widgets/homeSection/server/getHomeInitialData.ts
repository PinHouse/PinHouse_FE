import type { NoticeContent, SliceResponse } from "@/src/entities/home/model/type";
import type { PinPoint } from "@/src/entities/pinpoint/model/pinpoint.type";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

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

type HomePinpointsBffResponse = {
  success: boolean;
  data?: {
    userName: string;
    pinPoints: PinPoint[];
  };
};

export async function getHomeInitialData() {
  let initial: HomeNoticeBffResponse["data"] | null = null;
  let initialCount: HomeCountBffResponse["data"] | null = null;
  let initialPinpoints: HomePinpointsBffResponse["data"] | null = null;

  const { baseUrl, forwardedHeaders } = await getBffRequestContext();

  try {
    const res = await fetch(`${baseUrl}/api/home/notice`, {
      method: "GET",
      headers: forwardedHeaders,
      cache: "no-store",
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
      headers: forwardedHeaders,
      cache: "no-store",
    });

    if (res.ok) {
      const body = (await res.json()) as HomeCountBffResponse;
      if (body.success && body.data) initialCount = body.data;
    }
  } catch {
    initialCount = null;
  }

  try {
    const res = await fetch(`${baseUrl}/api/home/pinpoints`, {
      method: "GET",
      headers: forwardedHeaders,
      cache: "no-store",
    });

    if (res.ok) {
      const body = (await res.json()) as HomePinpointsBffResponse;
      if (body.success && body.data) initialPinpoints = body.data;
    }
  } catch {
    initialPinpoints = null;
  }

  return { initial, initialCount, initialPinpoints };
}
