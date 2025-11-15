"use client";

import { cn } from "@/src/shared/lib/utils";
import { dropDownVariants } from "./dropDown.variants";
import { DropDownProps } from "./type";
import { useEffect, useRef, useState } from "react";

import { DownButton, UpButton } from "@/src/assets/icons/button";
import { dropDownPreset } from "./deafultPreset";
import { pinPoint } from "@/src/features/onboarding/ui";

export const DropDown = ({
  className,
  variant = dropDownPreset.variant,
  size = dropDownPreset.size,
  types,
  children,
  data,
  ...props
}: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const optionData = types ? data[types] : [];
  const [selected, setSelect] = useState<string>(optionData[0]?.value ?? "");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onChangeButton = () => setOpen(prev => !prev);

  const onClose = ({ value }: { value: string }) => {
    setSelect(value);
    setOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full" ref={wrapperRef}>
      <button
        className={cn(
          dropDownVariants({ variant, size }),
          "w-full min-w-[160px]",
          open ? "border-[1.5px] border-primary-blue-300" : "border-greyscale-grey-75",
          className
        )}
        onClick={onChangeButton}
        {...props}
      >
        {children}
        <span className="flex w-full items-center justify-between">
          {selected || children}
          {open ? <UpButton /> : <DownButton />}
        </span>
      </button>

      {open && (
        <ul
          className={cn(
            "shadow-md-16 group absolute left-0 top-full z-10 mt-2 w-full rounded border border-gray-200 bg-white font-bold text-text-tertiary"
          )}
        >
          {optionData.map(item => {
            const isSelected = item.value === selected;
            return (
              <li
                key={item.key}
                onClick={() => onClose({ value: item.value })}
                className={cn(
                  "flex cursor-pointer flex-col gap-[0.5rem] px-3 py-[0.625rem]",
                  isSelected
                    ? "bg-primary-blue-25 group-hover:text-greyscale-grey-400 hover:!bg-primary-blue-25 text-primary-blue-400 hover:!text-primary-blue-400 group-hover:bg-transparent"
                    : "text-greyscale-grey-400 hover:bg-primary-blue-25 hover:text-primary-blue-400"
                )}
              >
                <span className="truncate text-sm font-medium leading-[132%] tracking-[-0.01em]">
                  {item.value}
                </span>
                <span className="truncate text-[0.625rem] leading-[132%]">{item.description}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
