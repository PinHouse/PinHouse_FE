import { NextRequest, NextResponse } from "next/server";
import { getListingComplexSummaryOnServer } from "@/src/features/listings/server/callServer/getListingDetailOnServer";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ complexId: string }> }
) {
  try {
    const { complexId } = await params;
    const pinPointId = req.nextUrl.searchParams.get("pinPointId") ?? undefined;
    const data = await getListingComplexSummaryOnServer(complexId, pinPointId);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listing complex summary." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
