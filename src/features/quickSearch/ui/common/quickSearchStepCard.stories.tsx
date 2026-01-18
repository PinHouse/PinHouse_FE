import type { Meta, StoryObj } from "@storybook/react";
import quickSearchStepCard from "./quickSearchStepCard";

const meta: Meta<typeof quickSearchStepCard> = {
  title: "features/quickSearch/ui/quickSearchStepCard",
  component: quickSearchStepCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof quickSearchStepCard>;

// 공통 템플릿
// const Template = (args: Story["args"]) => <AddressButton {...args} />;

// 기본 상태
export const Default: Story = {
  args: {
    title: "탐색할 핀포인트를 선택해 주세요",
    description: "핀포인트는 방을 추천받을 기준이 되는 위치예요",
    isFillAll: true,
    boldRange: [0, 0],
  },
};
export const choosePinPoint: Story = {
  args: {
    title: "탐색할 핀포인트를 선택해 주세요",
    description: "핀포인트는 방을 추천받을 기준이 되는 위치예요",
    isFillAll: true,
    boldRange: [0, 0],
  },
};
export const chooseDistance: Story = {
  args: {
    title: "탐색할 거리 범위를 설정해 주세요",
    description: "대중교통 이용 시 소요시간 기준이예요",
    isFillAll: true,
    boldRange: [0, 0],
  },
};

export const chooseLivingNumber: Story = {
  args: {
    title: "거주 인원을 선택해 주세요",
    isFillAll: false,
    boldRange: [0, 0],
  },
};

export const chooseRoomSize: Story = {
  args: {
    title: "원하는 방 크기 범위를 입력해 주세요",
    description: "다음은 선택하신 1인 가구 기준 평수 범위예요",
    isFillAll: false,
    boldRange: [9, 13],
  },
};

export const chooseBudget: Story = {
  args: {
    title: "보증금과 월세 예산을 입력해 주세요",
    description: "서울시 13평 임대주택 평균 보증금 금액이예요",
    isFillAll: false,
    boldRange: [0, 7],
  },
};

export const chooseEnvironment: Story = {
  args: {
    title: "원하는 주변 환경을 선택해 주세요",
    description: "최대 5개까지 선택할 수 있어요",
    isFillAll: false,
    boldRange: [0, 4],
  },
};
export const chooseHomeType: Story = {
  args: {
    title: "원하는 집을 선택해 주세요",
    description: "주택 및 임대 유형을 선택해 주세요 ",
    isFillAll: false,
    boldRange: [0, 9],
  },
};
export const chooseCondition: Story = {
  args: {
    title: "나에게 맞는 조건을 선택해보세요",
    isFillAll: false,
    boldRange: [0, 0],
  },
};
