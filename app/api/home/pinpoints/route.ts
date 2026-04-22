import { NextResponse } from "next/server";
import { getHomePinpointsOnServer } from "@/src/features/home/server/callServer/getHomePinpointsOnServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getHomePinpointsOnServer();
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch home pinpoints." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
