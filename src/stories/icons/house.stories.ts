import { House } from "@/src/assets/icons/onboarding";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/House",
  component: House,
  tags: ["autodocs"],
} satisfies Meta<typeof House>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
