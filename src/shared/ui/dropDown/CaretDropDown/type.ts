import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { dropDownVariants } from "./dropDown.bariants";

export type PinPoint = {
  key: string;
  value: string;
  description?: string;
};

export interface PinPointMap<T = PinPoint[]> {
  [key: string]: T;
}

export interface DropDownProps<T = PinPoint[]>
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropDownVariants> {
  types?: string;
  data: PinPointMap<T>;
  setSelect?: any;
  selected?: string;
  // layout overrides
  containerClassName?: string; // wrapper div
  menuClassName?: string; // dropdown menu ul
  fullWidth?: boolean; // wrapper width: true -> w-full, false -> w-auto
}
