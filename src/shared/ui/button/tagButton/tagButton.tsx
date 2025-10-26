"use client";

import { cn } from "@/src/shared/lib/utils";
import { buttonVariants } from "./button.variants";
import { ButtonProps } from "./types";
import { tagButtonPreset } from "./preset";

export const TagButton = ({
  className,
  variant = tagButtonPreset.variant,
  size = tagButtonPreset.size,
  ...props
}: ButtonProps) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};
