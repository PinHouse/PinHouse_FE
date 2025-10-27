"use client";

import { cn } from "@/src/shared/lib/utils";
import { buttonVariants } from "./button.variants";
import { ButtonProps } from "./types";
import { iconButtonPreset } from "./preset";

export const IconButton = ({
  className,
  variant = iconButtonPreset.variant,
  size = iconButtonPreset.size,
  ...props
}: ButtonProps) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};
