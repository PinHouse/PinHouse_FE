"use client";

import * as React from "react";
import { Toggle } from "@/src/shared/lib/headlessUi/toggle/toggle";
import { cn } from "@/src/shared/lib/utils";

export type ChipProps = React.ComponentPropsWithoutRef<typeof Toggle>;

export const Chip = React.forwardRef<React.ElementRef<typeof Toggle>, ChipProps>(
  ({ className, ...props }, ref) => {
    return <Toggle ref={ref} variant="chip" className={cn(className)} {...props} />;
  }
);

Chip.displayName = "Chip";
