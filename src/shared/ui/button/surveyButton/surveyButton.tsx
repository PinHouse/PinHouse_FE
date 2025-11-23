"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "@/src/shared/lib/utils";
import { surveyButtonVariants } from "./button.variants";
import { SurveyButtonProps } from "./types";
import { surveyButtonPreset } from "./preset";

const SurveyButton = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  SurveyButtonProps
>(
  (
    {
      className,
      variant = surveyButtonPreset.variant,
      size = surveyButtonPreset.size,
      icon,
      title,
      description,
      ...props
    },
    ref
  ) => {
    return (
      <TogglePrimitive.Root
        ref={ref}
        className={cn(surveyButtonVariants({ variant, size }), "group", className)}
        {...props}
      >
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex flex-col gap-1 text-left">
          <span>{title}</span>
          {description && (
            <span className="group-hover:text-greyscale-grey-100 text-xs leading-[16px] tracking-[-0.01em] text-greyscale-grey-500 group-data-[state=on]:text-greyscale-grey-75">
              {description}
            </span>
          )}
        </div>
      </TogglePrimitive.Root>
    );
  }
);

SurveyButton.displayName = "SurveyButton";

export { SurveyButton, surveyButtonVariants };
