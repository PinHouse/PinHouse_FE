/** POST /v2/diagnosis 요청 body - API DTO Enum 타입 */

export const DIAGNOSIS_GENDER = ["남성", "여성", "미정"] as const;
export type DiagnosisGender = (typeof DIAGNOSIS_GENDER)[number];

export const DIAGNOSIS_ACCOUNT_YEARS = [
  "6개월 미만",
  "6개월 이상 ~ 1년 미만",
  "1년 이상 ~ 2년 미만",
  "2년 이상",
] as const;
export type DiagnosisAccountYears = (typeof DIAGNOSIS_ACCOUNT_YEARS)[number];

export const DIAGNOSIS_ACCOUNT_DEPOSIT = [
  "0회 ~ 5회",
  "6회 ~ 11회",
  "12회 ~ 23회",
  "24회 ~ 35회",
  "36회 ~ 48회",
  "49회 ~ 59회",
  "60회 이상",
] as const;
export type DiagnosisAccountDeposit = (typeof DIAGNOSIS_ACCOUNT_DEPOSIT)[number];

export const DIAGNOSIS_ACCOUNT = ["600만원 이하", "600만원 이상"] as const;
export type DiagnosisAccount = (typeof DIAGNOSIS_ACCOUNT)[number];

export const DIAGNOSIS_EDUCATION_STATUS = [
  "대학교 재학 중이거나 다음 학기에 입학 예정",
  "대학교 휴학 중이며 다음 학기 복학 예정",
  "대학교 혹은 고등학교 졸업/중퇴 후 2년 이내",
  "졸업/중퇴 후 2년이 지났지만 대학원에 재학 중",
  "해당 사항 없음",
] as const;
export type DiagnosisEducationStatus = (typeof DIAGNOSIS_EDUCATION_STATUS)[number];

export const DIAGNOSIS_INCOME_LEVEL = [
  "1구간",
  "2구간",
  "3구간",
  "4구간",
  "5구간",
  "6구간",
  "기타",
] as const;
export type DiagnosisIncomeLevel = (typeof DIAGNOSIS_INCOME_LEVEL)[number];

export const DIAGNOSIS_HOUSING_STATUS = [
  "나는 무주택자지만 우리 가구원중 주택 소유자가 있어요",
  "우리집 가구원 모두 주택을 소유하고 있지 않아요",
  "주택을 소유하고 있어요",
] as const;
export type DiagnosisHousingStatus = (typeof DIAGNOSIS_HOUSING_STATUS)[number];

export const DIAGNOSIS_SPECIAL_CATEGORY = [
  "주거급여 수급자",
  "생계/의료급여 수급자",
  "한부모 가정",
  "보호대상 한부모 가정",
  "친인척 위탁가정",
  "대리양육가정",
  "철거민",
  "국가 유공자 본인/가구",
  "위안부 피해자 본인/가구",
  "북한이탈주민 본인",
  "장애인 등록자/장애인 가구",
  "영구임대 퇴거자",
  "장기복무 제대군인",
  "주거 취약계층/긴급 주거지원 대상자",
  "위탁가정/보육원 시설종료2년이내, 종료예정자",
  "귀한 국군포로 본인",
  "교통사고 유자녀 가정",
  "산단근로자",
  "보증 거절자",
  "나 또는 배우자가 노부모를 1년 이상 부양",
  "그룹홈 거주",
  "조손가족",
] as const;
export type DiagnosisSpecialCategory = (typeof DIAGNOSIS_SPECIAL_CATEGORY)[number];

/** POST /v2/diagnosis 요청 body */
export interface DiagnosisPostRequest {
  gender: DiagnosisGender;
  birthday: string;
  monthPay: number;
  hasAccount: boolean;
  accountYears: DiagnosisAccountYears;
  accountDeposit: DiagnosisAccountDeposit;
  account: DiagnosisAccount;
  maritalStatus: boolean;
  marriageYears: number;
  unbornChildrenCount: number;
  under6ChildrenCount: number;
  over7MinorChildrenCount: number;
  educationStatus: DiagnosisEducationStatus;
  hasCar: boolean;
  carValue: number;
  isHouseholdHead: boolean;
  isSingle: boolean;
  fetusCount: number;
  minorCount: number;
  adultCount: number;
  incomeLevel: DiagnosisIncomeLevel;
  housingStatus: DiagnosisHousingStatus;
  housingYears: number;
  propertyAsset: number;
  carAsset: number;
  financialAsset: number;
  hasSpecialCategory: DiagnosisSpecialCategory[];
}

/** POST /v2/diagnosis 응답 data (공통 제외) */
export interface DiagnosisResultData {
  eligible: boolean;
  decisionMessage: string;
  recommended: string[];
  /** 내 소득분위 (예: "1분위")*/
  incomeLevel?: string;
  /** 나의 지원 가능 대상 */
  targetGroups?: string[];
}

/** GET /v2/diagnosis/latest 응답 data (POST 응답과 별도 구조) */
export interface DiagnosisLatestData {
  age: number;
  availableRentalTypes: string[];
  availableSupplyTypes: string[];
  diagnosedAt: string;
  diagnosisId: number;
  diagnosisResult: string;
  eligible: boolean;
  gender: string;
  myIncomeLevel: string;
  nickname: string;
  recommended: string[];
}
