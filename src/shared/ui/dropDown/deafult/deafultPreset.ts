import { DropDownProps } from "./type";

export const dropDownPreset = {
  variant: "box",
  size: "md",
} as const satisfies Partial<DropDownProps>;
