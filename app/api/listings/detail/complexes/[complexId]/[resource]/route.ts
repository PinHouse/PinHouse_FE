import { NextRequest, NextResponse } from "next/server";
import {
  getListingComplexResourceOnServer,
  getListingComplexTransitOnServer,
} from "@/src/features/listings/server/callServer/getListingDetailOnServer";

export const dynamic = "force-dynamic";

const ALLOWED_RESOURCES = new Set(["unit", "transit"]);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ complexId: string; resource: string }> }
) {
  try {
    const { complexId, resource } = await params;

    if (!ALLOWED_RESOURCES.has(resource)) {
      return NextResponse.json(
        { success: false, message: "Unsupported listing complex resource." },
        { status: 404 }
      );
    }

    const data =
      resource === "transit"
        ? await getListingComplexTransitOnServer(complexId, {
            pinPointId: req.nextUrl.searchParams.get("pinPointId"),
          })
        : await getListingComplexResourceOnServer(complexId, resource);

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch listing complex resource." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
