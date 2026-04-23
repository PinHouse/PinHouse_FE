import { NextResponse } from "next/server";
import {
  getHomeNoticesPageOnServer,
  getHomePinpointCount,
} from "@/src/features/home/server/callServer/getHomeNoticesFirstPageOnServer";
import { getHomePinpointsOnServer } from "@/src/features/home/server/callServer/getHomePinpointsOnServer";
import { getHomeRecommendedOnServer } from "@/src/features/home/server/callServer/getHomeRecommendedOnServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [noticeResult, countResult, pinpointsResult, recommendedResult] =
      await Promise.allSettled([
        getHomeNoticesPageOnServer(1, 10),
        getHomePinpointCount(60),
        getHomePinpointsOnServer(),
        getHomeRecommendedOnServer(1, 10),
      ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          initial: noticeResult.status === "fulfilled" ? noticeResult.value : null,
          initialCount: countResult.status === "fulfilled" ? countResult.value : null,
          initialPinpoints: pinpointsResult.status === "fulfilled" ? pinpointsResult.value : null,
          initialRecommended:
            recommendedResult.status === "fulfilled" ? recommendedResult.value : null,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
