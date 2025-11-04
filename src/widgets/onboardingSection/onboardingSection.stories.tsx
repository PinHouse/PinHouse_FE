import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { onboardingContentMap } from "@/src/features/onboarding/model/onboardingContentMap";
import { OnboardingSection } from "./ui/onBoardingSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const withQueryClient: Decorator = Story => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const meta: Meta<typeof OnboardingSection> = {
  title: "Widgets/Onboarding/OnboardingSection",
  component: OnboardingSection,
  decorators: [withQueryClient],
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
};

export const Compare: Story = {
  args: {
    image: <onboardingContentMap.compare.Icon />,
    title: onboardingContentMap.compare.title,
    description: onboardingContentMap.compare.description,
    type: "compare",
  },
};

export const Agent: Story = {
  args: {
    image: <onboardingContentMap.agent.Icon />,
    title: onboardingContentMap.agent.title,
    description: onboardingContentMap.agent.description,
    type: "agent",
  },
};

// ✅ 4. 주변환경
export const Environment: Story = {
  args: {
    image: <onboardingContentMap.environment.Icon />,
    title: onboardingContentMap.environment.title,
    description: onboardingContentMap.environment.description,
    type: "environment",
  },
};
