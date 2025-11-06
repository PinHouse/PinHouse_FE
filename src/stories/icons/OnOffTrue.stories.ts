import { OnOffTrue } from "@/src/assets/icons/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/onOffTrue",
  component: OnOffTrue,
  tags: ["autodocs"],
} satisfies Meta<typeof OnOffTrue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
