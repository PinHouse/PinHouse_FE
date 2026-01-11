import { http } from "@/src/shared/api/http";
import { PINPOINTS_READ_ENDPOINT } from "@/src/shared/api/endpoints";
import { IResponse } from "@/src/shared/types";
import { PinPoint } from "../model/pinpoint.type";

export type PinPointsResponse = IResponse<PinPointsPayload>;
export interface PinPointsPayload {
  userName: string;
  pinPoints: PinPoint[];
}

/**
 * 핀포인트 목록 조회 API
 */
export const getPinPoints = async (): Promise<PinPointsPayload> => {
  const response = await http.get<PinPointsResponse>(PINPOINTS_READ_ENDPOINT);

  if (!response.data) {
    throw new Error("Invalid pinPoints response");
  }

  return response.data;
};
