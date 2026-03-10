import { http } from "@/src/shared/api/http";
import {
  PINPOINTS_READ_ENDPOINT,
  PINPOINT_DELETE_ENDPOINT,
  PINPOINT_UPDATE_ENDPOINT,
} from "@/src/shared/api/endpoints";
import { IResponse } from "@/src/shared/types";
import { PinPoint } from "../model/pinpoint.type";

/** PATCH /pinpoints/{id} body - name만 수정 가능 */
export interface UpdatePinpointBody {
  name: string;
}

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

/**
 * 핀포인트 삭제 API
 */
export const deletePinPoint = async (id: string): Promise<void> => {
  await http.delete<IResponse<unknown>>(`${PINPOINT_DELETE_ENDPOINT}?id=${id}`);
};

/**
 * 핀포인트 수정 API - PATCH /pinpoints/{id}, body는 name만
 */
export const updatePinPoint = async (
  id: string,
  body: UpdatePinpointBody
): Promise<void> => {
  await http.patch<IResponse<unknown>, UpdatePinpointBody>(
    `${PINPOINT_UPDATE_ENDPOINT}/${id}`,
    body
  );
};
