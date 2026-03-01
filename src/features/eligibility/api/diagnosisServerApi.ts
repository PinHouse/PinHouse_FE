import "server-only";
import { cookies } from "next/headers";
import { DIAGNOSIS_LATEST_ENDPOINT } from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";
import type { DiagnosisLatestData } from "./diagnosisTypes";

const API_BASE_URL_V2 =
  typeof process.env.NEXT_PUBLIC_API_URL === "string"
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/v1\/?$/, "/v2")
    : "";

export async function getDiagnosisLatestOnServer(): Promise<DiagnosisLatestData | null> {
  try {
    if (!API_BASE_URL_V2) return null;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) return null;

    const res = await fetch(`${API_BASE_URL_V2}${DIAGNOSIS_LATEST_ENDPOINT}`, {
      method: "GET",
      headers: {
        cookie: cookieStore.toString(),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const body = (await res.json()) as IResponse<DiagnosisLatestData>;
    if (!body?.success || !body.data) return null;

    return body.data;
  } catch {
    return null;
  }
}
