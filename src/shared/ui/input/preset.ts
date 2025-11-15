import type { InputProps } from "./deafult/type";

export const inputPreset = {
  size: "default",
  variant: "default",
} as const satisfies Partial<InputProps>;
