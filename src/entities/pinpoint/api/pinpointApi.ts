import { http } from "@/src/shared/api/http";
import { PINPOINTS_READ_ENDPOINT } from "@/src/shared/api/endpoints";
import { IResponse } from "@/src/shared/types";
import { PinPoint } from "../model/pinpoint.type";

export interface PinPointsResponse extends IResponse {
  data: PinPoint[];
}

/**
 * 핀포인트 목록 조회 API
 */
export const getPinPoints = async (): Promise<PinPointsResponse["data"]> => {
  const response = await http.get<PinPointsResponse>(PINPOINTS_READ_ENDPOINT);
  return response.data;
};
