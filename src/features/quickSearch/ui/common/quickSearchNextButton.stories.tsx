import type { Meta, StoryObj } from "@storybook/react";
import { QuickSearchNextButton } from "./quickSearchNextButton";

const meta: Meta<typeof QuickSearchNextButton> = {
  title: "features/quickSearch/ui/quickSearchNextButton",
  component: QuickSearchNextButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof QuickSearchNextButton>;

// 공통 템플릿
// const Template = (args: Story["args"]) => <AddressButton {...args} />;

// 기본 상태
export const Default: Story = {
  args: {},
};
