import { OnOffFalse } from "@/src/assets/icons/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/onOffFalse",
  component: OnOffFalse,
  tags: ["autodocs"],
} satisfies Meta<typeof OnOffFalse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
