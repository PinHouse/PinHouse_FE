import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EligibilityData {
  // BasicInfoStep1
  hasKoreanNationality: string | null; // "1" (예) 또는 "2" (아니오)
  // BasicInfoStep2
  gender: string | null; // "1" (남성) 또는 "2" (여성)
  birthDate: Date | null; // 생년월일
  // BasicInfoStep2-1
  marriageStatus: string | null; // "1" (예) 또는 "2" (아니오) - 입주 전까지 결혼 예정 여부
  // BasicInfoStep2-2
  hasRegisteredChildren: string | null; // "1" (예) 또는 "2" (아니오) - 주민등록상 등록된 자녀/손자녀 여부
  familyTypes: string[]; // 가족 유형 (친인척 위탁가정, 대리 양육 가정, 한부모 가정, 보호 대상 한부모 가정) - 복수 선택
  // BasicInfoStep2-3 (미성년자)
  minorEligibilityType: string | null; // 미성년자 자격 유형 ("0": 해당사항 없음, "1": 자녀가 있는 미성년 세대주, "2": 부모 등 보호자의 부재로 형제자매를 부양하는 미성년 세대주, "3": 외국인 한부모가족의 미성년 세대주)
  // BasicInfoStep2-4 (특별 자격 요건)
  specialEligibilityTypes: string[]; // 특별 자격 요건 (복수 선택) - 청년-중장년 기혼, 고령자(미혼/기혼) 대상
  // BasicInfoStep3
  hasIncomeWork: string | null; // "1" (예) 또는 "2" (아니오)
  monthlyIncome: string | null; // 월평균 소득
  hasIncomeWorkWithin5Years: string | null; // "1" (예) 또는 "2" (아니오) - 소득있는 업무에 종사한 기간이 5년 이내인가요
  studentJobSeekerTypes: string[]; // 대학생/취업준비생 여부 (복수 선택) - "1": 현재 소득이 있는 업무에 종사 중, "2": 퇴직한지 1년 미만으로 구직급여 수급자 인정, "3": 한국예술인 복지재단에서 예술 활동 증명 받음
  youngSingleStudentStatus: string | null; // 청년 미혼 대학생/취업준비생 여부 - "1": 해당사항 없음, "2": 대학교 재학 중/입학 예정, "3": 대학교 휴학 중/복학 예정, "4": 졸업/중퇴 후 2년 이내, "5": 졸업/중퇴 후 2년 지났지만 대학원 재학 중
  parentMonthlyIncome: string | null; // 부모님의 월 평균 소득 합계
  hasCar: string | null; // "1" (예) 또는 "2" (아니오) - 개인 자동차 소유 여부
  youngSingleSpecialEligibilityTypes: string[]; // 청년 미혼 특별 자격 요건 (복수 선택) - 12개 옵션
  carAssetValue: string | null; // 자동차 자산가액
  householdRole: string | null; // "1" (세대주) 또는 "2" (세대원) - 중장년 미혼 세대주/세대원 여부
  householdComposition: string | null; // "1" (1인 가구), "2" (가족과 함께 살고있어요), "3" (공동생활가정(그룹홈)에 거주 중)
  hasOwnHousing: string | null; // "1" (예) 또는 "2" (아니오) - 주택 소유 여부
  householdHousingOwnershipStatus: string | null; // "1": 나는 무주택자지만 가구원 중 주택 소유자가 있어요, "2": 우리 집 가구원 모두 주택을 소유하고 있지 않아요, "3": 주택을 소유하고 있어요
  housingDisposalYears: string | null; // 주택 처분 후 경과 년수
  hasNeverOwnedHousing: boolean; // 한 번도 주택을 소유한 적이 없어요
  isTotalAssetUnder337Million: string | null; // "1" (예) 또는 "2" (아니오) - 총자산 금액이 3억 3천 7백만원 이하인가요
  hasHouseholdCar: string | null; // "1" (예) 또는 "2" (아니오) - 가구원 중 자동차 소유 여부
  householdCarAssetValue: string | null; // 가구원 자동차 자산가액
  isHouseholdTotalAssetUnder337Million: string | null; // "1" (예) 또는 "2" (아니오) - 가구원의 총자산 금액이 3억 3천 7백만원 이하인가요
  hasOwnLand: string | null; // "1" (예) 또는 "2" (아니오) - 토지 소유 여부
  landAssetValue: string | null; // 토지 자산 금액
  financialAssetValue: string | null; // 금융자산 총 합 금액
  hasHouseholdLand: string | null; // "1" (예) 또는 "2" (아니오) - 가구원 중 토지 소유 여부
  householdLandAssetValue: string | null; // 가구원 토지 자산가액
  householdFinancialAssetValue: string | null; // 가구원의 금융자산 총합 금액
  isBasicBenefitRecipient: boolean; // 기초급여 수급자 여부
  benefitTypes: string[]; // 주거급여 수급자, 생계/의료급여 수급자 (복수 선택)
  // BasicInfoStep4
  hasHousingSubscriptionSavings: string | null; // "1" (예) 또는 "2" (아니오)
  housingSubscriptionPeriod: string | null; // 청약저축 가입 기간
  housingSubscriptionPaymentCount: string | null; // 청약저축 납입횟수
  totalPaymentAmount: string | null; // "1" (6000만원 이상) 또는 "2" (6000만원 이하)
  // 분기 조건 필드
  isNewlyMarried: boolean | null; // 신혼부부 여부
  marriagePeriod: string | null; // 혼인 기간
  isMultiChildVulnerable: boolean | null; // 다자녀-취약계층 여부
  isSingleParent: boolean | null; // 한부모 여부
  childrenInfo: { under6: number; over7: number } | null; // 자녀 정보 (6세 이하, 7세 이상 미성년)
  // 배우자 포함 자녀 정보
  hasSpouseChildren: string | null; // "1" (예) 또는 "2" (아니오) - 나, 또는 배우자의 주민등록상 등록된 자녀/손자녀 여부
  spouseChildrenInfo: { expectedBirth?: number; under6: number; over7: number } | null; // 배우자 포함 자녀 정보 (출산 예정, 6세 이하, 7세 이상 미성년)
  spouseFamilyTypes: string[]; // 배우자 포함 가족 유형 (친인척 위탁가정, 대리 양육 가정) - 복수 선택
  marriedHouseholdChildrenInfo: { expectedBirth?: number; under6: number; over7: number } | null; // 기혼 세대 구성원 자녀 정보 (출산 예정, 6세 이하, 7세 이상 미성년)
  marriedHouseholdFamilyTypes: string[]; // 기혼 세대 가족 유형 (노부모를 1년이상 부양중이에요, 조손가족이에요) - 복수 선택
}

export interface EligibilityState extends EligibilityData {
  setHasKoreanNationality: (value: string | null) => void;
  setGender: (value: string | null) => void;
  setBirthDate: (value: Date | null) => void;
  setMarriageStatus: (value: string | null) => void;
  setHasRegisteredChildren: (value: string | null) => void;
  setFamilyTypes: (value: string[]) => void;
  setMinorEligibilityType: (value: string | null) => void;
  setSpecialEligibilityTypes: (value: string[]) => void;
  setHasIncomeWork: (value: string | null) => void;
  setMonthlyIncome: (value: string | null) => void;
  setHasIncomeWorkWithin5Years: (value: string | null) => void;
  setStudentJobSeekerTypes: (value: string[]) => void;
  setYoungSingleStudentStatus: (value: string | null) => void;
  setParentMonthlyIncome: (value: string | null) => void;
  setHasCar: (value: string | null) => void;
  setCarAssetValue: (value: string | null) => void;
  setYoungSingleSpecialEligibilityTypes: (value: string[]) => void;
  setHouseholdRole: (value: string | null) => void;
  setHouseholdComposition: (value: string | null) => void;
  setHasOwnHousing: (value: string | null) => void;
  setHouseholdHousingOwnershipStatus: (value: string | null) => void;
  setHousingDisposalYears: (value: string | null) => void;
  setHasNeverOwnedHousing: (value: boolean) => void;
  setIsTotalAssetUnder337Million: (value: string | null) => void;
  setHasHouseholdCar: (value: string | null) => void;
  setHouseholdCarAssetValue: (value: string | null) => void;
  setIsHouseholdTotalAssetUnder337Million: (value: string | null) => void;
  setHasOwnLand: (value: string | null) => void;
  setLandAssetValue: (value: string | null) => void;
  setFinancialAssetValue: (value: string | null) => void;
  setHasHouseholdLand: (value: string | null) => void;
  setHouseholdLandAssetValue: (value: string | null) => void;
  setHouseholdFinancialAssetValue: (value: string | null) => void;
  setIsBasicBenefitRecipient: (value: boolean) => void;
  setBenefitTypes: (value: string[]) => void;
  setHasHousingSubscriptionSavings: (value: string | null) => void;
  setHousingSubscriptionPeriod: (value: string | null) => void;
  setHousingSubscriptionPaymentCount: (value: string | null) => void;
  setTotalPaymentAmount: (value: string | null) => void;
  setIsNewlyMarried: (value: boolean | null) => void;
  setMarriagePeriod: (value: string | null) => void;
  setIsMultiChildVulnerable: (value: boolean | null) => void;
  setIsSingleParent: (value: boolean | null) => void;
  setChildrenInfo: (value: { under6: number; over7: number } | null) => void;
  setHasSpouseChildren: (value: string | null) => void;
  setSpouseChildrenInfo: (
    value: { expectedBirth?: number; under6: number; over7: number } | null
  ) => void;
  setSpouseFamilyTypes: (value: string[]) => void;
  setMarriedHouseholdChildrenInfo: (
    value: { expectedBirth?: number; under6: number; over7: number } | null
  ) => void;
  setMarriedHouseholdFamilyTypes: (value: string[]) => void;
  reset: () => void;
}

const initialData: EligibilityData = {
  hasKoreanNationality: null,
  gender: null,
  birthDate: null,
  marriageStatus: null,
  hasRegisteredChildren: null,
  familyTypes: [],
  minorEligibilityType: null,
  specialEligibilityTypes: [],
  hasIncomeWork: null,
  monthlyIncome: null,
  hasIncomeWorkWithin5Years: null,
  studentJobSeekerTypes: [],
  youngSingleStudentStatus: null,
  parentMonthlyIncome: null,
  hasCar: null,
  carAssetValue: null,
  youngSingleSpecialEligibilityTypes: [],
  householdRole: null,
  householdComposition: null,
  hasOwnHousing: null,
  householdHousingOwnershipStatus: null,
  housingDisposalYears: null,
  hasNeverOwnedHousing: false,
  isTotalAssetUnder337Million: null,
  hasHouseholdCar: null,
  householdCarAssetValue: null,
  isHouseholdTotalAssetUnder337Million: null,
  hasOwnLand: null,
  landAssetValue: null,
  financialAssetValue: null,
  hasHouseholdLand: null,
  householdLandAssetValue: null,
  householdFinancialAssetValue: null,
  isBasicBenefitRecipient: false,
  benefitTypes: [],
  hasHousingSubscriptionSavings: null,
  housingSubscriptionPeriod: null,
  housingSubscriptionPaymentCount: null,
  totalPaymentAmount: null,
  isNewlyMarried: null,
  marriagePeriod: null,
  isMultiChildVulnerable: null,
  isSingleParent: null,
  childrenInfo: null,
  hasSpouseChildren: null,
  spouseChildrenInfo: null,
  spouseFamilyTypes: [],
  marriedHouseholdChildrenInfo: null,
  marriedHouseholdFamilyTypes: [],
};

export const useEligibilityStore = create<EligibilityState>()(
  persist(
    set => ({
      ...initialData,
      setHasKoreanNationality: (value: string | null) => set({ hasKoreanNationality: value }),
      setGender: (value: string | null) => set({ gender: value }),
      setBirthDate: (value: Date | null) => set({ birthDate: value }),
      setMarriageStatus: (value: string | null) => set({ marriageStatus: value }),
      setHasRegisteredChildren: (value: string | null) => set({ hasRegisteredChildren: value }),
      setFamilyTypes: (value: string[]) => set({ familyTypes: value }),
      setMinorEligibilityType: (value: string | null) => set({ minorEligibilityType: value }),
      setSpecialEligibilityTypes: (value: string[]) => set({ specialEligibilityTypes: value }),
      setHasIncomeWork: (value: string | null) => set({ hasIncomeWork: value }),
      setMonthlyIncome: (value: string | null) => set({ monthlyIncome: value }),
      setHasIncomeWorkWithin5Years: (value: string | null) =>
        set({ hasIncomeWorkWithin5Years: value }),
      setStudentJobSeekerTypes: (value: string[]) => set({ studentJobSeekerTypes: value }),
      setYoungSingleStudentStatus: (value: string | null) =>
        set({ youngSingleStudentStatus: value }),
      setParentMonthlyIncome: (value: string | null) => set({ parentMonthlyIncome: value }),
      setHasCar: (value: string | null) => set({ hasCar: value }),
      setCarAssetValue: (value: string | null) => set({ carAssetValue: value }),
      setYoungSingleSpecialEligibilityTypes: (value: string[]) =>
        set({ youngSingleSpecialEligibilityTypes: value }),
      setHouseholdRole: (value: string | null) => set({ householdRole: value }),
      setHouseholdComposition: (value: string | null) => set({ householdComposition: value }),
      setHasOwnHousing: (value: string | null) => set({ hasOwnHousing: value }),
      setHouseholdHousingOwnershipStatus: (value: string | null) =>
        set({ householdHousingOwnershipStatus: value }),
      setHousingDisposalYears: (value: string | null) => set({ housingDisposalYears: value }),
      setHasNeverOwnedHousing: (value: boolean) => set({ hasNeverOwnedHousing: value }),
      setIsTotalAssetUnder337Million: (value: string | null) =>
        set({ isTotalAssetUnder337Million: value }),
      setHasHouseholdCar: (value: string | null) => set({ hasHouseholdCar: value }),
      setHouseholdCarAssetValue: (value: string | null) => set({ householdCarAssetValue: value }),
      setIsHouseholdTotalAssetUnder337Million: (value: string | null) =>
        set({ isHouseholdTotalAssetUnder337Million: value }),
      setHasOwnLand: (value: string | null) => set({ hasOwnLand: value }),
      setLandAssetValue: (value: string | null) => set({ landAssetValue: value }),
      setFinancialAssetValue: (value: string | null) => set({ financialAssetValue: value }),
      setHasHouseholdLand: (value: string | null) => set({ hasHouseholdLand: value }),
      setHouseholdLandAssetValue: (value: string | null) => set({ householdLandAssetValue: value }),
      setHouseholdFinancialAssetValue: (value: string | null) =>
        set({ householdFinancialAssetValue: value }),
      setIsBasicBenefitRecipient: (value: boolean) => set({ isBasicBenefitRecipient: value }),
      setBenefitTypes: (value: string[]) => set({ benefitTypes: value }),
      setHasHousingSubscriptionSavings: (value: string | null) =>
        set({ hasHousingSubscriptionSavings: value }),
      setHousingSubscriptionPeriod: (value: string | null) =>
        set({ housingSubscriptionPeriod: value }),
      setHousingSubscriptionPaymentCount: (value: string | null) =>
        set({ housingSubscriptionPaymentCount: value }),
      setTotalPaymentAmount: (value: string | null) => set({ totalPaymentAmount: value }),
      setIsNewlyMarried: (value: boolean | null) => set({ isNewlyMarried: value }),
      setMarriagePeriod: (value: string | null) => set({ marriagePeriod: value }),
      setIsMultiChildVulnerable: (value: boolean | null) => set({ isMultiChildVulnerable: value }),
      setIsSingleParent: (value: boolean | null) => set({ isSingleParent: value }),
      setChildrenInfo: (value: { under6: number; over7: number } | null) =>
        set({ childrenInfo: value }),
      setHasSpouseChildren: (value: string | null) => set({ hasSpouseChildren: value }),
      setSpouseChildrenInfo: (
        value: { expectedBirth?: number; under6: number; over7: number } | null
      ) => set({ spouseChildrenInfo: value }),
      setSpouseFamilyTypes: (value: string[]) => set({ spouseFamilyTypes: value }),
      setMarriedHouseholdChildrenInfo: (
        value: { expectedBirth?: number; under6: number; over7: number } | null
      ) => set({ marriedHouseholdChildrenInfo: value }),
      setMarriedHouseholdFamilyTypes: (value: string[]) =>
        set({ marriedHouseholdFamilyTypes: value }),
      reset: () => set(initialData),
    }),
    {
      name: "eligibility", // localStorage key
      storage: {
        getItem: name => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          // Date 문자열을 Date 객체로 변환
          if (parsed.state?.birthDate && typeof parsed.state.birthDate === "string") {
            parsed.state = {
              ...parsed.state,
              birthDate: new Date(parsed.state.birthDate),
            };
          }
          return parsed;
        },
        setItem: (name, value) => {
          const serialized = { ...value };
          // Date 객체를 문자열로 변환
          if (serialized.state?.birthDate instanceof Date) {
            serialized.state = {
              ...serialized.state,
              birthDate: serialized.state.birthDate.toISOString() as any,
            };
          }
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: name => localStorage.removeItem(name),
      },
    }
  )
);
