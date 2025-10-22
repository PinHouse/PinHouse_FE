import { House, MapPin, RentalProperty } from "@/src/assets/icons/onboarding";
import { TaskList } from "@/src/assets/icons/onboarding/TaskList";

export interface OnboardingSectionProps {
  image: React.ReactNode;
  title: string;
  description: string;
  type?: string;
}

export type OnboardingDotProps = {
  activeKey?: string;
  className?: string;
};

export const onboardingContentMap = {
  diagnosis: {
    Icon: TaskList,
    title: "진단하기",
    path: "/onboarding/diagnosis",
    description: "소득,계층,자산정보를 입력하면 \n 공공임대주택 지원자격을 분석해 드려요!",
  },
  compare: {
    Icon: RentalProperty,
    title: "방 비교",
    path: "/onboarding/compare",
    description: "공고에 있는 수많은 방 타입을 \n 한눈에 비교해 보세요!",
  },
  agent: {
    Icon: MapPin,
    title: "핀포인트 설정",
    path: "/onboarding/agent",
    description: "나만의 핀포인트를 찍고 \n 원하는 거리 안의 임재주택을 찾아보세요!",
  },
  environment: {
    Icon: House,
    title: "주변환경",
    path: "/onboarding/environment",
    description: "맞춤 태그로 라이프 스타일에 맞는 \n 임대주택을 찾아보세요!",
  },
} as const;

export const ONBOARDING_STEPS = [
  {
    key: "diagnosis",
    path: "/onboarding/diagnosis",
  },
  {
    key: "compare",
    path: "/onboarding/compare",
  },
  {
    key: "agent",
    path: "/onboarding/agent",
  },
  {
    key: "environment",
    path: "/onboarding/environment",
  },
] as const;
