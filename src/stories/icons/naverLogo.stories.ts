import { NaverLogo } from "@/src/assets/icons/button/naverLogo";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/naverLogo",
  component: NaverLogo,
  tags: ["autodocs"],
} satisfies Meta<typeof NaverLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
