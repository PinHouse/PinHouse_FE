"use client";

import { cn } from "@/src/shared/lib/utils";
import { SearchBar, SearchBarProps } from "../searchBar";
import React from "react";

export interface SearchBarLabelProps extends SearchBarProps {
  label?: string;
  xBtnDef?: string | null;
  direction?: "vertical" | "horizontal";
}

export const SearchBarLabel = ({
  label,
  direction = "vertical",
  className,
  onEnter,
  onChange,
  onClear,
  xBtnDef,
  ...props
}: SearchBarLabelProps) => {
  const isVertical = direction === "vertical";

  if (!label) {
    return (
      <SearchBar
        className={className}
        {...props}
        onEnter={onEnter}
        onChange={onChange}
        onClear={onClear}
        xBtnDef={xBtnDef}
      />
    );
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
            <SearchBar className={className} {...props} />
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
            <SearchBar className={className} {...props} />
          </div>
        </>
      )}
    </div>
  );
};
