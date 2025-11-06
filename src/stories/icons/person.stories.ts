import { Person } from "@/src/assets/icons/home";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/Person",
  component: Person,
  tags: ["autodocs"],
} satisfies Meta<typeof Person>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
