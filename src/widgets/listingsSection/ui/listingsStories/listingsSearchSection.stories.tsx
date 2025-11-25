import type { Decorator, Meta, StoryObj } from "@storybook/react";

import { ListingsSearch } from "../searchSection.tsx/searchSection";
import { BottomNavigation } from "@/src/shared/ui/bottomNavigation";

const withAppShell: Decorator = Story => {
  return (
    <div className="h-screen w-screen bg-white text-gray-900">
      <div className="flex h-full items-stretch justify-center">
        <div className="relative flex h-full w-full max-w-[768px] flex-col bg-white shadow-md">
          <main className="flex-1 overflow-y-auto">
            <Story />
          </main>
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ListingsSearch> = {
  title: "Widgets/Listings/ListingsSearch",
  component: ListingsSearch,
  decorators: [withAppShell],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
          /listings/search 경로에서 사용하는 검색 화면입니다.
          최근 검색어, 인기 검색어, 검색창을 한 번에 확인할 수 있도록 페이지 전체 구성을 스토리에서 재현했습니다.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoResult: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/listings/search",
        query: { query: "행복주택" },
      },
    },
  },
};
