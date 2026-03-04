import { NextResponse } from "next/server";
import { getHomePinpointCount } from "@/src/features/home/server/getHomeNoticesFirstPageOnServer";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const maxTimeParam = searchParams.get("maxTime");
    const maxTime = maxTimeParam ? Number(maxTimeParam) : 60;
    const safeMaxTime = Number.isFinite(maxTime) ? maxTime : 60;
    const data = await getHomePinpointCount(safeMaxTime);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch home notice count." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, data: { count: data.count } },
      { status: 200, headers: { "x-route-hit": "home-count" } }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
