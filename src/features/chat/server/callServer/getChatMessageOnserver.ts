import "server-only";
import OpenAI from "openai";

type ChatRole = "user" | "assistant";

type ChatRequestMessage = {
  role: ChatRole;
  content: string;
};

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
}: GetChatMessageOnServerProps) {
  const input = promptType
    ? [{ role: "system" as const, content: promptType }, ...messages]
    : messages;

  const response = await openai.responses.create({
    model: "gpt-4o",
    input,
    credentials: "include",
  });

  return response.output_text || "응답 없음";
}
