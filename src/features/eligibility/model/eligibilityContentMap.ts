import { EligibilityStep } from "../ui/common/eligibilityStepper";
import { eligibilityDecisionTree } from "./eligibilityDecisionTree";

export interface EligibilityStepContent {
  path: string;
  groupId: string; // EligibilityStepper에서 사용할 그룹 ID (개인정보, 신분정보, 자산정보)
}

// 단계 키 상수 - deprecated (결정트리 사용)
export const ELIGIBILITY_STEP_KEYS = {
  BASIC_INFO_STEP_1: "basicInfoStep1",
  BASIC_INFO_STEP_2: "basicInfoStep2",
  BASIC_INFO_STEP_3: "basicInfoStep3",
  BASIC_INFO_STEP_4: "basicInfoStep4",
} as const;

// 그룹 ID 상수 - Stepper에서 사용
export const ELIGIBILITY_GROUP_IDS = {
  PERSONAL_INFO: "personalInfo", // 개인정보
  IDENTITY_INFO: "identityInfo", // 신분정보
  ASSET_INFO: "assetInfo", // 자산정보
  DIAGNOSIS_END: "diagnosisEnd", // 진단종료
} as const;

// 결정트리에서 path 정보 생성 (하위 호환성 유지)
export const eligibilityContentMap = eligibilityDecisionTree.reduce(
  (acc, step) => {
    acc[step.id] = {
      path: `/eligibility?step=${step.id}`,
      groupId: step.groupId,
    };
    return acc;
  },
  {} as Record<string, EligibilityStepContent>
);

// Stepper에 표시될 그룹 단계들
export const ELIGIBILITY_STEPS: EligibilityStep[] = [
  {
    id: ELIGIBILITY_GROUP_IDS.PERSONAL_INFO,
    label: "개인정보",
  },
  {
    id: ELIGIBILITY_GROUP_IDS.IDENTITY_INFO,
    label: "신분정보",
  },
  {
    id: ELIGIBILITY_GROUP_IDS.ASSET_INFO,
    label: "자산정보",
  },
  {
    id: ELIGIBILITY_GROUP_IDS.DIAGNOSIS_END,
    label: "진단종료",
  },
];
