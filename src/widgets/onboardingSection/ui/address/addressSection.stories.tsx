import type { Meta, StoryObj } from "@storybook/react";
import { AddresWidgets } from "./addressSection";

const meta: Meta<typeof AddresWidgets> = {
  title: "Widgets/Onboarding/AddressSection",
  component: AddresWidgets,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
