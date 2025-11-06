import { SearchPin } from "@/src/assets/icons/onboarding";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/SearchPin",
  component: SearchPin,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
