"use client";

import { cn } from "@/src/shared/lib/utils";
import { inputPreset } from "../preset";
import { InputProps } from "./type";
import { inputVariants } from "./input.variants";
import { XButton } from "@/src/assets/icons/button";
import { useRef, useState } from "react";
import { useSearchState } from "@/src/shared/hooks/store";

export const Input = ({
  className,
  variant = inputPreset.variant,
  size = inputPreset.size,
  value,
  onChange,
  onFocus,
  onBlur,
  onEnter,
  ...props
}: InputProps) => {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { resetQuery } = useSearchState();
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue !== "" && currentValue !== null && currentValue !== undefined;
  const showClearButton = hasValue && isFocused;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) {
      onChange?.(e);
    } else {
      setInternalValue(e.target.value);
      onChange?.(e);
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    resetQuery();
    if (isControlled) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    } else {
      setInternalValue("");
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    }
    // focus를 약간 지연시켜서 state 업데이트 후 실행
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className={cn(inputVariants({ variant, size }), showClearButton && "pr-10", className)}
        {...props}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={e => {
          if (e.key === "Enter") {
            onEnter?.(String(currentValue));
          }
        }}
      />
      {showClearButton && (
        <button
          type="button"
          onMouseDown={e => {
            e.preventDefault(); // x 버튼 클릭 시 focus blur 이벤트 방지
            e.stopPropagation();
          }}
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-greyscale-grey-500 hover:text-greyscale-grey-700"
          aria-label="Clear input"
        >
          <XButton className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
