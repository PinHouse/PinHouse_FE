import type { Meta, StoryObj } from "@storybook/react";
import OnboardingPage from "./page";

const meta: Meta<typeof OnboardingPage> = {
  title: "Pages/onboarding/OnboardingPage",
  component: OnboardingPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
        Next.js App Router 기반의 /onboarding/[type] 페이지 전체 흐름입니다.  
        preview.tsx에서 useParams/useRouter/usePathname이 mock 처리되어 있습니다.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Diagnosis: Story = {
  parameters: {
    routeParams: { type: "diagnosis" },
    pathname: "/onboarding/[type]",
    asPath: "/onboarding/diagnosis",
  },
};

export const Compare: Story = {
  parameters: {
    pathname: "/onboarding/[type]",
    asPath: "/onboarding/compare",
    routeParams: { type: "compare" },
  },
};

export const Agent: Story = {
  parameters: {
    pathname: "/onboarding/[type]",
    asPath: "/onboarding/agent",
    routeParams: { type: "agent" },
  },
};

export const Environment: Story = {
  parameters: {
    pathname: "/onboarding/[type]",
    asPath: "/onboarding/environment",
    routeParams: { type: "environment" },
  },
};
