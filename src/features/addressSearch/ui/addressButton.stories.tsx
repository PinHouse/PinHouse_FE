import type { Meta, StoryObj } from "@storybook/react";
import { AddressButton } from "./addressButton";

const meta: Meta<typeof AddressButton> = {
  title: "features/addressSearch/ui/addressButton",
  component: AddressButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AddressButton>;

// 공통 템플릿
// const Template = (args: Story["args"]) => <AddressButton {...args} />;

// 기본 상태
export const Default: Story = {
  args: {},
};

// 예시 주소가 있는 상태
export const WithAddress: Story = {
  args: {
    address: "경기도 성남시 분당구 분당동",
  },
};
