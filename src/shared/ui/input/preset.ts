import type { InputProps } from "./deafult/type";

export const inputPreset = {
  size: "lg",
  variant: "ghost",
} as const satisfies Partial<InputProps>;
