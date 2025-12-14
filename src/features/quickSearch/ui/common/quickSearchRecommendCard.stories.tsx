import type { Meta, StoryObj } from "@storybook/react";
import { QuickSearchRecommendCard } from "./quickSearchRecommendCard";

const meta: Meta<typeof QuickSearchRecommendCard> = {
  title: "features/quickSearch/ui/common/quickSearchRecommendCard",
  component: QuickSearchRecommendCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof QuickSearchRecommendCard>;

export const Default: Story = {
  args: {
    tag: "대학생",
    complexName: "단지 이름 최대 한줄 넘어가면 자동으로 잘려서 표시됩니다",
    distanceHours: 0,
    distanceMinutes: 0,
    deposit: 0,
    monthlyRent: 0,
    exclusiveArea: 0,
    recruitmentUnits: 0,
    infrastructureTags: ["인프라", "인프라", "인프라", "인프라", "인프라"],
    onGoToAnnouncement: () => console.log("공고 바로가기 클릭"),
  },
};

export const WithAllData: Story = {
  args: {
    tag: "대학생",
    complexName: "서울시 강남구 역삼동 아파트",
    distanceHours: 1,
    distanceMinutes: 30,
    deposit: 5000,
    monthlyRent: 50,
    exclusiveArea: 30,
    recruitmentUnits: 100,
    infrastructureTags: ["지하철", "버스", "학교", "병원", "마트"],
    onGoToAnnouncement: () => console.log("공고 바로가기 클릭"),
  },
};

export const WithoutTag: Story = {
  args: {
    complexName: "단지 이름",
    distanceHours: 0,
    distanceMinutes: 15,
    deposit: 3000,
    monthlyRent: 30,
    exclusiveArea: 25,
    recruitmentUnits: 50,
    infrastructureTags: ["인프라1", "인프라2"],
  },
};
