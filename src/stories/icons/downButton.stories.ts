import { DownButton } from "@/src/assets/icons/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/DownIcon",
  component: DownButton,
  tags: ["autodocs"],
} satisfies Meta<typeof DownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
