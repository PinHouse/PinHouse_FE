import type { Decorator, Meta, StoryObj } from "@storybook/react";

import { BottomNavigation } from "@/src/shared/ui/bottomNavigation";
import { ListingsCardDetailSection } from "../listingsCardDetailSection/listingsCardDetailSection";

const withAppShell: Decorator = Story => (
  <div className="h-screen w-screen bg-white text-gray-900">
    <div className="flex h-full items-stretch justify-center">
      <div className="relative flex h-full w-full max-w-[768px] flex-col bg-white shadow-md">
        <main className="flex-1 overflow-y-auto">
          <Story />
        </main>
      </div>
    </div>
  </div>
);

const meta: Meta<typeof ListingsCardDetailSection> = {
  title: "Widgets/Listings/ListingsCardDetailSection",
  component: ListingsCardDetailSection,
  decorators: [withAppShell],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
          /listings/ListingsCardDetailSection 경로에서 사용하는 검색 화면입니다.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
