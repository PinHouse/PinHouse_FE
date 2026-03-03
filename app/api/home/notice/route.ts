import { NextResponse } from "next/server";
import { getHomeNoticesFirstPageOnServer } from "@/src/features/home/server/getHomeNoticesFirstPageOnServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getHomeNoticesFirstPageOnServer();

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
