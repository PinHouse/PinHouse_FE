"use client";

import { cn } from "@/src/shared/lib/utils";
import { dropDownVariants } from "./dropDown.bariants";
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
        className={cn(dropDownVariants({ variant, size }), "w-full min-w-[160px]", className)}
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
            "absolute left-0 top-full z-10 mt-1 w-full rounded-lg border bg-white font-bold text-text-tertiary shadow-lg"
          )}
        >
          {optionData.map(item => (
            <li
              key={item.key}
              onClick={() => onClose({ value: item.value })}
              className="flex cursor-pointer flex-col px-3 py-2 hover:bg-hover-dropDown hover:text-text-brand"
            >
              <span>{item.value}</span>
              <span className="text-sm">{item.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
