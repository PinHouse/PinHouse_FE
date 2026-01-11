import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { dropDownVariants } from "./dropDown.variants";

export type PinPoint = {
  key: string;
  value: string;
  description?: string;
};

export interface PinPointMap<T = PinPoint[]> {
  [key: string]: T;
}

export interface DropDownProps<T = PinPoint[]>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof dropDownVariants> {
  types?: string;
  data: PinPointMap<T>;
  onChange?: (selectedKey: string, selectedValue: string) => void;
  icon?: ReactNode;
}
