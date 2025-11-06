import type { Meta, StoryObj } from "@storybook/react";
import { MapPin } from "lucide-react";

const meta = {
  title: "Icons/MapPin",
  component: MapPin,
  tags: ["autodocs"],
} satisfies Meta<typeof MapPin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
