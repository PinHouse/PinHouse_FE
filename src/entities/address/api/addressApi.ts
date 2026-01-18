import { http, PINPOINT_CREATE_ENDPOINT } from "@/src/shared/api";
import { IResponse } from "@/src/shared/types";

interface Pinpoint {
  address: string;
  name: string;
  first: boolean;
}
/**
 * 핀포인트 설정 요청 함수
 */
export const requestSetPinpoint = async (pinpoint: Pinpoint) => {
  return await http.post<IResponse<Pinpoint>, Pinpoint>(PINPOINT_CREATE_ENDPOINT, pinpoint);
};
