import { EligibilityData } from "./eligibilityStore";

/**
 * 단계 ID 타입
 */
export type StepId = string;

/**
 * 컴포넌트 타입
 */
export type ComponentType =
  | "statusBanner"
  | "optionSelector"
  | "select"
  | "priceInput"
  | "numberInputList"
  | "infoButton"
  | "datePicker"
  | "checkbox";

/**
 * 컴포넌트 설정
 * - showWhen: 같은 페이지 내 조건부 표시 (예: "예" 선택 시 하위 질문 표시)
 * - children: 하위 컴포넌트 배열 (조건부로 표시되는 추가 질문들)
 * - storeKey: store의 필드명 (자동으로 store와 연결)
 */
export interface ComponentConfig {
  /** 컴포넌트 타입 */
  type: ComponentType;
  /** 컴포넌트 props */
  props: Record<string, any>;
  /** 조건부 표시 함수 (같은 페이지 내 동적 표시용) */
  showWhen?: (data: EligibilityData) => boolean;
  /** 하위 컴포넌트 배열 (예: "예" 선택 시 나타나는 추가 질문들) */
  children?: ComponentConfig[];
  /** store 필드명 (자동으로 store 값과 setter 연결) */
  storeKey?: string;
}

/**
 * 단계 설정
 */
export interface StepConfig {
  /** 단계 ID */
  id: StepId;
  /** 그룹 ID (Stepper에서 사용) */
  groupId: string;
  /** 이 단계에서 보여줄 컴포넌트 조합 */
  components: ComponentConfig[];
  /** 검증 함수 (null이면 통과, 문자열이면 에러 메시지) */
  validation?: (data: EligibilityData) => string | null;
  /** 다음 단계 결정 함수 */
  getNextStep: (data: EligibilityData) => StepId | null;
}

/**
 * 나이 계산 헬퍼 함수
 */
export const calculateAge = (birthDate: Date | null): number | null => {
  if (!birthDate) return null;
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};

/**
 * 결정트리 정의
 * TODO: 분기 조건 로직은 나중에 채워넣기
 */
export const eligibilityDecisionTree: StepConfig[] = [
  // 1. 국적 확인
  {
    id: "nationality",
    groupId: "personalInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "공공 임대주택은 대한민국 국민을",
          description: "대상으로 합니다.",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "대한민국 국적을 가지고 계신가요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasKoreanNationality",
      },
    ],
    validation: data => {
      if (!data.hasKoreanNationality || data.hasKoreanNationality !== "1") {
        return "대한민국 국적을 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      if (data.hasKoreanNationality === "1") {
        return "genderBirth";
      }
      return null; // 종료
    },
  },

  // 2. 성별/생년월일
  {
    id: "genderBirth",
    groupId: "personalInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "먼저 나의 기본정보를 알아볼게요!",
          description: "",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "성별을 선택해주세요",
          options: [
            { id: "1", label: "남성" },
            { id: "2", label: "여성" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "gender",
      },
      {
        type: "datePicker",
        props: {
          label: "생년월일을 선택해주세요",
          placeholder: "생년월일 선택",
        },
        storeKey: "birthDate",
      },
    ],
    validation: data => {
      if (!data.gender) return "성별을 선택해주세요";
      if (!data.birthDate) return "생년월일을 선택해주세요";
      return null;
    },
    getNextStep: data => {
      const age = calculateAge(data.birthDate);
      if (age === null) return null;
      return "incomeInfo";
    },
  },

  // 3. 소득 정보 (같은 페이지 내 조건부 질문 포함)
  {
    id: "incomeInfo",
    groupId: "personalInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "소득이 발생하는 업무에 종사중인가요?",
          description: "자영업/알바포함",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasIncomeWork",
        children: [
          {
            type: "priceInput",
            props: {
              title: "내 월평균 소득정보를 알려주세요",
              required: true,
              placeholder: "금액을 입력해 주세요",
            },
            storeKey: "monthlyIncome",
            showWhen: data => {
              return data.hasIncomeWork === "1";
            },
          },
          {
            type: "checkbox",
            props: {
              label: "기초급여 수급자예요",
            },
            storeKey: "isBasicBenefitRecipient",
            showWhen: data => {
              return data.hasIncomeWork === "1";
            },
          },
        ],
      },
      {
        type: "optionSelector",
        props: {
          title: "다음중 어떤 사항에 해당하시나요?",
          description: "복수 선택 가능",
          options: [
            { id: "1", label: "주거급여 수급자" },
            { id: "2", label: "생계/의료급여 수급자" },
          ],
          multiselect: 2,
        },
        storeKey: "benefitTypes",
        showWhen: data => {
          return data.hasIncomeWork === "1" && data.isBasicBenefitRecipient === true;
        },
      },
    ],
    validation: data => {
      // 1. 소득 업무 종사 여부를 선택하지 않은 경우
      if (!data.hasIncomeWork) {
        return "소득이 발생하는 업무 종사 여부를 선택해주세요";
      }

      // 2. '아니오'를 선택한 경우 → 통과
      if (data.hasIncomeWork === "2") {
        return null;
      }

      // 3. '예'를 선택한 경우
      if (data.hasIncomeWork === "1") {
        // 3-1. 월평균 소득이 입력되어 있으면 → 통과
        if (data.monthlyIncome && data.monthlyIncome !== "0") {
          return null;
        }

        // 3-2. 체크박스가 체크되어 있고, benefitTypes에 선택이 있으면 → 통과
        if (
          data.isBasicBenefitRecipient === true &&
          data.benefitTypes &&
          data.benefitTypes.length > 0 &&
          data.monthlyIncome &&
          data.monthlyIncome !== "0"
        ) {
          return null;
        }

        // 3-3. 그 외의 경우 → 통과 안됨
        if (!data.monthlyIncome || data.monthlyIncome === "0") {
          return "월평균 소득을 입력해주세요";
        }
      }

      return null;
    },
    getNextStep: () => "assetInfo", // 다음 단계: 자산 정보
  },

  // 4. 자산 정보 (청약저축 - 같은 페이지 내 조건부 질문 포함)
  {
    id: "assetInfo",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "청약저축에 가입되어 있나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasHousingSubscriptionSavings",
        children: [
          {
            type: "select",
            props: {
              title: "청약저축 가입 기간을 선택해 주세요",
              options: [
                { key: "1", value: "1년 미만" },
                { key: "2", value: "1년 이상 2년 미만" },
                { key: "3", value: "2년 이상 3년 미만" },
                { key: "4", value: "3년 이상 4년 미만" },
                { key: "5", value: "4년 이상 5년 미만" },
                { key: "6", value: "5년 이상" },
              ],
              placeholder: "선택 안함",
            },
            storeKey: "housingSubscriptionPeriod",
            showWhen: data => data.hasHousingSubscriptionSavings === "1",
          },
          {
            type: "select",
            props: {
              title: "청약저축 납입횟수를 선택해 주세요",
              options: [
                { key: "1", value: "10회 미만" },
                { key: "2", value: "10회 이상 20회 미만" },
                { key: "3", value: "20회 이상 30회 미만" },
                { key: "4", value: "30회 이상 40회 미만" },
                { key: "5", value: "40회 이상 50회 미만" },
                { key: "6", value: "50회 이상" },
              ],
              placeholder: "선택 안함",
            },
            storeKey: "housingSubscriptionPaymentCount",
            showWhen: data => data.hasHousingSubscriptionSavings === "1",
          },
          {
            type: "optionSelector",
            props: {
              title: "총 납입 금액을 알려주세요",
              options: [
                { id: "1", label: "6000만원 이상" },
                { id: "2", label: "6000만원 이하" },
              ],
              required: true,
              direction: "vertical",
            },
            storeKey: "totalPaymentAmount",
            showWhen: data => data.hasHousingSubscriptionSavings === "1",
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasHousingSubscriptionSavings) {
        return "청약저축 가입 여부를 선택해주세요";
      }
      if (data.hasHousingSubscriptionSavings === "1") {
        if (!data.housingSubscriptionPeriod) {
          return "청약저축 가입 기간을 선택해주세요";
        }
        if (!data.housingSubscriptionPaymentCount) {
          return "청약저축 납입횟수를 선택해주세요";
        }
        if (!data.totalPaymentAmount) {
          return "총 납입 금액을 선택해주세요";
        }
      }
      return null;
    },
    getNextStep: () => null, // 마지막 단계
  },

  // 5. 미성년자 정보
  {
    id: "minorInfo",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "미성년자에 해당하시네요!",
          description: "다음은 신분정보를 자세히 확인해 볼게요",
        },
      },
      // TODO: 미성년자 관련 추가 질문들
    ],
    validation: () => null, // TODO: 검증 로직 추가
    getNextStep: () => "incomeInfo",
  },

  // 6. 청년 정보 (신혼부부, 다자녀-취약계층, 한부모 분기 포함)
  {
    id: "youthInfo",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "청년층에 해당하시네요!",
          description: "다음은 신분정보를 자세히 확인해 볼게요",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "신혼부부에 해당하시나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "isNewlyMarried",
        children: [
          {
            type: "select",
            props: {
              title: "혼인 기간이 어떻게 되나요?",
              options: [
                { key: "1", value: "1년 미만" },
                { key: "2", value: "1년 이상 3년 미만" },
                { key: "3", value: "3년 이상" },
              ],
              placeholder: "선택 안함",
            },
            storeKey: "marriagePeriod",
            showWhen: data => data.isNewlyMarried === true,
          },
        ],
      },
      {
        type: "optionSelector",
        props: {
          title: "다자녀-취약계층에 해당하시나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "isMultiChildVulnerable",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "자녀 정보를 알려주세요",
              description: "성인 자녀의 경우 입력하지 않아도 됩니다",
              required: true,
              options: [
                {
                  id: "under6",
                  prefix: "6세 이하 자녀 수",
                  postfix: "명",
                },
                {
                  id: "over7",
                  prefix: "7세 이상 미성년 자녀 수",
                  postfix: "명",
                },
              ],
              summary: (values: Record<string, string>) =>
                `총 ${Number(values.under6 || 0) + Number(values.over7 || 0)}명의 미성년 자녀가 있어요`,
            },
            storeKey: "childrenInfo",
            showWhen: data => data.isMultiChildVulnerable === true,
          },
        ],
      },
      {
        type: "optionSelector",
        props: {
          title: "한부모 가족에 해당하시나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "isSingleParent",
      },
    ],
    validation: data => {
      if (data.isNewlyMarried === null) {
        return "신혼부부 여부를 선택해주세요";
      }
      if (data.isNewlyMarried === true && !data.marriagePeriod) {
        return "혼인 기간을 선택해주세요";
      }
      if (data.isMultiChildVulnerable === null) {
        return "다자녀-취약계층 여부를 선택해주세요";
      }
      if (data.isMultiChildVulnerable === true && !data.childrenInfo) {
        return "자녀 정보를 입력해주세요";
      }
      if (data.isSingleParent === null) {
        return "한부모 가족 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 분기 로직: 신혼부부, 다자녀-취약계층, 한부모 중 하나라도 해당하면 추가 정보 수집
      // 현재는 바로 소득 정보로 이동
      return "incomeInfo";
    },
  },

  // 7. 성인 정보
  {
    id: "adultInfo",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "성인에 해당하시네요!",
          description: "다음은 신분정보를 자세히 확인해 볼게요",
        },
      },
      // TODO: 성인 관련 추가 질문들
    ],
    validation: () => null, // TODO: 검증 로직 추가
    getNextStep: () => "incomeInfo",
  },

  // 8. 신혼부부 정보 (별도 단계로 분리 가능)
  {
    id: "newlyMarriedInfo",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "신혼부부에 해당하시네요!",
          description: "추가 정보를 확인해 볼게요",
        },
      },
      // TODO: 신혼부부 관련 추가 질문들
    ],
    validation: () => null, // TODO: 검증 로직 추가
    getNextStep: () => "incomeInfo",
  },

  // 9. 다자녀-취약계층 정보 (별도 단계로 분리 가능)
  {
    id: "multiChildVulnerableInfo",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "다자녀-취약계층에 해당하시네요!",
          description: "추가 정보를 확인해 볼게요",
        },
      },
      // TODO: 다자녀-취약계층 관련 추가 질문들
    ],
    validation: () => null, // TODO: 검증 로직 추가
    getNextStep: () => "incomeInfo",
  },

  // 10. 한부모 정보 (별도 단계로 분리 가능)
  {
    id: "singleParentInfo",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "한부모 가족에 해당하시네요!",
          description: "추가 정보를 확인해 볼게요",
        },
      },
      // TODO: 한부모 관련 추가 질문들
    ],
    validation: () => null, // TODO: 검증 로직 추가
    getNextStep: () => "incomeInfo",
  },
];

/**
 * StepId로 StepConfig 찾기
 */
export const findStepById = (stepId: StepId): StepConfig | undefined => {
  return eligibilityDecisionTree.find(step => step.id === stepId);
};

/**
 * 첫 번째 단계 ID
 */
export const FIRST_STEP_ID: StepId = "nationality";
