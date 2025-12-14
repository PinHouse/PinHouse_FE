import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ListingsSection } from "../listingsSection";
import { NOTICE_ENDPOINT } from "@/src/shared/api";
import { http } from "@/src/shared/api/http";
import { ListingItem, ListingListPage } from "@/src/entities/listings/model/type";
import { IResponse } from "@/src/shared/types";
import { BottomNavigation } from "@/src/shared/ui/bottomNavigation";

const mockListingItems: ListingItem[] = [
  {
    id: "101",
    thumbnailUrl: null,
    name: "2025 행복주택 상반기 청년 특별공급",
    supplier: "LH",
    complexes: 2,
    type: "행복주택",
    housingType: "아파트",
    announcePeriod: "2025-01-02",
    applyPeriod: "2025-01-07~2025-01-14",
    liked: false,
  },
  {
    id: "102",
    thumbnailUrl: null,
    name: "국민임대 3기 신도시 공급안내",
    supplier: "SH공사",
    complexes: 4,
    type: "국민임대",
    housingType: "오피스텔",
    announcePeriod: "2025-01-20",
    applyPeriod: "2025-02-01~2025-02-10",
    liked: false,
  },
  {
    id: "103",
    thumbnailUrl: null,
    name: "영구임대 1차 모집 (고령자)",
    supplier: "경기도시공사",
    complexes: 1,
    type: "영구임대",
    housingType: "연립주택",
    announcePeriod: "2025-01-11",
    applyPeriod: "2025-01-15~2025-01-22",
    liked: false,
  },
];

const mockListingPage: ListingListPage = {
  totalCount: mockListingItems.length,
  totalElements: mockListingItems.length,
  content: mockListingItems,
  notices: [],
  hasNext: false,
  page: 1,
};

const mockListingResponse: IResponse<ListingListPage> = {
  success: true,
  code: 200,
  message: "Mock listings fetched successfully",
  data: mockListingPage,
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type ListingsMockMode = "success" | "error";

const withFreshQueryClient: Decorator = Story => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <Story />
    </QueryClientProvider>
  );
};

const withListingsMock: Decorator = (Story, context) => {
  useEffect(() => {
    const mutableHttp = http as Mutable<typeof http>;
    const originalPost = mutableHttp.post;
    const mode: ListingsMockMode =
      (context.parameters?.listingsMock?.mode as ListingsMockMode) ?? "success";

    const patchedPost: typeof http.post = async <T extends IResponse<any>, D = undefined>(
      url: string,
      data?: D,
      options?: AxiosRequestConfig
    ) => {
      if (url === NOTICE_ENDPOINT) {
        if (mode === "error") {
          return Promise.reject(new Error("Mock listings fetch failed"));
        }
        return mockListingResponse as T;
      }

      return originalPost<T, D>(url, data, options);
    };

    mutableHttp.post = patchedPost;
    return () => {
      mutableHttp.post = originalPost;
    };
  }, []);

  return <Story />;
};

const withBottomNavigation: Decorator = Story => {
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

const meta: Meta<typeof ListingsSection> = {
  title: "Widgets/Listings/ListingsSection",
  component: ListingsSection,
  decorators: [withFreshQueryClient, withListingsMock, withBottomNavigation],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
          공고 탐색 섹션은 /listings 페이지에 들어가는 전체 헤더, 목록, 필터 시트를 포함한 UI입니다.
          스토리에서는 실제 API 호출을 대신해 정적인 공고 데이터를 주입해 동작을 확인할 수 있습니다.
        `,
      },
    },
    nextjs: {
      navigation: {
        pathname: "/listings",
        query: {},
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  parameters: {
    listingsMock: {
      mode: "error" as ListingsMockMode,
    },
  },
};
