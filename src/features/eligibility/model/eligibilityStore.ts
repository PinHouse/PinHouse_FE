import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EligibilityData {
  // BasicInfoStep1
  hasKoreanNationality: string | null; // "1" (예) 또는 "2" (아니오)
  // BasicInfoStep2
  gender: string | null; // "1" (남성) 또는 "2" (여성)
  birthDate: Date | null; // 생년월일
  // BasicInfoStep3
  hasIncomeWork: string | null; // "1" (예) 또는 "2" (아니오)
  monthlyIncome: string | null; // 월평균 소득
  isBasicBenefitRecipient: boolean; // 기초급여 수급자 여부
  benefitTypes: string[]; // 주거급여 수급자, 생계/의료급여 수급자 (복수 선택)
  // BasicInfoStep4
  hasHousingSubscriptionSavings: string | null; // "1" (예) 또는 "2" (아니오)
  housingSubscriptionPeriod: string | null; // 청약저축 가입 기간
  housingSubscriptionPaymentCount: string | null; // 청약저축 납입횟수
  totalPaymentAmount: string | null; // "1" (6000만원 이상) 또는 "2" (6000만원 이하)
}

export interface EligibilityState extends EligibilityData {
  setHasKoreanNationality: (value: string | null) => void;
  setGender: (value: string | null) => void;
  setBirthDate: (value: Date | null) => void;
  setHasIncomeWork: (value: string | null) => void;
  setMonthlyIncome: (value: string | null) => void;
  setIsBasicBenefitRecipient: (value: boolean) => void;
  setBenefitTypes: (value: string[]) => void;
  setHasHousingSubscriptionSavings: (value: string | null) => void;
  setHousingSubscriptionPeriod: (value: string | null) => void;
  setHousingSubscriptionPaymentCount: (value: string | null) => void;
  setTotalPaymentAmount: (value: string | null) => void;
  reset: () => void;
}

const initialData: EligibilityData = {
  hasKoreanNationality: null,
  gender: null,
  birthDate: null,
  hasIncomeWork: null,
  monthlyIncome: null,
  isBasicBenefitRecipient: false,
  benefitTypes: [],
  hasHousingSubscriptionSavings: null,
  housingSubscriptionPeriod: null,
  housingSubscriptionPaymentCount: null,
  totalPaymentAmount: null,
};

export const useEligibilityStore = create<EligibilityState>()(
  persist(
    set => ({
      ...initialData,
      setHasKoreanNationality: (value: string | null) => set({ hasKoreanNationality: value }),
      setGender: (value: string | null) => set({ gender: value }),
      setBirthDate: (value: Date | null) => set({ birthDate: value }),
      setHasIncomeWork: (value: string | null) => set({ hasIncomeWork: value }),
      setMonthlyIncome: (value: string | null) => set({ monthlyIncome: value }),
      setIsBasicBenefitRecipient: (value: boolean) => set({ isBasicBenefitRecipient: value }),
      setBenefitTypes: (value: string[]) => set({ benefitTypes: value }),
      setHasHousingSubscriptionSavings: (value: string | null) =>
        set({ hasHousingSubscriptionSavings: value }),
      setHousingSubscriptionPeriod: (value: string | null) =>
        set({ housingSubscriptionPeriod: value }),
      setHousingSubscriptionPaymentCount: (value: string | null) =>
        set({ housingSubscriptionPaymentCount: value }),
      setTotalPaymentAmount: (value: string | null) => set({ totalPaymentAmount: value }),
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
