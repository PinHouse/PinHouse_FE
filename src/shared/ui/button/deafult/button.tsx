"use client";

import { cn } from "@/src/shared/lib/utils";
import { buttonVariants } from "./button.variants";
import { ButtonProps } from "./types";
import { defaultButtonPreset } from "./preset";

export const Button = ({
  className,
  variant = defaultButtonPreset.variant,
  size = defaultButtonPreset.size,
  radius = defaultButtonPreset.radius,
  text = defaultButtonPreset.text,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, radius, text }), className)}
      {...props}
    />
  );
};
