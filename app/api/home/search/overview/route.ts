import { NextRequest, NextResponse } from "next/server";
import { getHomeSearchOverviewOnServer } from "@/src/features/home/server/callServer/getHomeSearchOnServer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") ?? "";
    // 7. BFF route handler가 외부 API 호출 전용 server 함수로 위임한다.
    const data = await getHomeSearchOverviewOnServer(q);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch home search overview." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
