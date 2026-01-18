import type { ButtonProps } from "./types";

export const iconButtonPreset = {
  variant: "solid",
  size: "md",
} as const satisfies Partial<ButtonProps>;

export const kakaoIconButtonPreset = {
  variant: "kakao",
  size: "md",
} as const satisfies Partial<ButtonProps>;

export const naverIconButtonPreset = {
  variant: "naver",
  size: "md",
} as const satisfies Partial<ButtonProps>;
