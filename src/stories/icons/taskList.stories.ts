import { TaskList } from "@/src/assets/icons/onboarding";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/TaskList",
  component: TaskList,
  tags: ["autodocs"],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
