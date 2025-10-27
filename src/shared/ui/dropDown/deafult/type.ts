import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { dropDownVariants } from "./dropDown.bariants";

export interface DropDownProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropDownVariants> {
  types?: string;
  data: PinPointMap;
}

export type PinPoint = {
  key: string;
  value: string;
  description: string;
};

export interface PinPointMap {
  [key: string]: PinPoint[];
}
