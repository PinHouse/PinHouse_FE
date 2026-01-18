import { LeftButton } from "@/src/assets/icons/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/leftIcon",
  component: LeftButton,
  tags: ["autodocs"],
} satisfies Meta<typeof LeftButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
