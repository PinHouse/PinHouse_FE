export type ChatRole = "user" | "assistant";

export type ChatRequestMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type ChatRequest = {
  messages: ChatRequestMessage[];
  promptType?: string;
};

export type ChatResponse = {
  message: string;
};

export async function postChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error("요청 실패");
  }

  return res.json();
}
