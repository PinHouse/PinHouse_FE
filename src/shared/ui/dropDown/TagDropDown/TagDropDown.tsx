"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/shared/lib/headlessUi";

type TagOption<T extends string = string> = {
  key: T;
  label: string;
};

interface TagDropDownProps<T extends string = string> {
  options: TagOption<T>[];
  value: T[];
  onChange: (next: T[]) => void;
  placeholder?: string;
}

const filedCss =
  "rounded-full bg-primary-blue-25 px-3 py-1 text-xs font-medium text-primary-blue-400";

export const TagDropDown = <T extends string>({
  options,
  value,
  onChange,
  placeholder = "태그 선택",
}: TagDropDownProps<T>) => {
  const toggleTag = (key: T) => {
    if (value.includes(key)) {
      onChange(value.filter(item => item !== key));
      return;
    }
    onChange([...value, key]);
  };

  const selectedLabels = options
    .filter(option => value.includes(option.key))
    .map(option => option.label);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          {selectedLabels.length === 0 ? (
            <span className={filedCss}>{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedLabels.length === 1 ? (
                <p className={filedCss}>{selectedLabels[0]}</p>
              ) : (
                <p className={filedCss}>
                  {selectedLabels[0]} +{selectedLabels.length}
                </p>
              )}
              {/*{selectedLabels.map(label => (*/}
              {/*  <span*/}
              {/*    key={label}*/}
              {/*    className="rounded-full bg-primary-blue-25 px-3 py-1 text-xs font-medium text-primary-blue-400"*/}
              {/*  >*/}
              {/*    {label}*/}
              {/*  </span>*/}
              {/*))}*/}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="rounded-2xl border border-greyscale-grey-75 bg-white p-2 shadow-md-16"
      >
        <div className="flex flex-col gap-2">
          {options.map(option => {
            const selected = value.includes(option.key);

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => toggleTag(option.key)}
                className={
                  selected
                    ? "rounded-full bg-primary-blue-25 px-3 py-1 text-sm font-semibold text-primary-blue-400"
                    : "rounded-full bg-greyscale-grey-50 px-3 py-1 text-sm text-greyscale-grey-700"
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
