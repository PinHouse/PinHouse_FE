import type { ButtonProps } from "./types";

export const defaultButtonPreset = {
  variant: "solid",
  size: "md",
  radius: "md",
  theme: "mainBlue",
} as const satisfies Partial<ButtonProps>;
