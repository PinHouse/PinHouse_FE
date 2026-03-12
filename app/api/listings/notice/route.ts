import { NextRequest, NextResponse } from "next/server";
import { getNoticeFirstPageOnServer } from "@/src/features/listings/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { status, sortType } = await req.json();
    const data = await getNoticeFirstPageOnServer({ status, sortType });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch home notices first page." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
