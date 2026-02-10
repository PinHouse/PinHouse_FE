import { http } from "./http";

export const HTTP_METHODS = {
  post: http.post,
  delete: http.delete,
  put: http.put,
  get: http.get,
  patch: http.patch,
} as const;

/**
 * HOME API 엔드포인드
 */
export const HOME_NOTICE_ENDPOINT = "/home/notice";
export const HOME_SEARCH_POPULAR_ENDPOINT = "/home/search";
export const HOME_RECOMMENDED_ENDPOINT = "/home/recommended-notices";

/**
 * 공고 API 엔드포인트
 */
export const NOTICE_ENDPOINT = "/notices";

/**
 * 빠른 검색 API 엔드포인트
 */
export const SEARCH_FAST_ENDPOINT = "/search/fast";
export const SEARCH_FAST_HISTORY_ENDPOINT = "/search/fast/history";

/**
 * 인기 검색어 API 엔드포인트
 */
export const POPULAR_SEARCH_ENDPOINT = "/search/popular";
export const LISTING_SEARCH_ENDPOINT = "/search/notices";

/**
 * 유저 API 엔드포인트
 */

//탈퇴 API
export const USER_DELETE_ENDPOINT = "/users";
//임시 유저 정보 조회 API
export const TEMP_USER_ENDPOINT = "/users";
//마이페이지 조회 API
export const USER_MYPAGE_ENDPOINT = "/users/mypage";
//타 유저 조회 API
export const USER_SEARCH_ENDPOINT = "/users";
//개인정보 수정 API
export const USER_EDIT_MY_INFO_ENDPOINT = "/users/mypage";
//회원가입 API
export const USER_SIGNUP_ENDPOINT = "/users";

/**
 * 인증 API 엔드포인트
 */

//JWT 토큰 검증 API
export const USER_JWT_TOKEN_VALIDATE_ENDPOINT = "/auth";

//로그아웃 API
export const USER_LOGOUT_ENDPOINT = "/auth";
//엑세스토큰 재발급 API
export const USER_ACCESS_TOKEN_REFRESH_ENDPOINT = "/auth";

/**
 * 임대주택 정보 조회 API
 */

// 임대주택 상세 조회 API
export const COMPLEXES_ENDPOINT = "/complexes";

// 거리 시뮬레이터 API (전체)
export const getComplexTransitFullEndpoint = (complexId: string) =>
  `/complexes/${complexId}/transit/full`;

// 간편 거리 시뮬레이터 API
export const getComplexTransitEasyEndpoint = (complexId: string) =>
  `/complexes/${complexId}/transit/easy`;

// 임대주택 예산 시뮬레이터 API
export const getComplexDepositEndpoint = (complexId: string) => `/complexes/${complexId}/deposit`;

/**
 * 임대주택 주변 인프라 API
 */

// 인프라에 따른 공고 조회 API
export const COMPLEXES_BY_INFRA_ENDPOINT = "/complexes/infra";

// 공고 주변 인프라 조회 API
export const COMPLEX_INFRA_ENDPOINT = "/complexes/infra";

/**
 * 진단 API
 */

// 청약 진단 API
export const DIAGNOSIS_ENDPOINT = "/diagnosis";

// 질문 설명 API
export const DIAGNOSIS_INFO_ENDPOINT = "/diagnosis/info";

// 질문 설명 상세 API
export const DIAGNOSIS_QUESTION_ENDPOINT = "/diagnosis/info/question";

/**
 * 핀포인트 API
 */

// 핀포인트 설정(생성) API
export const PINPOINT_CREATE_ENDPOINT = "/pinpoints";

// 핀포인트 목록 조회 API
export const PINPOINTS_READ_ENDPOINT = "/pinpoints";

// 핀포인트 수정 API
export const PINPOINT_UPDATE_ENDPOINT = "/pinpoints";

// 핀포인트 삭제 API
export const PINPOINT_DELETE_ENDPOINT = "/pinpoints";

/**
 * 학교 API
 */

// 대학교 가능여부 API
export const UNIV_AVAILABILITY_ENDPOINT = "/univ";

// 대학교 검색 API
export const UNIV_SEARCH_ENDPOINT = "/univ/search";

// 고등학교 가능여부 API
export const SCHOOL_AVAILABILITY_ENDPOINT = "/school";

// 고등학교 검색 API
export const SCHOOL_SEARCH_ENDPOINT = "/school/search";

/**
 * 좋아요 API
 */
export const LIKE_ENDPOINT = "/likes";
