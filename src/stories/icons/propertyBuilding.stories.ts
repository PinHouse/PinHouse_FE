import { RentalProperty } from "@/src/assets/icons/onboarding";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/RentalProperty",
  component: RentalProperty,
  tags: ["autodocs"],
} satisfies Meta<typeof RentalProperty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
