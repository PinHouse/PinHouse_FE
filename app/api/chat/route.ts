import { NextResponse } from "next/server";
import { getChatMessageOnServer } from "@/src/features/chat/server/callServer/getChatMessageOnserver";

export async function POST(req: Request) {
  try {
    const { messages, promptType } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const message = await getChatMessageOnServer({ messages, promptType });

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("GPT 요청 실패:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
