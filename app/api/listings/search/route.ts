import { NextRequest, NextResponse } from "next/server";
import { getSearchPageOnServer } from "@/src/features/listings/server/getSearchPageOnServer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get("q") ?? "";
    const page = Number(sp.get("page") ?? "1");
    const offSet = Number(sp.get("offSet") ?? "10");
    const sortType = sp.get("sortType") ?? "LATEST";
    const status = sp.get("status") ?? "ALL";

    const data = await getSearchPageOnServer({ q, page, offSet, sortType, status });
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listings search page." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
