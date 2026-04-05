import "server-only";
import OpenAI from "openai";
import type { ChatRequestMessage } from "@kyungchan3007/pinhouse-chat";
import type { ChatUiResponse } from "@/src/features/chat/model/chatResponse";
import { resolveChatPromptRule } from "@/src/features/chat/model/resolveChatPromptRule";

type GetChatMessageOnServerProps = {
  messages: ChatRequestMessage[];
  promptType?: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const REGION_KEYWORDS = [
  "서울",
  "강남",
  "강남역",
  "서초",
  "송파",
  "잠실",
  "분당",
  "판교",
  "수원",
  "용인",
  "부산",
  "해운대",
  "대구",
  "인천",
  "광주",
  "대전",
] as const;

const extractListingKeyword = (keyword?: string, fallback?: string) => {
  const source = keyword?.trim() || fallback?.trim() || "";
  if (!source) return undefined;

  const matchedRegion = REGION_KEYWORDS.find(region => source.includes(region));
  if (matchedRegion) return matchedRegion;

  const districtMatch = source.match(
    /(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)?\s*([가-힣]+구|[가-힣]+동|[가-힣]+시|[가-힣]+군)/
  );

  if (districtMatch) {
    return `${districtMatch[1] ?? ""}${districtMatch[2]}`.trim();
  }

  return source.split(/\s+/)[0];
};

export async function getChatMessageOnServer({
  messages,
  promptType,
}: GetChatMessageOnServerProps): Promise<ChatUiResponse> {
  const latestUserMessage = [...messages].reverse().find(message => message.role === "user");
  const systemPrompt = promptType || resolveChatPromptRule(latestUserMessage?.content ?? "");

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
    const parsed = JSON.parse(normalizedText) as Partial<ChatUiResponse>;

    return {
      summary: parsed.summary?.trim() || "응답 없음",
      followUpQuestion: parsed.followUpQuestion?.trim() || undefined,
      cta:
        parsed.cta?.action === "open_listing" && parsed.cta.label
          ? {
              label: parsed.cta.label.trim(),
              action: "open_listing",
              keyword: extractListingKeyword(parsed.cta.keyword, latestUserMessage?.content),
            }
          : undefined,
    };
  } catch (error) {
    console.error("채팅 응답 파싱 실패:", error);
    return {
      summary: rawText,
    };
  }
}
