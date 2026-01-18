"use client";

import { cn } from "@/src/shared/lib/utils";
import { dropDownVariants } from "./dropDown.variants";
import { DropDownProps } from "./type";
import { useState } from "react";
import { DownButton, UpButton } from "@/src/assets/icons/button";
import { dropDownPreset } from "./deafultPreset";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const DropDown = ({
  className,
  variant = dropDownPreset.variant,
  size = dropDownPreset.size,
  types,
  children,
  data,
  icon,
  onChange,
  ...props
}: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const optionData = types ? data[types] : [];
  const [selected, setSelect] = useState<string>(optionData[0]?.value ?? "");

  const onClose = (item: { key: string; value: string }) => {
    setSelect(item.value);
    setOpen(false);
    onChange?.(item.key, item.value);
  };

  return (
    <div className="relative inline-block w-full">
      <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            className={cn(
              dropDownVariants({ variant, size }),
              variant === "box"
                ? open
                  ? "border-[1.5px] border-primary-blue-300"
                  : "border-greyscale-grey-75"
                : open
                  ? "bg-primary-blue-25 font-semibold text-primary-blue-400"
                  : "text-greyscale-grey-400",
              className
            )}
            {...props}
          >
            <span className="flex w-full items-center justify-between">
              {selected || children}
              {icon && <span className="shrink-0">{icon}</span>}
              {/* {variant !== "menu" && (open ? <UpButton /> : <DownButton />)} */}
              {variant !== "menu" && !icon && (open ? <UpButton /> : <DownButton />)}
            </span>
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            className={cn(
              "group z-10 w-[var(--radix-dropdown-menu-trigger-width)] overflow-hidden rounded border-none bg-white font-medium text-greyscale-grey-400 shadow-md-16"
            )}
            sideOffset={8} // 드롭다운 트리거와 메뉴 간 간격 (8px)
            align="start"
          >
            {optionData.map(item => {
              const isSelected = item.value === selected;
              return (
                <DropdownMenuPrimitive.Item
                  key={item.key}
                  onClick={() => onClose({ key: item.key, value: item.value })}
                  className={cn(
                    "flex h-auto cursor-pointer flex-col gap-[0.5rem] px-3 py-[0.625rem] outline-none",

                    isSelected
                      ? "bg-primary-blue-25 text-primary-blue-400 hover:!bg-primary-blue-25 hover:!text-primary-blue-400 group-hover:bg-transparent group-hover:text-greyscale-grey-400"
                      : "text-greyscale-grey-400 hover:bg-primary-blue-25 hover:text-primary-blue-400"
                  )}
                >
                  <span className="truncate text-sm font-medium leading-[132%] tracking-[-0.01em]">
                    {item.value}
                  </span>
                  {item.description && (
                    <span className="truncate text-[0.625rem] leading-[132%]">
                      {item.description}
                    </span>
                  )}
                </DropdownMenuPrimitive.Item>
              );
            })}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};
