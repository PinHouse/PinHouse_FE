import { NextResponse } from "next/server";
import { getListingDetailFilterOnServer } from "@/src/features/listings/server/callServer/getListingDetailOnServer";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ noticeId: string; filterType: string }> }
) {
  try {
    const { noticeId, filterType } = await params;
    const data = await getListingDetailFilterOnServer(noticeId, filterType);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listing detail filter." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
