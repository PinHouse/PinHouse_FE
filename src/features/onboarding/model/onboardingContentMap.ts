import { LoadingPin, MapPin, RentalProperty } from "@/src/assets/icons/onboarding";
import { TaskList } from "@/src/assets/icons/onboarding/TaskList";

export const onboardingContentMap = {
  compare: {
    Icon: RentalProperty,
    title: "방 비교",
    description: "공고에 있는 수많은 방 타입을 한눈에 비교해 보세요!",
  },
  diagnosis: {
    Icon: TaskList,
    title: "진단하기",
    description: "나에게 맞는 조건을 선택하고 맞춤형 방을 진단해보세요!",
  },
  agent: {
    Icon: MapPin,
    title: "핀포인트 설정",
    description: "가까운 공인중개사와 빠르게 연결해 보세요!",
  },
} as const;
