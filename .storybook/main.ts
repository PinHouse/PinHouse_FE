import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)", "../app/**/*.stories.@(ts|tsx)"],
  addons: ["storybook/essentials", "storybook/a11y", "storybook/links", "storybook/interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {
        useNextRouter: true,
      },
    },
  },

  previewAnnotations: (entris = []) => [...entris, require.resolve("./preview.tsx")],
  // @ts-expect-error Storybook 9.x autodocs 타입 버그
  autodocs: "tag",
  staticDirs: ["../public"],

  webpackFinal: async config => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../src"),
      // "next/navigation": path.resolve(__dirname, "./nextNavigationMock.ts"),
    };

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default config;
