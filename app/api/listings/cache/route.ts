import { NextRequest, NextResponse } from "next/server";
import { invalidateAllListingsRouteCaches } from "@/src/features/listings/server/bff/listingsRouteCache";

export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest) {
  try {
    await invalidateAllListingsRouteCaches();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to invalidate listings cache." },
      { status: 500 }
    );
  }
}
