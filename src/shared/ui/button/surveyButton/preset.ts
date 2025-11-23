import type { SurveyButtonProps } from "./types";

export const surveyButtonPreset = {
  variant: "default",
  size: "md",
} as const satisfies Partial<SurveyButtonProps>;
