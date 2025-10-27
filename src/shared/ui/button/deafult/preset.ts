import type { ButtonProps } from "./types";

export const defaultButtonPreset = {
  variant: "solid",
  size: "md",
  radius: "md",
  text: "md",
} as const satisfies Partial<ButtonProps>;
