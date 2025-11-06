import { HomeIcon } from "@/src/assets/icons/home";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/HomeIcon",
  component: HomeIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof HomeIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
