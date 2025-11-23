import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default {
  testEnvironment: "jsdom",

  // alias 설정 (ESM 버전)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  moduleDirectories: ["node_modules", "<rootDir>"],

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },

  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
