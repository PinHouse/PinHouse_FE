import { Alram } from "@/src/assets/icons/home";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/Alram",
  component: Alram,
  tags: ["autodocs"],
} satisfies Meta<typeof Alram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
