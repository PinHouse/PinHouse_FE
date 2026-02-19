import { http, API_BASE_URL_V2 } from "@/src/shared/api/http";
import {
  DIAGNOSIS_ENDPOINT,
  DIAGNOSIS_LATEST_ENDPOINT,
} from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";
import type { DiagnosisResultData } from "./diagnosisTypes";
import type { DiagnosisPostRequest } from "./diagnosisTypes";

const v2Options = { baseURL: API_BASE_URL_V2 };

/** GET /v2/diagnosis/latest - 청약 진단 최신 결과 조회 */
export function getDiagnosisLatest<T = DiagnosisResultData>() {
  return http.get<IResponse<T>>(DIAGNOSIS_LATEST_ENDPOINT, undefined, v2Options);
}

/** POST /v2/diagnosis - 청약 진단 제출 */
export function postDiagnosis<T = DiagnosisResultData, D = DiagnosisPostRequest>(data: D) {
  return http.post<IResponse<T>, D>(DIAGNOSIS_ENDPOINT, data, v2Options);
}
