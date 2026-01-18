"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@/src/shared/lib/headlessUi/slider/slider";
import { cn } from "@/src/shared/lib/utils";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive> {
  min?: number;
  max?: number;
  labelSuffix?: string; // 라벨에 붙일 단위 (예: "분")
}

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive>, SliderProps>(
  ({ min, max, labelSuffix = "", className, ...props }, ref) => {
    const showLabels = min !== undefined && max !== undefined;

    return (
      <div className={cn("flex flex-col gap-[0.625rem]", className)}>
        <SliderPrimitive ref={ref} min={min} max={max} className="w-full" {...props} />
        {showLabels && (
          <div className="flex justify-between text-xs font-semibold leading-[100%] tracking-[-0.01em] text-greyscale-grey-500">
            <span>
              {min}
              {labelSuffix}
            </span>
            <span>
              {max}
              {labelSuffix}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
