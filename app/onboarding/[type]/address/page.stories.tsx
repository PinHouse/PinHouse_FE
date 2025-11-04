import type { Meta, StoryObj } from "@storybook/react";
import AddressPage from "./page";

const meta: Meta<typeof AddressPage> = {
  title: "Pages/Onboarding/AddressPage",
  component: AddressPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
        온보딩 "핀포인트 설정" 단계에서 주소 검색으로 진입한 화면입니다.  
        Next.js App Router의 /onboarding/agent/address 페이지를 재현합니다.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const AgentAddress: Story = {
  parameters: {
    pathname: "/onboarding/[type]/address",
    asPath: "/onboarding/agent/address",
    routeParams: { type: "agent" },
  },
};
