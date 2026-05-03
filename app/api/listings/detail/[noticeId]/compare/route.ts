import { NextRequest, NextResponse } from "next/server";
import { getListingCompareOnServer } from "@/src/features/listings/server/callServer/getListingDetailOnServer";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ noticeId: string }> }
) {
  try {
    const { noticeId } = await params;
    const sp = req.nextUrl.searchParams;
    const sortType = sp.get("sortType") ?? "LATEST";
    const pinPointId = sp.get("pinPointId") ?? undefined;
    const nearbyFacilities = sp.getAll("nearbyFacilities");

    const data = await getListingCompareOnServer({
      noticeId,
      sortType,
      nearbyFacilities,
      pinPointId,
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listing compare." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
