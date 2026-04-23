import type { NoticeContent, SliceResponse } from "@/src/entities/home/model/type";
import type { PinPoint } from "@/src/entities/pinpoint/model/pinpoint.type";
import type { ListingItem } from "@/src/entities/listings/model/type";
import { getBffRequestContext } from "@/src/shared/api/server/fowardHeaders";

type HomeNoticeInitial = {
  pinpointId: string;
  page: SliceResponse<NoticeContent>;
};

type HomeCountInitial = {
  pinpointId: string;
  count: number;
};

type HomePinpointsInitial = {
  userName: string;
  pinPoints: PinPoint[];
};

type HomeBootstrapBffResponse = {
  success: boolean;
  data?: {
    initial: HomeNoticeInitial | null;
    initialCount: HomeCountInitial | null;
    initialPinpoints: HomePinpointsInitial | null;
    initialRecommended: SliceResponse<ListingItem> | null;
  };
};

export async function getHomeInitialData() {
  const { baseUrl, forwardedHeaders } = await getBffRequestContext();

  try {
    const res = await fetch(`${baseUrl}/api/home/bootstrap`, {
      method: "GET",
      headers: forwardedHeaders,
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        initial: null,
        initialCount: null,
        initialPinpoints: null,
        initialRecommended: null,
      };
    }

    const body = (await res.json()) as HomeBootstrapBffResponse;
    if (!body.success || !body.data) {
      return {
        initial: null,
        initialCount: null,
        initialPinpoints: null,
        initialRecommended: null,
      };
    }

    return {
      initial: body.data.initial,
      initialCount: body.data.initialCount,
      initialPinpoints: body.data.initialPinpoints,
      initialRecommended: body.data.initialRecommended,
    };
  } catch {
    return {
      initial: null,
      initialCount: null,
      initialPinpoints: null,
      initialRecommended: null,
    };
  }
}
