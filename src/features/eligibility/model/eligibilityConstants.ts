/** 자격 진단 로딩 화면 문구 */
export const ELIGIBILITY_LOADING_TITLE = "맞춤 보고서를 작성 중이에요!";
export const ELIGIBILITY_LOADING_SUBTITLE_LINE1 = "모두의 꿈인 내 집 마련";
export const ELIGIBILITY_LOADING_SUBTITLE_LINE2 = "나에게 맞는 추천 집은?";

/** 자격 진단 결과(입력 정보 확인) 화면 문구 */
export const ELIGIBILITY_RESULT_PAGE_TITLE = "입력 정보 확인";
export const ELIGIBILITY_RESULT_BANNER_TITLE = (userName: string) =>
  `${userName}님의 진단 결과입니다`;
export const ELIGIBILITY_RESULT_BANNER_SUBTITLE = "입력하신 정보가 맞는지 확인해 보세요";
export const ELIGIBILITY_RESULT_BUTTON = "결과보기";
export const ELIGIBILITY_COMPONENT_RENDERER_PAGE_TITLE = "자격 진단";

/** 학교 조회 화면 문구 */
export const SCHOOL_SEARCH_TITLE = "학교 조회";
export const SCHOOL_SEARCH_INTRO =
  "우리 학교가 공공임대주택 지원자격 대상에 해당하는지 검색해 보세요!";
export const SCHOOL_SEARCH_LABEL = "학교명을 검색해 주세요 (고등학교/대학교)";
export const SCHOOL_SEARCH_PLACEHOLDER = "예) 핀하우스 대학교";
export const SCHOOL_RESULT_BUTTON = "결과보기";

/** 학교 조회 결과 화면 문구 */
export const SCHOOL_RESULT_PAGE_TITLE = "학교 조회 결과";
export const SCHOOL_RESULT_EMPTY_LINE1 = (keyword: string) => `${keyword}는`;
export const SCHOOL_RESULT_EMPTY_LINE2 = "조회되지 않아요";
export const SCHOOL_RESULT_EMPTY_HINT1 = "학교 이름을 다시 확인해 주세요.";
export const SCHOOL_RESULT_EMPTY_HINT2 =
  "목록에 없는 학교는 공공임대주택 인정 학교가 아닐 수 있어요.";
export const SCHOOL_RESULT_TRY_AGAIN_BUTTON = "다시하기";
export const SCHOOL_RESULT_FILL_HINT = "지원 가능한 지역 범위는 공고를 확인하세요";
