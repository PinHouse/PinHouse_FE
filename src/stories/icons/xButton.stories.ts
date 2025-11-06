import { XButton } from "@/src/assets/icons/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/xButton",
  component: XButton,
  tags: ["autodocs"],
} satisfies Meta<typeof XButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
