"use client";
import { cn } from "../../../lib/utils";
import { InputProps } from "./type";
import { inputVariants } from "./input.bariants";

export function Input({ className, variant, size, ...props }: InputProps) {
  return <input className={cn(inputVariants({ variant, size }), className)} {...props} />;
}
