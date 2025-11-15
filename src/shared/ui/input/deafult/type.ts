import { VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { inputVariants } from "./input.variants";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}
