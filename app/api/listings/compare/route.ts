import { NextRequest, NextResponse } from "next/server";
import { getCompareFirstPageOnServer } from "@/src/features/listings/server/callServer/getCompareFirstPageOnserver";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const noticeId = sp.get("noticeId") ?? "";
    const sortType = sp.get("sortType") ?? "LATEST";
    const pinPointId = sp.get("pinPointId") ?? undefined;
    const nearbyFacilities = sp.getAll("nearbyFacilities"); // 배열

    const data = await getCompareFirstPageOnServer({
      noticeId,
      sortType,
      nearbyFacilities,
      pinPointId,
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch compare first page." },
        { status: 401 }
      );
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch compare first page." },
      { status: 500 }
    );
  }
}
