import { SearchLine } from "@/src/assets/icons/home";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/Search",
  component: SearchLine,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
