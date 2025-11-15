"use client";

import { cn } from "@/src/shared/lib/utils";
import { Input, InputProps } from "@/src/shared/ui/input/deafult";
import React from "react";

export interface InputLabelProps extends InputProps {
  label?: string;
  direction?: "vertical" | "horizontal";
}

export const InputLabel = ({
  label,
  direction = "vertical",
  className,
  ...props
}: InputLabelProps) => {
  const isVertical = direction === "vertical";

  if (!label) {
    return <Input className={className} {...props} />;
  }

  return (
    <div className={cn("relative w-full", isVertical ? "inline-block" : "flex items-center")}>
      {isVertical ? (
        <>
          <label>
            <span className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-700">
              {label}
            </span>
          </label>
          <div className="mt-3">
            <Input className={className} {...props} />
          </div>
        </>
      ) : (
        <>
          <label className="mr-[1.125rem]">
            <span className="text-base font-semibold leading-4 tracking-[-0.01em] text-greyscale-grey-700">
              {label}
            </span>
          </label>
          <div className="relative flex-1">
            <Input className={className} {...props} />
          </div>
        </>
      )}
    </div>
  );
};
