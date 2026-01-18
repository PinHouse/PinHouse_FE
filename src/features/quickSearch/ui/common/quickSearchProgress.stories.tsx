import type { Meta, StoryObj } from "@storybook/react";
import { QuickSearchProgressBar } from "./quickSearchProgressBar";

const meta: Meta<typeof QuickSearchProgressBar> = {
  title: "features/quickSearch/ui/quickSearchProgressBar",
  component: QuickSearchProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof QuickSearchProgressBar>;

// 공통 템플릿
// const Template = (args: Story["args"]) => <AddressButton {...args} />;

// 기본 상태
export const Default: Story = {
  args: {
    progress: 25,
  },
};

// 진행률이 있는 상태
export const WithProgress: Story = {
  args: {
    progress: 50,
  },
};
