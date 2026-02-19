import type { EligibilityData } from "../model/eligibilityStore";
import type { DiagnosisPostRequest, DiagnosisSpecialCategory } from "./diagnosisTypes";
import {
  DIAGNOSIS_ACCOUNT_YEARS,
  DIAGNOSIS_ACCOUNT_DEPOSIT,
  DIAGNOSIS_ACCOUNT,
  DIAGNOSIS_EDUCATION_STATUS,
  DIAGNOSIS_HOUSING_STATUS,
  DIAGNOSIS_INCOME_LEVEL,
} from "./diagnosisTypes";

/** Store housingSubscriptionPeriod key → API accountYears */
const ACCOUNT_YEARS_MAP: Record<string, (typeof DIAGNOSIS_ACCOUNT_YEARS)[number]> = {
  "1": "6개월 미만",
  "2": "6개월 이상 ~ 1년 미만",
  "3": "1년 이상 ~ 2년 미만",
  "4": "2년 이상",
};

/** Store housingSubscriptionPaymentCount key → API accountDeposit */
const ACCOUNT_DEPOSIT_MAP: Record<string, (typeof DIAGNOSIS_ACCOUNT_DEPOSIT)[number]> = {
  "1": "0회 ~ 5회",
  "2": "6회 ~ 11회",
  "3": "12회 ~ 23회",
  "4": "24회 ~ 35회",
  "5": "36회 ~ 48회",
  "6": "49회 ~ 59회",
  "7": "60회 이상",
};

/** Store totalPaymentAmount id → API account (600만원) */
const ACCOUNT_MAP: Record<string, (typeof DIAGNOSIS_ACCOUNT)[number]> = {
  "1": "600만원 이상",
  "2": "600만원 이하",
};

/** Store householdHousingOwnershipStatus → API housingStatus */
const HOUSING_STATUS_MAP: Record<string, (typeof DIAGNOSIS_HOUSING_STATUS)[number]> = {
  "1": "나는 무주택자지만 우리 가구원중 주택 소유자가 있어요",
  "2": "우리집 가구원 모두 주택을 소유하고 있지 않아요",
  "3": "주택을 소유하고 있어요",
};

/** Store youngSingleStudentStatus id → API educationStatus */
const EDUCATION_STATUS_MAP: Record<string, (typeof DIAGNOSIS_EDUCATION_STATUS)[number]> = {
  "1": "해당 사항 없음",
  "2": "대학교 재학 중이거나 다음 학기에 입학 예정",
  "3": "대학교 휴학 중이며 다음 학기 복학 예정",
  "4": "대학교 혹은 고등학교 졸업/중퇴 후 2년 이내",
  "5": "졸업/중퇴 후 2년이 지났지만 대학원에 재학 중",
};

function toNum(s: string | null | undefined): number {
  if (s == null || s === "") return 0;
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function formatBirthday(date: Date | null): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * 스토어 monthlyIncome → 원 단위.
 * (UI에서 만원으로 넣으면 150, 원으로 넣으면 1500000 저장되는 경우 모두 처리)
 */
function monthlyIncomeToWon(monthlyIncome: string | null): number {
  const n = toNum(monthlyIncome);
  if (n <= 0) return 0;
  return n <= 10000 ? n * 10000 : n;
}

/** 월소득(만원 기준 비교) + 수급자 여부 → API incomeLevel */
function toIncomeLevel(
  monthlyIncome: string | null,
  benefitTypes: string[]
): (typeof DIAGNOSIS_INCOME_LEVEL)[number] {
  if (benefitTypes?.length) return "1구간";
  const won = monthlyIncomeToWon(monthlyIncome);
  const manwon = won / 10000;
  if (manwon <= 0) return "1구간";
  if (manwon <= 150) return "1구간";
  if (manwon <= 250) return "2구간";
  if (manwon <= 350) return "3구간";
  if (manwon <= 450) return "4구간";
  if (manwon <= 550) return "5구간";
  if (manwon <= 650) return "6구간";
  return "기타";
}

/** benefitTypes store id → API hasSpecialCategory */
const BENEFIT_TO_SPECIAL: Record<string, DiagnosisSpecialCategory> = {
  "1": "주거급여 수급자",
  "2": "생계/의료급여 수급자",
};

/** familyTypes store id → API hasSpecialCategory */
const FAMILY_TO_SPECIAL: Record<string, DiagnosisSpecialCategory> = {
  "1": "친인척 위탁가정",
  "2": "대리양육가정",
  "3": "한부모 가정",
  "4": "보호대상 한부모 가정",
};

/** specialEligibilityTypes store id → API hasSpecialCategory */
const SPECIAL_ELIGIBILITY_TO_API: Record<string, DiagnosisSpecialCategory> = {
  "1": "국가 유공자 본인/가구",
  "2": "위안부 피해자 본인/가구",
  "3": "북한이탈주민 본인",
  "4": "장애인 등록자/장애인 가구",
  "5": "교통사고 유자녀 가정",
  "6": "영구임대 퇴거자",
  "7": "영구임대 퇴거자",
  "8": "주거 취약계층/긴급 주거지원 대상자",
  "9": "산단근로자",
  "10": "보증 거절자",
};

/** marriedHouseholdFamilyTypes store id → API hasSpecialCategory */
const MARRIED_HOUSEHOLD_FAMILY_TO_SPECIAL: Record<string, DiagnosisSpecialCategory> = {
  "1": "나 또는 배우자가 노부모를 1년 이상 부양",
  "2": "조손가족",
};

/** Store 라벨(또는 id) → API hasSpecialCategory (라벨로 저장된 경우 대응) */
const SPECIAL_LABEL_TO_API: Record<string, DiagnosisSpecialCategory> = {
  "국가 유공자 본인/가구": "국가 유공자 본인/가구",
  "위안부 피해자 본인/가구": "위안부 피해자 본인/가구",
  "북한이탈주민 본인": "북한이탈주민 본인",
  "장애인 등록자/장애인 가구": "장애인 등록자/장애인 가구",
  "교통사고 유자녀 가정": "교통사고 유자녀 가정",
  "부도 공공임대 퇴거자": "영구임대 퇴거자",
  "영구임대 퇴거자": "영구임대 퇴거자",
  "주거 취약계층/긴급 주거지원 대상자": "주거 취약계층/긴급 주거지원 대상자",
  "산단 근로자": "산단근로자",
  산단근로자: "산단근로자",
  보증거절자: "보증 거절자",
  "보증 거절자": "보증 거절자",
};

function mapHasSpecialCategory(data: EligibilityData): DiagnosisSpecialCategory[] {
  const set = new Set<DiagnosisSpecialCategory>();

  (data.benefitTypes ?? []).forEach(id => {
    const api = BENEFIT_TO_SPECIAL[id];
    if (api) set.add(api);
  });
  (data.familyTypes ?? []).forEach(id => {
    const api = FAMILY_TO_SPECIAL[id];
    if (api) set.add(api);
  });
  (data.specialEligibilityTypes ?? []).forEach(val => {
    const api = SPECIAL_ELIGIBILITY_TO_API[val] ?? SPECIAL_LABEL_TO_API[val];
    if (api) set.add(api);
  });
  (data.marriedHouseholdFamilyTypes ?? []).forEach(id => {
    const api = MARRIED_HOUSEHOLD_FAMILY_TO_SPECIAL[id];
    if (api) set.add(api);
  });

  return Array.from(set);
}

/**
 * EligibilityData(store) → POST /v2/diagnosis 요청 body 로 변환 (API DTO Enum 준수)
 */
export function mapEligibilityToDiagnosisRequest(data: EligibilityData): DiagnosisPostRequest {
  const hasAccount = data.hasHousingSubscriptionSavings === "1";
  const maritalStatus = data.isNewlyMarried === true;
  const isSingle = !maritalStatus && data.marriageStatus !== "1";

  const spouse = data.spouseChildrenInfo ?? data.marriedHouseholdChildrenInfo;
  const unbornChildrenCount = spouse?.expectedBirth ?? 0;
  const under6ChildrenCount = data.childrenInfo?.under6 ?? spouse?.under6 ?? 0;
  const over7MinorChildrenCount = data.childrenInfo?.over7 ?? spouse?.over7 ?? 0;
  const minorCount = under6ChildrenCount + over7MinorChildrenCount;
  const adultCount = maritalStatus ? 2 : 1;

  const housingStatus =
    HOUSING_STATUS_MAP[data.householdHousingOwnershipStatus ?? ""] ??
    "우리집 가구원 모두 주택을 소유하고 있지 않아요";

  const monthPay = monthlyIncomeToWon(data.monthlyIncome);

  const gender = data.gender === "1" ? "남성" : data.gender === "2" ? "여성" : "미정";

  return {
    gender,
    birthday: formatBirthday(data.birthDate),
    monthPay,
    hasAccount,
    accountYears: ACCOUNT_YEARS_MAP[data.housingSubscriptionPeriod ?? ""] ?? "2년 이상",
    accountDeposit: ACCOUNT_DEPOSIT_MAP[data.housingSubscriptionPaymentCount ?? ""] ?? "0회 ~ 5회",
    account: ACCOUNT_MAP[data.totalPaymentAmount ?? ""] ?? "600만원 이하",
    maritalStatus,
    marriageYears: toNum(data.marriagePeriod),
    unbornChildrenCount,
    under6ChildrenCount,
    over7MinorChildrenCount,
    educationStatus: EDUCATION_STATUS_MAP[data.youngSingleStudentStatus ?? ""] ?? "해당 사항 없음",
    hasCar: data.hasCar === "1",
    carValue: toNum(data.carAssetValue ?? data.householdCarAssetValue),
    isHouseholdHead: data.householdRole === "1",
    isSingle,
    fetusCount: unbornChildrenCount,
    minorCount,
    adultCount,
    incomeLevel: toIncomeLevel(data.monthlyIncome, data.benefitTypes ?? []),
    housingStatus,
    housingYears: toNum(data.housingDisposalYears),
    propertyAsset: toNum(data.landAssetValue ?? data.householdLandAssetValue),
    carAsset: toNum(data.carAssetValue ?? data.householdCarAssetValue),
    financialAsset: toNum(data.financialAssetValue ?? data.householdFinancialAssetValue),
    hasSpecialCategory: mapHasSpecialCategory(data),
  };
}
