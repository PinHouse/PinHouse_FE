import { LoadingPin } from "@/src/assets/icons/onboarding";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/LoadingPin",
  component: LoadingPin,
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
