import { InputProps } from "../input/deafult";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { searchBarVariants } from "./searchBar.variants";

export type SearchBarOption = {
  key: string;
  value: string;
  description?: string;
};

export interface SearchBarProps
  extends Omit<InputProps, "onSelect" | "className" | "variant" | "size">,
    VariantProps<typeof searchBarVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  options?: SearchBarOption[];
  onSelect?: (option: SearchBarOption) => void;
  className?: string;
  onEnter?: (value: string) => void;
  onClear?: () => void;
}
