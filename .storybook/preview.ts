import "../app/globals.css";
import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      options: INITIAL_VIEWPORTS, // 스토리북에서 사용할 해상도 항목
    },
    actions: { argTypesRegex: "^on.*" }, // 스토리북 action 로그용
  },
  initialGlobals: {
    viewport: { value: "iphone14", isRotated: false }, // 스토리북 해상도 설정
  },
};

export default preview;
