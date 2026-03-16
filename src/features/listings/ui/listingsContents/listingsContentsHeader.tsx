"use client";
import { ArrowUpArrowDown } from "@/src/assets/icons/button/arrowUpArrowDown";
import { CaretDropDown } from "@/src/shared/ui/dropDown/CaretDropDown";
import { ListingsContentHeaderProps } from "@/src/entities/listings/model/type";
import { MouseEvent } from "react";

import { useListingsContentHeaderController } from "@/src/features/listings/hooks/list/ListingsContentHeader";

export const ListingsContentHeader = ({ totalCount }: ListingsContentHeaderProps) => {
  const { sortLabel, listingPoint, onToggleSort } = useListingsContentHeaderController();
  const handleToggleSort = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onToggleSort();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xl font-bold">
        <p className="text-base-17 text-text-primary">공고</p>
        <p className="text-base-17 text-text-tertiary">{totalCount}</p>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <CaretDropDown
            variant="ghost"
            types="drop"
            data={listingPoint}
            fullWidth={false}
            className="w-fit"
            containerClassName="w-auto"
            menuClassName="left-[5] w-fit"
          />
        </div>

        <div className="flex items-center gap-1 hover:cursor-pointer" onClick={handleToggleSort}>
          <div className="text-sm font-bold">{sortLabel}</div>
          <ArrowUpArrowDown />
        </div>
      </div>
    </div>
  );
};
