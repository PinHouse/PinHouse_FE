import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { dropDownVariants } from "./dropDown.variants";

export interface DropDownProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropDownVariants> {
  types?: string;
  data: PinPointMap;
  label?: string;
  direction?: "vertical" | "horizontal";
}

export type PinPoint = {
  key: string;
  value: string;
  description: string;
};

export interface PinPointMap {
  [key: string]: PinPoint[];
}
