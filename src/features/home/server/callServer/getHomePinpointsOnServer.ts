import "server-only";
import { cookies } from "next/headers";
import { PINPOINTS_READ_ENDPOINT } from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";
import type { PinPoint } from "@/src/entities/pinpoint/model/pinpoint.type";

type PinPointsPayload = {
  userName: string;
  pinPoints: PinPoint[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getHomePinpointsOnServer(): Promise<PinPointsPayload | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!API_BASE_URL) return null;

  const res = await fetch(`${API_BASE_URL}${PINPOINTS_READ_ENDPOINT}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!res.ok) return null;

  const body = (await res.json()) as IResponse<PinPointsPayload>;
  if (!body?.success || !body.data) return null;

  return body.data;
}
