import { CloseButton } from "@/src/assets/icons/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/CloseIcon",
  component: CloseButton,
  tags: ["autodocs"],
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
