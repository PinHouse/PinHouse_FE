import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import * as nextNavigation from "next/navigation";
import type { Decorator, Preview } from "@storybook/react";

const INITIAL_VIEWPORTS = {
  iphone14: {
    name: "iPhone 14",
    styles: {
      width: "390px",
      height: "844px",
    },
    type: "mobile",
  },
  galaxyS23: {
    name: "Galaxy S23",
    styles: {
      width: "412px",
      height: "915px",
    },
    type: "mobile",
  },
  ipadMini: {
    name: "iPad Mini",
    styles: {
      width: "768px",
      height: "1024px",
    },
    type: "tablet",
  },
};

const queryClient = new QueryClient();

const withProviders: Decorator = (Story, context) => {
  const { routeParams, pathname, asPath } = context.parameters;

  const [currentPath, setCurrentPath] = useState(asPath || pathname || "/");

  Object.defineProperty(nextNavigation, "useParams", {
    writable: true,
    value: () => routeParams.type || {},
  });

  Object.defineProperty(nextNavigation, "usePathname", {
    writable: true,
    value: () => currentPath || asPath,
  });

  Object.defineProperty(nextNavigation, "useRouter", {
    writable: true,
    value: () => ({
      push: (url: string) => {
        console.log(`[mock push]: ${url}`);
        setCurrentPath(url);
      },
      replace: (url: string) => {
        console.log(`[mock replace]: ${url}`);
        setCurrentPath(url);
      },
      prefetch: async () => {},
      pathname: currentPath,
      asPath: currentPath,
      back: () => console.log("[mock back]"),
      forward: () => console.log("[mock forward]"),
      refresh: () => console.log("[mock refresh]"),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <Story />
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export const decorators = [withProviders];

export const parameters: Preview["parameters"] = {
  layout: "fullscreen",
  controls: { expanded: true },
  docs: { toc: true },
  viewport: {
    viewports: INITIAL_VIEWPORTS, // ✅ iPhone, Galaxy 등 기본 디바이스 추가
    defaultViewport: "iphone14", // ✅ 기본값으로 모바일 설정
  },
};
