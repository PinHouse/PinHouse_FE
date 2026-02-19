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
  /** 조건부 비활성화 함수 (같은 페이지 내 동적 비활성화용) */
  disabledWhen?: (data: EligibilityData) => boolean;
  /** 하위 컴포넌트 배열 (예: "예" 선택 시 나타나는 추가 질문들) */
  children?: ComponentConfig[];
  /** store 필드명 (자동으로 store 값과 setter 연결) */
  storeKey?: string;
}

/**
 * Validation 에러 결과
 */
export interface ValidationError {
  /** 에러 메시지 */
  message: string;
  /** Toast 표시 여부 (기본값: false) */
  toast?: boolean;
}

/**
 * Validation 결과 타입
 * - null: 검증 통과
 * - string: 에러 메시지 (기존 호환성 유지, toast: false로 처리)
 * - ValidationError: 에러 메시지와 Toast 표시 여부
 */
export type ValidationResult = string | ValidationError | null;

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
  /** 검증 함수 (null이면 통과, 문자열 또는 ValidationError이면 에러 메시지) */
  validation?: (data: EligibilityData) => ValidationResult;
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
 */
export const eligibilityDecisionTree: StepConfig[] = [
  // basic info 001
  {
    id: "basicInfo001",
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
      // 국적을 선택하지 않은 경우
      if (!data.hasKoreanNationality) {
        return "국적을 선택해주세요";
      }
      // "아니오"를 선택한 경우
      if (data.hasKoreanNationality == "2") {
        return {
          message: "자격 진단은 대한민국 국적을 가진 분만 진행할 수 있어요",
          toast: true,
        };
      }
      // 국적선택에 "예"를 선택한 경우
      return null;
    },
    getNextStep: () => {
      return "basicInfo002";
    },
  },

  // basic info 002
  {
    id: "basicInfo002",
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
    getNextStep: () => {
      return "basicInfo003";
    },
  },

  // basic info 003
  {
    id: "basicInfo003",
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
            disabledWhen: data => {
              return data.isBasicBenefitRecipient === true;
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
        // 3-1. 월평균 소득이 1이상이 아닌 경우
        if (data.monthlyIncome && Number(data.monthlyIncome) <= 0) {
          return {
            message: "1이상의 값을 입력해 주세요",
            toast: true,
          };
        }
        // 3-2. Income가 1이상인 경우 통과
        if (data.monthlyIncome && Number(data.monthlyIncome) > 0) {
          return null;
        }
        // 3-3. 그 외의 경우 → 통과 안됨
        return "월평균 소득이 1이상이어야 해요";
      }

      return null;
    },
    getNextStep: () => {
      return "basicInfo004";
    },
  },

  // basic info 004
  {
    id: "basicInfo004",
    groupId: "personalInfo",
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
                { key: "1", value: "6개월 미만" },
                { key: "2", value: "6개월 이상~1년 미만" },
                { key: "3", value: "1년 이상~2년 미만" },
                { key: "4", value: "2년 이상" },
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
                { key: "1", value: "0~5회" },
                { key: "2", value: "6~11회" },
                { key: "3", value: "12~23회" },
                { key: "4", value: "24회이상" },
                { key: "5", value: "36~48회" },
                { key: "6", value: "49~59회" },
                { key: "7", value: "60회이상" },
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
      return null;
    },
    getNextStep: data => {
      // 19세 미만이면 미성년자 자격 확인 단계로 이동
      const age = calculateAge(data.birthDate);
      if (age === null) {
        console.log("🔍 age:", age);
        return null;
      }
      if (age < 19) {
        return "underAge001";
      }
      return "adult001";
    },
  },

  // underage 001
  {
    id: "underAge001",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "아직 미성년자이시네요!",
          description: "미성년자는 아래 조건에서만 신청할 수 있어요",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "다음 중 나에게 해당되는 사항을 선택해주세요",
          options: [
            { id: "0", label: "해당사항이 없어요" },
            { id: "1", label: "자녀가 있는 미성년 세대주" },
            { id: "2", label: "부모 등 보호자의 부재로 형제자매를 부양하는 미성년 세대주" },
            { id: "3", label: "외국인 한부모가족의 미성년 세대주(내국인 자녀)" },
          ],
          required: true,
          direction: "vertical",
        },
        storeKey: "minorEligibilityType",
      },
    ],
    validation: data => {
      if (!data.minorEligibilityType) {
        return "해당되는 사항을 선택해주세요";
      }
      return null;
    },
    getNextStep: () => {
      return null;
    },
  },

  // adult001 + adult 001-1
  {
    id: "adult001",
    groupId: "identityInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: (data: EligibilityData) => {
            const age = calculateAge(data.birthDate);
            if (age === null) return "나이를 확인할 수 없어요";
            if (age >= 19 && age <= 39) return "청년층에 해당하시네요!";
            if (age >= 40 && age <= 64) return "중장년층에 해당하시네요!";
            if (age >= 65) return "고령자층에 해당하시네요!";
            return "나이를 확인할 수 없어요";
          },
          description: "다음은 신분정보를 자세히 확인해 볼게요",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "결혼 여부를 알려주세요",
          description: "입주 전까지 결혼 예정이라면 '예'를 선택해 주세요!",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "marriageStatus",
      },
      {
        type: "select",
        props: {
          title: "혼인기간이 어떻게되나요?",
          options: [
            { key: "1", value: "현재 혼인기간(재혼 포함) 7년 이내인 신혼부부" },
            { key: "2", value: "예비 신혼부부" },
            { key: "3", value: "혼인기간 7년 이상" },
          ],
          placeholder: "선택 안함",
        },
        storeKey: "marriagePeriod",
        showWhen: data => data.marriageStatus === "1",
      },
    ],
    validation: data => {
      if (!data.marriageStatus) {
        return "결혼 여부를 선택해주세요";
      }
      if (data.marriageStatus === "1" && !data.marriagePeriod) {
        return "혼인기간을 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // "아니오" 선택 시 adult_002로 이동
      if (data.marriageStatus === "2") {
        return "adult002";
      }
      // "예" 선택 시 adult_001-2로 이동
      if (data.marriageStatus === "1" && data.marriagePeriod) {
        return "adult001-2";
      }
      return null;
    },
  },

  // adult 001-2
  {
    id: "adult001-2",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "나, 또는 배우자의 주민등록상 등록된 자녀/손자녀가있나요?",
          description: "임도 중, 입양자녀 양육, 대리양육 시에도 '예'를 선택해 주세요",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasSpouseChildren",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "자녀 정보를 알려주세요",
              description: "성인 자녀의 경우 입력하지 않아도 됩니다",
              required: false,
              options: [
                {
                  id: "expectedBirth",
                  prefix: "출산 예정",
                  postfix: "명",
                  placeholder: "0",
                },
                {
                  id: "under6",
                  prefix: "6세 이하 자녀 수",
                  postfix: "명",
                  placeholder: "0",
                },
                {
                  id: "over7",
                  prefix: "7세 이상 미성년 자녀 수",
                  postfix: "명",
                  placeholder: "0",
                },
              ],
              summary: (values: Record<string, string>) => {
                const expectedBirth = values.expectedBirth ? Number(values.expectedBirth) || 0 : 0;
                const under6 = values.under6 ? Number(values.under6) || 0 : 0;
                const over7 = values.over7 ? Number(values.over7) || 0 : 0;
                const total = under6 + over7 + expectedBirth;
                return `총 ${total} 명의 미성년 자녀가 있어요`;
              },
            },
            storeKey: "spouseChildrenInfo",
            showWhen: data => {
              return data.hasSpouseChildren === "1";
            },
          },
          {
            type: "optionSelector",
            props: {
              title: "다음 중 해당되는 사항이 있다면 모두 선택해주세요",
              description: "복수 선택 가능",
              options: [
                { id: "1", label: "친인척 위탁가정" },
                { id: "2", label: "대리 양육 가정" },
              ],
              multiselect: 2,
            },
            storeKey: "spouseFamilyTypes",
            showWhen: data => {
              return data.hasSpouseChildren === "1";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasSpouseChildren) {
        return "주민등록상 등록된 자녀/손자녀 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: () => {
      return "adult002";
    },
  },

  // adult 002 + adult 002-1
  {
    id: "adult002",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "내 주민등록상 등록된 자녀/손자녀가 있나요?",
          description: "입양자녀 양육, 대리양육 시에도 '예'를 선택해 주세요",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasRegisteredChildren",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "자녀 정보를 알려주세요",
              description: "성인 자녀의 경우 입력하지 않아도 됩니다",
              required: false,
              options: [
                {
                  id: "under6",
                  prefix: "6세 이하 자녀 수",
                  postfix: "명",
                  placeholder: "0",
                },
                {
                  id: "over7",
                  prefix: "7세 이상 미성년 자녀 수",
                  postfix: "명",
                  placeholder: "0",
                },
              ],
              summary: (values: Record<string, string>) => {
                const under6 = values.under6 ? Number(values.under6) || 0 : 0;
                const over7 = values.over7 ? Number(values.over7) || 0 : 0;
                const total = under6 + over7;
                return `총 ${total} 명의 미성년 자녀가 있어요`;
              },
            },
            storeKey: "childrenInfo",
            showWhen: data => {
              return data.hasRegisteredChildren === "1";
            },
          },
          {
            type: "optionSelector",
            props: {
              title: "다음 중 해당되는 사항이 있다면 모두 선택해 주세요",
              description: "복수 선택 가능",
              options: [
                { id: "1", label: "친인척 위탁가정" },
                { id: "2", label: "대리 양육 가정" },
                { id: "3", label: "한부모 가정" },
                { id: "4", label: "보호 대상 한부모 가정" },
              ],
              multiselect: 4,
            },
            storeKey: "familyTypes",
            showWhen: data => {
              return data.hasRegisteredChildren === "1";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasRegisteredChildren) {
        return "주민등록상 등록된 자녀/손자녀 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      const age = calculateAge(data.birthDate);
      if (age === null) return null;

      const isMarried = data.marriageStatus === "1";
      const isSingle = data.marriageStatus === "2";

      // 1. 미혼+청년 (19~39세, 미혼)
      if (isSingle && age >= 19 && age < 40) {
        return "youngSingle001";
      }

      // 2. 미혼+중장년 (40~64세, 미혼)
      if (isSingle && age >= 40 && age < 65) {
        return "middleAge001";
      }

      // 3. 청년+중장년 기혼 (19~64세, 기혼) + 고령자(65세 이상, 미혼+기혼)
      return "commonAge001";
    },
  },

  // young single 001 - 청년 미혼 대학생/취업준비생 여부
  {
    id: "youngSingle001",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "대학생/취업준비생 여부를 알려주세요",
          description: "",
          options: [
            { id: "1", label: "해당사항이 없어요" },
            { id: "2", label: "대학교 재학 중이거나 다음 학기에 입학 예정이에요" },
            { id: "3", label: "대학교 휴학 중이며 다음 학기 복학 예정이에요" },
            { id: "4", label: "대학교 혹은 고등학교 졸업/중퇴 후 2년 이내에요" },
            { id: "5", label: "졸업/중퇴 후 2년이 지났지만 대학원에 재학 중이에요" },
          ],
          required: true,
        },
        storeKey: "youngSingleStudentStatus",
        children: [
          {
            type: "priceInput",
            props: {
              title: "부모님의 월 평균 소득 합계를 알려주세요",
              description:
                "부모님이 이혼중이거나 조부모님과 함께 살고있다면 주 양육자의 소득정보를 알려주세요",
              placeholder: "0",
            },
            storeKey: "parentMonthlyIncome",
            showWhen: data => {
              return Boolean(
                data.youngSingleStudentStatus && data.youngSingleStudentStatus !== "1"
              );
            },
          },
        ],
      },
      {
        type: "infoButton",
        props: {
          title: "우리 학교가 공공 임대주택에서 인정되는 학교 기준에 해당되는지 궁금하다면?",
          description:
            "학점은행제, 사내대학, 원격대학, 재외국민은 제외합니다\n대안학교, 검정고시는 포함하지만 해외 고등학교 졸업은 제외합니다",
        },
      },
    ],
    validation: data => {
      if (!data.youngSingleStudentStatus) {
        return "대학생/취업준비생 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 자동차 소유 여부 단계로 이동
      return "youngSingle001_2";
    },
  },

  // young single 001-2 - 청년 미혼 자동차 소유 여부 및 자산가액
  {
    id: "youngSingle001_2",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "개인 자동차를 소유중인가요?",
          description: "개인 차량을 소유할 경우 대학생 신분으로 지원이 어려울 수 있어요",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasCar",
        children: [
          {
            type: "priceInput",
            props: {
              title: "자동차 자산가액 정보를 알려주세요",
              placeholder: "0",
            },
            storeKey: "carAssetValue",
            showWhen: data => {
              return data.hasCar === "1";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasCar) {
        return "개인 자동차 소유 여부를 선택해주세요";
      }
      // 자동차를 소유한 경우 자산가액 입력 필수
      if (data.hasCar === "1" && (!data.carAssetValue || data.carAssetValue === "0")) {
        return "자동차 자산가액을 입력해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 특별 자격 요건 단계로 이동
      return "youngSingle003";
    },
  },

  // young single 002 - 청년 미혼 자동차 소유 여부 및 자산가액
  {
    id: "youngSingle002",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "개인 자동차를 소유중인가요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasCar",
        children: [
          {
            type: "priceInput",
            props: {
              title: "자동차 자산가액 정보를 알려주세요",
              placeholder: "0",
            },
            storeKey: "carAssetValue",
            showWhen: data => {
              return data.hasCar === "1";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasCar) {
        return "개인 자동차 소유 여부를 선택해주세요";
      }
      // 자동차를 소유한 경우 자산가액 입력 필수
      if (data.hasCar === "1" && (!data.carAssetValue || data.carAssetValue === "0")) {
        return "자동차 자산가액을 입력해주세요";
      }
      return null;
    },
    getNextStep: () => {
      // 청년 미혼 특별 자격 요건 단계로 이동
      return "youngSingle003";
    },
  },

  // young adult 003 - 청년 미혼 특별 자격 요건(취약계층 판단)
  {
    id: "youngAdult003",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "다음 중 해당되는 사항이 있다면 모두 선택해 주세요",
          description: "복수 선택 가능",
          options: [
            { id: "1", label: "위탁가정/보육원 시설종료 2년이내, 종료 예정자" },
            { id: "2", label: "한국예술인 복지재단에서 증명받은 예술인" },
            { id: "3", label: "국가 유공자 본인/가구" },
            { id: "4", label: "위안부 피해자 본인/가구" },
            { id: "5", label: "북한이탈주민 본인" },
            { id: "6", label: "장애인 등록자/장애인 가구" },
            { id: "7", label: "교통사고 유자녀 가정" },
            { id: "8", label: "부도 공공임대 퇴거자" },
            { id: "9", label: "영구임대 퇴거자" },
            { id: "10", label: "주거 취약계층/긴급 주거지원 대상자" },
            { id: "11", label: "산단근로자" },
            { id: "12", label: "보증거절자" },
          ],
          multiselect: 12,
        },
        storeKey: "youngSingleSpecialEligibilityTypes",
      },
    ],
    validation: data => {
      // 선택 필수는 아니므로 항상 통과
      return null;
    },
    getNextStep: data => {
      const isMarried = data.marriageStatus === "1";
      const hasChildren = data.hasRegisteredChildren === "1" || data.hasSpouseChildren === "1";
      // 미혼 + 자녀없음 → adultSingle001
      if (!isMarried && !hasChildren) {
        return "adultSingle001";
      }
      // 기혼 or 미혼 + 자녀있음 → adultMarried001
      return "adultMarried001";
    },
  },

  // middle age 001 + middle age 001-1
  {
    id: "middleAge001",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "소득있는 업무에 종사한 기간이 5년 이내인가요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasIncomeWorkWithin5Years",
        children: [
          {
            type: "optionSelector",
            props: {
              title: "대학생/취업준비생 여부를 알려주세요",
              options: [
                { id: "1", label: "현재 소득이 있는 업무에 종사 중이에요" },
                { id: "2", label: "퇴직한지 1년 미만으로 구직급여 수급자이 인정됐어요" },
                { id: "3", label: "한국예술인 복지재단에서 예술 활동 증명을 받았어요" },
              ],
              multiselect: 3,
            },
            storeKey: "studentJobSeekerTypes",
            showWhen: data => {
              // 중장년(만 40~만 64세) + 미혼에서만 표시
              const age = calculateAge(data.birthDate);
              const isMiddleAged = age !== null && age >= 40 && age < 65;
              const isSingle = data.marriageStatus === "2";
              return data.hasIncomeWorkWithin5Years === "1" && isMiddleAged && isSingle;
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasIncomeWorkWithin5Years) {
        return "소득있는 업무에 종사한 기간을 선택해주세요";
      }
      return null;
    },
    getNextStep: () => {
      return "middleAge002";
    },
  },

  //  middle age 002
  {
    id: "middleAge002",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "다음 중 해당되는 사항이 있다면 모두 선택해 주세요",
          description: "복수 선택 가능",
          options: [
            { id: "1", label: "국가 유공자 본인/가구" },
            { id: "2", label: "위안부 피해자 본인/가구" },
            { id: "3", label: "북한이탈주민 본인" },
            { id: "4", label: "장애인 등록자/장애인 가구" },
            { id: "5", label: "교통사고 유자녀 가정" },
            { id: "6", label: "부도 공공임대 퇴거자" },
            { id: "7", label: "영구임대 퇴거자" },
            { id: "8", label: "주거 취약계층/긴급 주거지원 대상자" },
            { id: "9", label: "산단 근로자" },
            { id: "10", label: "보증거절자" },
          ],
          multiselect: 10,
        },
        storeKey: "specialEligibilityTypes",
      },
    ],
    validation: data => {
      // 선택 필수는 아니므로 항상 통과
      return null;
    },
    getNextStep: data => {
      const isMarried = data.marriageStatus === "1";
      const hasChildren = data.hasRegisteredChildren === "1" || data.hasSpouseChildren === "1";
      // 미혼 + 자녀없음 → adultSingle001
      if (!isMarried && !hasChildren) {
        return "adultSingle001";
      }
      // 기혼 or 미혼 + 자녀있음 → adultMarried001
      return "adultMarried001";
    },
  },

  //  common age 001
  {
    id: "commonAge001",
    groupId: "identityInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "다음 중 해당되는 사항이 있다면 모두 선택해 주세요",
          description: "복수 선택 가능",
          options: [
            { id: "1", label: "국가 유공자 본인/가구" },
            { id: "2", label: "위안부 피해자 본인/가구" },
            { id: "3", label: "북한이탈주민 본인" },
            { id: "4", label: "장애인 등록자/장애인 가구" },
            { id: "5", label: "교통사고 유자녀 가정" },
            { id: "6", label: "부도 공공임대 퇴거자" },
            { id: "7", label: "영구임대 퇴거자" },
            { id: "8", label: "주거 취약계층/긴급 주거지원 대상자" },
            { id: "9", label: "산단 근로자" },
            { id: "10", label: "보증거절자" },
          ],
          multiselect: 10,
        },
        storeKey: "specialEligibilityTypes",
      },
    ],
    validation: data => {
      // 선택 필수는 아니므로 항상 통과
      return null;
    },
    getNextStep: data => {
      const isMarried = data.marriageStatus === "1";
      const hasChildren = data.hasRegisteredChildren === "1" || data.hasSpouseChildren === "1";
      // 미혼 + 자녀없음 → adultSingle001
      if (!isMarried && !hasChildren) {
        return "adultSingle001";
      }
      // 기혼 or 미혼 + 자녀있음 → adultMarried001
      return "adultMarried001";
    },
  },

  // adult single 001 - 중장년 미혼 세대주/세대원 여부
  {
    id: "adultSingle001",
    groupId: "assetInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "마지막으로 우리집 가구원들의 자산과 청약 조건을 알아볼게요!",
          description: "",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "나는 세대주인가요 세대원인가요?",
          options: [
            { id: "1", label: "세대주" },
            { id: "2", label: "세대원" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "householdRole",
      },
      {
        type: "infoButton",
        props: {
          title: "세대주, 세대원의 차이가 궁금하다면?",
          description: "",
          sheetContentType: "house",
        },
      },
    ],
    validation: data => {
      if (!data.householdRole) {
        return "세대주/세대원 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: () => {
      // 세대 구성 단계로 이동
      return "adultSingle002";
    },
  },

  // adult single 002 - 중장년 미혼 세대 구성
  {
    id: "adultSingle002",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "우리집 세대는 어떻게 구성되나요?",
          options: [
            { id: "1", label: "1인 가구에요" },
            { id: "2", label: "가족과 함께 살고있어요" },
            { id: "3", label: "공동생활가정(그룹홈)에 거주 중이에요" },
          ],
          required: true,
        },
        storeKey: "householdComposition",
      },
    ],
    validation: data => {
      if (!data.householdComposition) {
        return "세대 구성을 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      return "adultSingle002_2";
    },
  },

  // adult single 002-2 - 중장년 미혼 주택 소유 여부 및 무주택 기간
  {
    id: "adultSingle002_2",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "주택을 소유하고 있나요?",
          description: "유주택자의 경우 대부분의 공공임대 지원이 제한됩니다",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasOwnHousing",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "무주택 기간을 알려주세요",
              options: [
                {
                  id: "housingDisposalYears",
                  prefix: "주택을 처분한지 만",
                  postfix: "년이 지났어요",
                  placeholder: "0",
                },
              ],
            },
            storeKey: "housingDisposalYears",
            showWhen: data => {
              return data.hasOwnHousing === "2";
            },
          },
          {
            type: "checkbox",
            props: {
              label: "한 번도 주택을 소유한 적이 없어요",
            },
            storeKey: "hasNeverOwnedHousing",
            showWhen: data => {
              return data.hasOwnHousing === "2";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasOwnHousing) {
        return "주택 소유 여부를 선택해주세요";
      }
      // 주택을 소유하지 않은 경우, 무주택 기간 또는 체크박스 중 하나는 입력되어야 함
      if (data.hasOwnHousing === "2") {
        if (
          !data.hasNeverOwnedHousing &&
          (!data.housingDisposalYears || data.housingDisposalYears === "0")
        ) {
          return "무주택 기간을 입력하거나 체크박스를 선택해주세요";
        }
      }
      return null;
    },
    getNextStep: data => {
      // 토지 소유 및 총자산 단계로 이동
      return "adultSingle002_3";
    },
  },

  // adult single 002-3 - 중장년 미혼 총자산
  {
    id: "adultSingle002_3",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "총자산 금액이 3억 3천 7백만원 이하인가요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "isTotalAssetUnder337Million",
      },
      {
        type: "infoButton",
        props: {
          title: "총자산 계산법이 궁금하다면?",
          description: "",
          sheetContentType: "asset",
        },
      },
    ],
    validation: data => {
      if (!data.isTotalAssetUnder337Million) {
        return "총자산 금액 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: () => {
      return null;
    },
  },

  // adult single 004-1 - 중장년 미혼 가구원 주택 소유 여부 및 무주택 기간
  {
    id: "adultSingle004_1",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "우리 집의 주택 소유 여부를 알려주세요",
          description: "유주택자의 경우 대부분의 공공임대 지원이 제한됩니다",
          options: [
            { id: "1", label: "나는 무주택자지만 가구원 중 주택 소유자가 있어요" },
            { id: "2", label: "우리 집 가구원 모두 주택을 소유하고 있지 않아요" },
            { id: "3", label: "주택을 소유하고 있어요" },
          ],
          required: true,
        },
        storeKey: "householdHousingOwnershipStatus",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "무주택 기간을 알려주세요",
              options: [
                {
                  id: "housingDisposalYears",
                  prefix: "주택을 처분한지 만",
                  postfix: "년이 지났어요",
                  placeholder: "0",
                },
              ],
            },
            storeKey: "housingDisposalYears",
            showWhen: data => {
              return data.householdHousingOwnershipStatus === "2";
            },
          },
          {
            type: "checkbox",
            props: {
              label: "한 번도 주택을 소유한 적이 없어요",
            },
            storeKey: "hasNeverOwnedHousing",
            showWhen: data => {
              return data.householdHousingOwnershipStatus === "2";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.householdHousingOwnershipStatus) {
        return "주택 소유 여부를 선택해주세요";
      }
      // "우리 집 가구원 모두 주택을 소유하고 있지 않아요" 선택 시, 무주택 기간 또는 체크박스 중 하나는 입력되어야 함
      if (data.householdHousingOwnershipStatus === "2") {
        if (
          !data.hasNeverOwnedHousing &&
          (!data.housingDisposalYears || data.housingDisposalYears === "0")
        ) {
          return "무주택 기간을 입력하거나 체크박스를 선택해주세요";
        }
      }
      return null;
    },
    getNextStep: data => {
      // 가구원 자동차 및 총자산 단계로 이동
      return "adultSingle005_1";
    },
  },

  // adult single 005-1 - 중장년 미혼 가구원 자동차 소유 및 총자산
  {
    id: "adultSingle005_1",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "가구원중 자동차를 소유하고 있는 사람이 있나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasHouseholdCar",
        children: [
          {
            type: "priceInput",
            props: {
              title: "자동차 자산 가액 정보를 알려주세요",
              description: "*두대 이상일 경우 총 합산 금액을 입력해주세요",
              placeholder: "0",
            },
            storeKey: "householdCarAssetValue",
            showWhen: data => {
              return data.hasHouseholdCar === "1";
            },
          },
        ],
      },
      {
        type: "infoButton",
        props: {
          title: "인정되는 자동차 기준이 궁금하다면?",
          description: "",
          sheetContentType: "car",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "가구원의 총자산 금액이 3억 3천 7백만원 이하인가요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "isHouseholdTotalAssetUnder337Million",
      },
      {
        type: "infoButton",
        props: {
          title: "총자산 계산법이 궁금하다면?",
          description: "",
          sheetContentType: "asset",
        },
      },
    ],
    validation: data => {
      if (!data.hasHouseholdCar) {
        return "가구원 중 자동차 소유 여부를 선택해주세요";
      }
      // 자동차를 소유한 경우 자산가액 입력 필수
      if (
        data.hasHouseholdCar === "1" &&
        (!data.householdCarAssetValue || data.householdCarAssetValue === "0")
      ) {
        return "자동차 자산가액을 입력해주세요";
      }
      if (!data.isHouseholdTotalAssetUnder337Million) {
        return "가구원의 총자산 금액 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 다음 단계로 이동 (추후 결정)
      return null;
    },
  },

  // adult married 001 - 중장년 기혼 세대주/세대원 여부
  {
    id: "adultMarried001",
    groupId: "assetInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "마지막으로 우리집 가구원들의 자산과 청약 조건을 알아볼게요!",
          description: "",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "나는 세대주인가요 세대원인가요?",
          options: [
            { id: "1", label: "세대주" },
            { id: "2", label: "세대원" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "householdRole",
      },
      {
        type: "infoButton",
        props: {
          title: "세대주, 세대원의 차이가 궁금하다면?",
          description: "",
          sheetContentType: "house",
        },
      },
    ],
    validation: data => {
      if (!data.householdRole) {
        return "세대주/세대원 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 다음 단계로 이동 (추후 결정)
      return "adultMarried002";
    },
  },

  // adult married 002 - 중장년 기혼 세대 구성
  {
    id: "adultMarried002",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "우리집 세대는 어떻게 구성되나요?",
          description:
            "기혼일 경우 배우자와 분리된 세대에 거주하더라도 같은 세대로 간주합니다. 자녀는 같은 등본상에 등록되어있어야합니다.",
          options: [
            { id: "1", label: "1인가구에요" },
            { id: "2", label: "가족과 함께 살고있어요" },
          ],
          required: true,
        },
        storeKey: "householdComposition",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "나의 세대 구성원을 자세히 알려주세요",
              options: [
                {
                  id: "expectedBirth",
                  prefix: "출산예정",
                  postfix: "명",
                  placeholder: "0",
                },
                {
                  id: "under6",
                  prefix: "6세이하 자녀 수",
                  postfix: "명",
                  placeholder: "0",
                },
                {
                  id: "over7",
                  prefix: "7세이상 미성년 자녀 수",
                  postfix: "명",
                  placeholder: "0",
                },
              ],
              summary: (values: Record<string, string>) => {
                const expectedBirth = values.expectedBirth ? Number(values.expectedBirth) || 0 : 0;
                const under6 = values.under6 ? Number(values.under6) || 0 : 0;
                const over7 = values.over7 ? Number(values.over7) || 0 : 0;
                // 본인 + 배우자(기혼이므로) + 자녀들
                const total = 2 + expectedBirth + under6 + over7;
                return `우리집은 총 ${total} 인가구에요`;
              },
            },
            storeKey: "marriedHouseholdChildrenInfo",
            showWhen: data => {
              return data.householdComposition === "2";
            },
          },
          {
            type: "optionSelector",
            props: {
              title: "다음 중 해당되는 사항이 있다면 모두 선택해주세요",
              description: "복수 선택 가능",
              options: [
                { id: "1", label: "노부모를 1년이상 부양중이에요" },
                { id: "2", label: "조손가족이에요" },
              ],
              multiselect: 2,
            },
            storeKey: "marriedHouseholdFamilyTypes",
            showWhen: data => {
              return data.householdComposition === "2";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.householdComposition) {
        return "세대 구성을 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 주택 소유 여부 단계로 이동
      return "adultMarried002_2";
    },
  },

  // adult married 002-2 - 중장년 기혼 주택 소유 여부 및 무주택 기간
  {
    id: "adultMarried002_2",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "주택을 소유하고 있나요?",
          description: "유주택자의 경우 대부분의 공공임대 지원이 제한됩니다",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasOwnHousing",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "무주택 기간을 알려주세요",
              options: [
                {
                  id: "housingDisposalYears",
                  prefix: "주택을 처분한지 만",
                  postfix: "년이 지났어요",
                  placeholder: "0",
                },
              ],
            },
            storeKey: "housingDisposalYears",
            showWhen: data => {
              return data.hasOwnHousing === "2";
            },
          },
          {
            type: "checkbox",
            props: {
              label: "한번도 주택을 소유한적이 없어요",
            },
            storeKey: "hasNeverOwnedHousing",
            showWhen: data => {
              return data.hasOwnHousing === "2";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.hasOwnHousing) {
        return "주택 소유 여부를 선택해주세요";
      }
      // 주택을 소유하지 않은 경우, 무주택 기간 또는 체크박스 중 하나는 입력되어야 함
      if (data.hasOwnHousing === "2") {
        if (
          !data.hasNeverOwnedHousing &&
          (!data.housingDisposalYears || data.housingDisposalYears === "0")
        ) {
          return "무주택 기간을 입력하거나 체크박스를 선택해주세요";
        }
      }
      return null;
    },
    getNextStep: data => {
      // 토지 및 금융자산 단계로 이동
      return "adultMarried002_4";
    },
  },

  // adult married 002-4 - 중장년 기혼 토지 소유 및 금융자산
  {
    id: "adultMarried002_4",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "토지를 소유하고 있나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasOwnLand",
        children: [
          {
            type: "priceInput",
            props: {
              title: "토지 자산 금액 정보를 알려주세요",
              description: "*두대 이상일 경우 총 합산 금액을 입력해주세요",
              placeholder: "0",
            },
            storeKey: "landAssetValue",
            showWhen: data => {
              return data.hasOwnLand === "1";
            },
          },
        ],
      },
      {
        type: "infoButton",
        props: {
          title: "인정되는 토지 기준이 궁금하다면?",
          description: "",
        },
      },
      {
        type: "priceInput",
        props: {
          title: "내 금융자산 총 합 금액을 알려주세요",
          placeholder: "0",
        },
        storeKey: "financialAssetValue",
      },
      {
        type: "infoButton",
        props: {
          title: "금융자산 기준이 궁금하다면?",
          description: "",
        },
      },
    ],
    validation: data => {
      if (!data.hasOwnLand) {
        return "토지 소유 여부를 선택해주세요";
      }
      // 토지를 소유한 경우 자산 금액 입력 필수
      if (data.hasOwnLand === "1" && (!data.landAssetValue || data.landAssetValue === "0")) {
        return "토지 자산 금액을 입력해주세요";
      }
      if (!data.financialAssetValue || data.financialAssetValue === "0") {
        return "금융자산 총 합 금액을 입력해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 가구원 주택 소유 여부 단계로 이동
      return "adultMarried004_1";
    },
  },

  // adult married 004-1 - 중장년 기혼 가구원 주택 소유 여부 및 무주택 기간
  {
    id: "adultMarried004_1",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "우리집의 주택소유 여부를 알려주세요",
          description: "*유주택자의 경우 대부분의 공공임대 지원이 제한됩니다.",
          options: [
            { id: "1", label: "나는 무주택자지만 가구원중 주택 소유자가 있어요" },
            { id: "2", label: "우리집 가구원 모두 주택을 소유하고 있지 않아요" },
            { id: "3", label: "주택을 소유하고 있어요" },
          ],
          required: true,
        },
        storeKey: "householdHousingOwnershipStatus",
        children: [
          {
            type: "numberInputList",
            props: {
              title: "무주택 기간을 알려주세요",
              options: [
                {
                  id: "housingDisposalYears",
                  prefix: "주택을 처분한지 만",
                  postfix: "년이 지났어요",
                  placeholder: "0",
                },
              ],
            },
            storeKey: "housingDisposalYears",
            showWhen: data => {
              return data.householdHousingOwnershipStatus === "2";
            },
          },
          {
            type: "checkbox",
            props: {
              label: "한번도 주택을 소유한적이 없어요",
            },
            storeKey: "hasNeverOwnedHousing",
            showWhen: data => {
              return data.householdHousingOwnershipStatus === "2";
            },
          },
        ],
      },
    ],
    validation: data => {
      if (!data.householdHousingOwnershipStatus) {
        return "주택 소유 여부를 선택해주세요";
      }
      // "우리집 가구원 모두 주택을 소유하고 있지 않아요" 선택 시, 무주택 기간 또는 체크박스 중 하나는 입력되어야 함
      if (data.householdHousingOwnershipStatus === "2") {
        if (
          !data.hasNeverOwnedHousing &&
          (!data.housingDisposalYears || data.housingDisposalYears === "0")
        ) {
          return "무주택 기간을 입력하거나 체크박스를 선택해주세요";
        }
      }
      return null;
    },
    getNextStep: data => {
      // 가구원 토지 및 자동차, 금융자산 단계로 이동
      return "adultMarried005_1";
    },
  },

  // adult married 005-1 - 중장년 기혼 가구원 토지, 자동차 및 금융자산
  {
    id: "adultMarried005_1",
    groupId: "assetInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "가구원중 토지를 소유하고 있는 사람이 있나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasHouseholdLand",
      },
      {
        type: "infoButton",
        props: {
          title: "인정되는 토지 기준이 궁금하다면?",
          description: "",
        },
      },
      {
        type: "optionSelector",
        props: {
          title: "가구원중 자동차를 소유하고 있는 사람이 있나요?",
          options: [
            { id: "1", label: "예" },
            { id: "2", label: "아니오" },
          ],
          required: true,
          direction: "horizontal",
        },
        storeKey: "hasHouseholdCar",
        children: [
          {
            type: "priceInput",
            props: {
              title: "자동차 자산 가액 정보를 알려주세요",
              description: "*두대 이상일 경우 총 합산 금액을 입력해주세요",
              placeholder: "0",
            },
            storeKey: "householdCarAssetValue",
            showWhen: data => {
              return data.hasHouseholdCar === "1";
            },
          },
        ],
      },
      {
        type: "infoButton",
        props: {
          title: "인정되는 자동차 기준이 궁금하다면?",
          description: "",
          sheetContentType: "car",
        },
      },
      {
        type: "priceInput",
        props: {
          title: "가구원의 금융자산 총합 금액을 알려주세요",
          placeholder: "0",
        },
        storeKey: "householdFinancialAssetValue",
      },
      {
        type: "infoButton",
        props: {
          title: "금융자산 기준이 궁금하다면?",
          description: "",
        },
      },
    ],
    validation: data => {
      if (!data.hasHouseholdLand) {
        return "가구원 중 토지 소유 여부를 선택해주세요";
      }
      if (!data.hasHouseholdCar) {
        return "가구원 중 자동차 소유 여부를 선택해주세요";
      }
      // 자동차를 소유한 경우 자산가액 입력 필수
      if (
        data.hasHouseholdCar === "1" &&
        (!data.householdCarAssetValue || data.householdCarAssetValue === "0")
      ) {
        return "자동차 자산가액을 입력해주세요";
      }
      if (!data.householdFinancialAssetValue || data.householdFinancialAssetValue === "0") {
        return "가구원의 금융자산 총합 금액을 입력해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 다음 단계로 이동 (추후 결정)
      return null;
    },
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
export const FIRST_STEP_ID: StepId = "basicInfo001";
