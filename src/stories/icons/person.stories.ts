import { PersonLine } from "@/src/assets/icons/home";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/Person",
  component: PersonLine,
  tags: ["autodocs"],
} satisfies Meta<typeof PersonLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
