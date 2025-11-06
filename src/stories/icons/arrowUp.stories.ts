import { ArrowUp } from "@/src/assets/icons/home";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/ArrowUp",
  component: ArrowUp,
  tags: ["autodocs"],
} satisfies Meta<typeof ArrowUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
