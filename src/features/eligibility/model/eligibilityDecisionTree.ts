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
 */
export const eligibilityDecisionTree: StepConfig[] = [
  // basic info 001
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

  // basic info 002
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

  // underage 001
  {
    id: "minorEligibility",
    groupId: "personalInfo",
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
      // "해당사항이 없어요" 선택 시 종료
      if (data.minorEligibilityType === "0") {
        return null; // 검증 통과하지만 다음 단계는 null로 종료
      }
      return null;
    },
    getNextStep: data => {
      // 미성년자 자격 확인 단계 종료
      if (data.minorEligibilityType) {
        return "diagnosisEnd";
      }
      return null;
    },
  },

  // adult 001 + adult 001-2
  {
    id: "marriageStatus",
    groupId: "personalInfo",
    components: [
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
        type: "optionSelector",
        props: {
          title: "혼인기간이 어떻게되나요?",
          options: [
            { id: "0", label: "1년 미만" },
            { id: "1", label: "1년 이상 3년 미만" },
            { id: "3", label: "3년 이상 5년 미만" },
            { id: "5", label: "5년 이상 7년 미만" },
            { id: "7", label: "7년 이상" },
          ],
          required: true,
          direction: "vertical",
        },
        storeKey: "marriagePeriod",
        showWhen: data => data.marriageStatus === "1",
      },
    ],
    validation: data => {
      if (!data.marriageStatus) {
        return "결혼 여부를 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      // 결혼 예정이거나 결혼한 경우에만 혼인기간 질문으로 이동
      if (data.marriageStatus === "2") {
        return "hasRegisteredChildren";
      }
      if (data.marriageStatus === "1" && data.marriagePeriod) {
        return "marriagePeriod";
      }
      return null;
    },
  },

  // 2-2. 혼인기간 (신혼부부 판단)
  {
    id: "marriagePeriod",
    groupId: "personalInfo",
    components: [
      {
        type: "optionSelector",
        props: {
          title: "혼인기간이 어떻게되나요?",
          options: [
            { id: "0", label: "1년 미만" },
            { id: "1", label: "1년 이상 3년 미만" },
            { id: "3", label: "3년 이상 5년 미만" },
            { id: "5", label: "5년 이상 7년 미만" },
            { id: "7", label: "7년 이상" },
          ],
          required: true,
          direction: "vertical",
        },
        storeKey: "marriagePeriod",
      },
    ],
    validation: data => {
      if (!data.marriagePeriod) {
        return "혼인기간을 선택해주세요";
      }
      return null;
    },
    getNextStep: data => {
      return "hasRegisteredChildren";
    },
  },

  // adult 002
  {
    id: "hasRegisteredChildren",
    groupId: "personalInfo",
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
                const under6 = Number(values.under6 || 0);
                const over7 = Number(values.over7 || 0);
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
        return "youthInfo";
      }

      // 2. 미혼+중장년 (40~64세, 미혼)
      if (isSingle && age >= 40 && age < 65) {
        return "adultInfo";
      }

      // 3. 청년+중장년 기혼 (19~64세, 기혼) + 고령자(65세 이상, 미혼+기혼)
      if (isMarried || age >= 65) {
        return "specialEligibility";
      }

      // 기본값
      return null;
    },
  },

  // adult 001-3
  {
    id: "hasSpouseChildren",
    groupId: "personalInfo",
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
                const under6 = Number(values.under6 || 0);
                const over7 = Number(values.over7 || 0);
                const total = under6 + over7;
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
    getNextStep: data => {
      if (data.hasSpouseChildren === "1") {
        return "hasRegisteredChildren";
      }
      return null;
    },
  },

  // basic info 003
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
    getNextStep: data => {
      return "assetInfo";
    },
  },

  // middle age 001
  {
    id: "incomeWorkPeriod",
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
              return data.hasIncomeWorkWithin5Years === "1";
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
    getNextStep: data => {
      // 특별 자격 요건(취약계층 판단)으로 이동
      return "specialEligibility";
    },
  },

  // common 001
  {
    id: "specialEligibility",
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
      // 자산 정보로 이동
      return "assetInfo";
    },
  },

  // basic info 004
  {
    id: "assetInfo",
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
    getNextStep: data => {
      // 19세 미만이면 미성년자 자격 확인 단계로 이동
      const age = calculateAge(data.birthDate);
      if (age === null) return null;
      if (age < 19) {
        return "minorEligibility";
      }
      return "marriageStatus";
    },
  },

  // 5. 미성년자 정보
  {
    id: "minorInfo",
    groupId: "personalInfo",
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

  // 11. 진단종료
  {
    id: "diagnosisEnd",
    groupId: "personalInfo",
    components: [
      {
        type: "statusBanner",
        props: {
          title: "진단이 종료되었습니다",
          description: "",
        },
      },
    ],
    validation: () => "진단종료",
    getNextStep: () => null,
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
