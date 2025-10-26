import type { ButtonProps } from "./types";

export const iconButtonPreset = {
  variant: "solid",
  size: "md",
} as const satisfies Partial<ButtonProps>;
