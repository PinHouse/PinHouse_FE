import "server-only";
import OpenAI from "openai";
import type { ChatRequestMessage } from "@kyungchan3007/pinhouse-chat";
import type { ChatCta, ChatUiResponse } from "@/src/features/chat/model/chatResponse";
import { resolveChatPromptRule } from "@/src/features/chat/model/resolveChatPromptRule";
import { extractListingKeyword } from "@/src/features/chat/server/hooks/hooks";

type GetChatMessageOnServerProps = {
  messages: ChatRequestMessage[];
  promptType?: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getChatMessageOnServer({
  messages,
  promptType,
}: GetChatMessageOnServerProps): Promise<ChatUiResponse> {
  const latestUserMessage = [...messages].reverse().find(message => message.role === "user");
  const systemPrompt =
    promptType ||
    resolveChatPromptRule({
      input: latestUserMessage?.content ?? "",
    });

  const input = systemPrompt
    ? [{ role: "system" as const, content: systemPrompt }, ...messages]
    : messages;

  const response = await openai.responses.create({
    model: "gpt-4o",
    input,
  });

  const rawText = response.output_text?.trim();

  if (!rawText) {
    return {
      summary: "응답 없음",
    };
  }

  const normalizedText = rawText
    .replace(/^```json\s*/i, "")
    .replace(/```$/, "")
    .trim();

  try {
    const parsed = JSON.parse(normalizedText) as Partial<ChatUiResponse> & {
      cta?: ChatCta;
    };
    const rawCtas = Array.isArray(parsed.ctas)
      ? parsed.ctas
      : parsed.cta
        ? [parsed.cta]
        : [];
    const normalizedCtas: ChatCta[] = rawCtas
      .filter(cta => cta?.action === "open_listing" && cta.label)
      .map(cta => ({
        label: cta.label.trim(),
        action: "open_listing" as const,
        keyword: extractListingKeyword(cta.keyword, latestUserMessage?.content),
      }))
      .filter(cta => !!cta.keyword);

    return {
      summary: parsed.summary?.trim() || "응답 없음",
      followUpQuestion: parsed.followUpQuestion?.trim() || undefined,
      ctas: normalizedCtas.length > 0 ? normalizedCtas : undefined,
    };
  } catch (error) {
    console.error("채팅 응답 파싱 실패:", error);
    return {
      summary: rawText,
    };
  }
}
