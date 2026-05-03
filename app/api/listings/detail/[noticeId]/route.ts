import { NextRequest, NextResponse } from "next/server";
import { getListingDetailBasicOnServer } from "@/src/features/listings/server/callServer/getListingDetailOnServer";
import type { LstingBody } from "@/src/entities/listings/model/type";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ noticeId: string }> }
) {
  try {
    const { noticeId } = await params;
    const body = (await req.json()) as LstingBody;
    const data = await getListingDetailBasicOnServer(noticeId, body);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listing detail." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
