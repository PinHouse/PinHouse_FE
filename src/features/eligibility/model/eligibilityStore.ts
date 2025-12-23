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
