import { NextResponse } from "next/server";
import { getHomeNoticesPageOnServer } from "@/src/features/home/server/callServer/getHomeNoticesFirstPageOnServer";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawPage = Number(searchParams.get("page") ?? "1");
    const rawOffSet = Number(searchParams.get("offSet") ?? "10");
    const safePage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
    const safeOffSet = Number.isFinite(rawOffSet) && rawOffSet > 0 ? rawOffSet : 10;

    const data = await getHomeNoticesPageOnServer(safePage, safeOffSet);

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
