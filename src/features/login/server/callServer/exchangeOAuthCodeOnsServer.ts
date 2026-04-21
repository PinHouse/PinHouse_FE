import "server-only";
import { LOGIN_AUTH_EXCHANGES } from "@/src/shared/api";

type ExchangeData =
  | { result: "TOKEN_ISSUED"; accessToken: string; refreshToken: string }
  | { result: "TOKEN_REQUIRED"; tempKey: string };

type ExchangeApiResponse =
  | { success: true; data: ExchangeData }
  | { success: false; message?: string };

const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function exchangeOAuthCodeOnServer(code: string): Promise<ExchangeApiResponse> {
  if (!API_ORIGIN) return { success: false };

  const url = `${API_ORIGIN}${LOGIN_AUTH_EXCHANGES}`;

  const resp = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!resp.ok) return { success: false };
  const body = (await resp.json()) as ExchangeApiResponse;
  // 백엔드 응답 스펙에 맞게 매핑
  // 예: body.data.accessToken, body.data.tempUserId
  if (!body?.success) return { success: false };

  return body;
}
