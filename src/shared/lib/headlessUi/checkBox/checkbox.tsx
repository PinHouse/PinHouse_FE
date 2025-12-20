"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckBoxImgBefore, CheckBoxImgAfter } from "@/src/assets/images/common/checkBox";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative h-[20px] w-[20px] shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      "[&[data-state=checked]>*:first-child]:hidden",
      className
    )}
    {...props}
  >
    {/* 기본 상태: 빈 체크박스 - 체크 상태일 때 숨김 */}
    <div className="absolute inset-0 flex items-center justify-center">
      <CheckBoxImgBefore />
    </div>

    {/* 체크 상태: 채워진 체크박스 */}
    <CheckboxPrimitive.Indicator className="absolute inset-0 z-10 flex items-center justify-center">
      <CheckBoxImgAfter />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
