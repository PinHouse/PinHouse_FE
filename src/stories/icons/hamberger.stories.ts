import { Hambarger } from "@/src/assets/icons/home";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/Hambarger",
  component: Hambarger,
  tags: ["autodocs"],
} satisfies Meta<typeof Hambarger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
