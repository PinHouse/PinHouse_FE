import { NextRequest, NextResponse } from "next/server";
import { getPopularSearchOnServer } from "@/src/features/listings/server/getSearchPageOnServer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const limit = Number(sp.get("limit") ?? "5");
    const data = await getPopularSearchOnServer(limit);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch popular search keywords." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
