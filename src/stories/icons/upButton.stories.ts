import { UpButton } from "@/src/assets/icons/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/upButton",
  component: UpButton,
  tags: ["autodocs"],
} satisfies Meta<typeof UpButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
