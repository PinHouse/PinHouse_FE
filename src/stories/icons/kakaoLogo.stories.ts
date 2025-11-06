import { KakaoLogo } from "@/src/assets/icons/button/kakaoLogo";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/KakaoLogo",
  component: KakaoLogo,
  tags: ["autodocs"],
} satisfies Meta<typeof KakaoLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
