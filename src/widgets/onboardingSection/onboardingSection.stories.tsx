import type { Meta, StoryObj } from "@storybook/react";
import { onboardingContentMap } from "@/src/features/onboarding/model/onboardingContentMap";
import { OnboardingSection } from "./ui/onBoardingSection";

const meta: Meta<typeof OnboardingSection> = {
  title: "Widgets/Onboarding/OnboardingSection",
  component: OnboardingSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
            온보딩 섹션은 OnboardingPage 내부에서 실제 각 단계를 렌더링하는 UI입니다.  
            주소 입력, 태그 버튼 등 내부 기능이 정상적으로 작동합니다.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Diagnosis: Story = {
  args: {
    image: <onboardingContentMap.diagnosis.Icon />,
    title: onboardingContentMap.diagnosis.title,
    description: onboardingContentMap.diagnosis.description,
    type: "diagnosis",
  },

  parameters: {
    nextjs: {
      navigation: {
        pathname: "/onboarding/diagnosis",
        query: { type: "diagnosis" },
      },
    },
  },
};

export const Compare: Story = {
  args: {
    image: <onboardingContentMap.compare.Icon />,
    title: onboardingContentMap.compare.title,
    description: onboardingContentMap.compare.description,
    type: "compare",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/onboarding/compare",
        query: { type: "compare" },
      },
    },
  },
};

export const Agent: Story = {
  args: {
    image: <onboardingContentMap.agent.Icon />,
    title: onboardingContentMap.agent.title,
    description: onboardingContentMap.agent.description,
    type: "agent",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/onboarding/agent",
        query: { type: "agent" },
      },
    },
  },
};

export const Environment: Story = {
  args: {
    image: <onboardingContentMap.environment.Icon />,
    title: onboardingContentMap.environment.title,
    description: onboardingContentMap.environment.description,
    type: "environment",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/onboarding/environment",
        query: { type: "environment" },
      },
    },
  },
};
