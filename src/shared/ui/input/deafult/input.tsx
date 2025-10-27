"use client";

import { cn } from "@/src/shared/lib/utils";
import { inputPreset } from "../preset";
import { InputProps } from "./type";
import { inputVariants } from "./input.bariants";

export const Input = ({
  className,
  variant = inputPreset.variant,
  size = inputPreset.size,
  ...props
}: InputProps) => {
  return <input className={cn(inputVariants({ variant, size }), className)} {...props} />;
};
