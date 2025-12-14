"use client";

import { Suspense } from "react";
import { cn } from "@/src/shared/lib/utils";
import { dropDownVariants } from "./dropDown.bariants";
import { DropDownProps } from "./type";
import { useEffect, useRef, useState } from "react";
import { dropDownPreset } from "./deafultPreset";
import { CaretDown } from "@/src/assets/icons/button/caretDown";
import { CaretUp } from "@/src/assets/icons/button/caretUp";
import {
  useListingsSearchState,
  useListingState,
} from "@/src/features/listings/model/listingsStore";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/src/shared/ui/spinner/default";

function CaretDropDownContent({
  className,
  variant = dropDownPreset.variant,
  size = dropDownPreset.size,
  types,
  children,
  data,
  ...props
}: DropDownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const optionData = types ? data[types] : [];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { status, setStatus } = useListingState();
  const searchParams = useSearchParams();
  const isSearchPage = searchParams.has("query");

  const setBaseStatus = useListingState(s => s.setStatus);
  const setSearchStatus = useListingsSearchState(s => s.setStatus);
  const searchState = useListingsSearchState(s => s.status);

  const statusValue: Record<string, string> = {
    전체: "ALL",
    모집중: "OPEN",
    ALL: "전체",
    OPEN: "모집중",
  };

  const onClose = ({ value }: { value: string }) => {
    if (isSearchPage) {
      const nextSearchStatus = statusValue[value] ?? value;
      setSearchStatus(nextSearchStatus);
    } else {
      setBaseStatus(value);
    }
    setOpen(false);
  };
  const onChangeButton = () => setOpen(prev => !prev);

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
        className={cn(dropDownVariants({ variant, size }), className)}
        onClick={onChangeButton}
        {...props}
      >
        {children}
        <span className="flex w-full items-center justify-between gap-1 text-xs font-bold">
          {isSearchPage ? (searchState === "ALL" ? "전체" : "모집중") : status}
          {/* {status || children} */}
          {open ? <CaretUp /> : <CaretDown />}
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
              className="hover:bg-hover-dropDown flex cursor-pointer flex-col px-3 py-2 hover:text-text-brand"
            >
              <span className="text-sm">{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const CaretDropDown = (props: DropDownProps) => {
  return (
    <Suspense fallback={<Spinner title="로딩 중" description="페이지를 불러오는 중입니다" />}>
      <CaretDropDownContent {...props} />
    </Suspense>
  );
};
