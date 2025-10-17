"use client";

import { cn } from "@/src/shared/lib/utils";
import { buttonVariants } from "./button.variants";
import { ButtonProps } from "./types";

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
