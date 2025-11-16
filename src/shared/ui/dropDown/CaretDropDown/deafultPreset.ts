import { DropDownProps } from "./type";

export const dropDownPreset = {
  variant: "solid",
  size: "md",
} as const satisfies Partial<DropDownProps>;
