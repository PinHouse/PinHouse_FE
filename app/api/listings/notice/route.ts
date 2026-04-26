import { NextRequest, NextResponse } from "next/server";
import { getNoticeFirstPageOnServer } from "@/src/features/listings/server";
import type { ListingListFilterBody } from "@/src/entities/listings/model/type";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const rawPage = Number(sp.get("page") ?? "1");
    const rawOffSet = Number(sp.get("offSet") ?? "10");
    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
    const offSet = Number.isFinite(rawOffSet) && rawOffSet > 0 ? rawOffSet : 10;
    const body = (await req.json()) as ListingListFilterBody;
    const data = await getNoticeFirstPageOnServer({ ...body, page, offSet });

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
