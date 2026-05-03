import { NextResponse } from "next/server";
import { getListingComplexInfraOnServer } from "@/src/features/listings/server/callServer/getListingDetailOnServer";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ complexId: string }> }
) {
  try {
    const { complexId } = await params;
    const data = await getListingComplexInfraOnServer(complexId);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listing complex infra." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
