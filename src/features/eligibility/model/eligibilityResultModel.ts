import type { EligibilityData } from "./eligibilityStore";
import { calculateAge } from "./eligibilityDecisionTree";

export interface EligibilityResultListItem {
  label: string;
  value: string;
}

const formatGender = (v: string | null) => (v === "1" ? "남성" : v === "2" ? "여성" : "-");
const formatHouseholdRole = (v: string | null) =>
  v === "1" ? "세대주" : v === "2" ? "세대원" : "-";
const formatHouseholdComposition = (v: string | null) =>
  v === "1" ? "1인 가구" : v === "2" ? "가족과 함께" : v === "3" ? "공동생활가정" : "-";
const formatHousing = (v: string | null) =>
  v === "1" ? "무주택가구" : v === "2" ? "주택 소유" : v ? "해당 없음" : "-";
const formatCar = (v: string | null) => (v === "1" ? "있음" : v === "2" ? "없음" : "-");

/**
 * store에 저장된 EligibilityData를 결과 확인 화면용 리스트 아이템으로 변환
 */
export function getEligibilityResultListItems(data: EligibilityData): EligibilityResultListItem[] {
  const age = calculateAge(data.birthDate);
  const ageStr = age != null ? `만 ${age}세` : "-";
  const genderStr = formatGender(data.gender);
  const incomeStr = data.benefitTypes?.length
    ? `소득 1분위, 주거급여 수급자`
    : data.monthlyIncome
      ? `월소득 ${data.monthlyIncome}만원`
      : "-";
  const studentStr =
    data.youngSingleStudentStatus && data.youngSingleStudentStatus !== "1"
      ? "대학생, 부모님 소득 1분위"
      : "-";
  const subscriptionStr =
    data.hasHousingSubscriptionSavings === "1"
      ? `${data.housingSubscriptionPeriod ?? "00"}년 ${data.housingSubscriptionPaymentCount ?? "00"}회 납입, ${data.totalPaymentAmount === "2" ? "6000만원 이하" : "6000만원 이상"}`
      : data.hasHousingSubscriptionSavings === "2"
        ? "해당 없음"
        : "-";
  const marriageStr =
    data.isNewlyMarried === true
      ? `기혼, 기간 ${data.marriagePeriod ?? "00"}년`
      : data.marriageStatus === "1"
        ? "예정"
        : "-";
  const childrenStr = data.childrenInfo
    ? `${data.childrenInfo.under6 + data.childrenInfo.over7}명, 대리 양육 가정 외`
    : data.hasRegisteredChildren === "1"
      ? "있음"
      : "-";
  const householdStr =
    [
      data.householdRole ? formatHouseholdRole(data.householdRole) : null,
      data.householdComposition ? formatHouseholdComposition(data.householdComposition) : null,
    ]
      .filter(Boolean)
      .join(", ") || "-";
  const housingStr =
    data.hasOwnHousing === "2" || data.householdHousingOwnershipStatus === "2"
      ? "무주택가구"
      : formatHousing(data.hasOwnHousing);
  const carStr = formatCar(data.hasHouseholdCar ?? data.hasCar);
  const assetStr =
    data.isTotalAssetUnder337Million === "1" || data.isHouseholdTotalAssetUnder337Million === "1"
      ? "3억 3천 7백만원 이하"
      : data.financialAssetValue || data.householdFinancialAssetValue
        ? "해당"
        : "-";

  return [
    { label: "성별/나이", value: `${genderStr}, ${ageStr}` },
    { label: "소득", value: incomeStr },
    { label: "대학생 여부", value: studentStr },
    { label: "청약저축", value: subscriptionStr },
    { label: "결혼 여부", value: marriageStr },
    { label: "자녀 여부", value: childrenStr },
    { label: "세대 정보", value: householdStr },
    { label: "주택 소유 여부", value: housingStr },
    { label: "자동차 소유 여부", value: carStr },
    { label: "총자산", value: assetStr },
  ];
}
