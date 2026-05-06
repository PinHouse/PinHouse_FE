import { NextRequest, NextResponse } from "next/server";
import { getHomeSearchCategoryOnServer } from "@/src/features/home/server/callServer/getHomeSearchOnServer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const type = sp.get("type") ?? "";
    const q = sp.get("q") ?? "";
    const rawPage = Number(sp.get("page") ?? "1");
    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
    // 카테고리 더보기 요청도 route handler에서 server 함수로 위임한다.
    const data = await getHomeSearchCategoryOnServer({ type, q, page });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch home search category." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
