import { http } from "@/src/shared/api/http";
import {
  UNIV_SEARCH_ENDPOINT,
  SCHOOL_SEARCH_ENDPOINT,
  UNIV_AVAILABILITY_ENDPOINT,
  SCHOOL_AVAILABILITY_ENDPOINT,
} from "@/src/shared/api/endpoints";
import type { IResponse } from "@/src/shared/types/response";

/** /univ/search, /school/search 응답 항목 */
export interface SchoolUnivSearchItem {
  id: string;
  name: string;
  campusType: string;
  collegeType: string;
}

type SearchResponse = IResponse<SchoolUnivSearchItem[]>;

/** GET /univ/search - 대학교 검색 */
export async function getUnivSearch(keyword: string): Promise<SearchResponse> {
  return http.get<SearchResponse, { keyword?: string }>(UNIV_SEARCH_ENDPOINT, {
    keyword: keyword.trim() || undefined,
  });
}

/** GET /school/search - 고등학교 검색 */
export async function getSchoolSearch(keyword: string): Promise<SearchResponse> {
  return http.get<SearchResponse, { keyword?: string }>(SCHOOL_SEARCH_ENDPOINT, {
    keyword: keyword.trim() || undefined,
  });
}

/** 가능여부 응답: data에 안내 문구 문자열 */
type AvailabilityResponse = IResponse<string>;

/** GET /univ - 대학교 공공임대주택 지원 가능 여부 */
export async function getUnivAvailability(keyword: string): Promise<AvailabilityResponse> {
  return http.get<AvailabilityResponse, { keyword: string }>(UNIV_AVAILABILITY_ENDPOINT, {
    keyword,
  });
}

/** GET /school - 고등학교 공공임대주택 지원 가능 여부 */
export async function getSchoolAvailability(keyword: string): Promise<AvailabilityResponse> {
  return http.get<AvailabilityResponse, { keyword: string }>(SCHOOL_AVAILABILITY_ENDPOINT, {
    keyword,
  });
}
