"use client";
import { ArrowUpArrowDown } from "@/src/assets/icons/button/arrowUpArrowDown";
import { listingPoint, useListingsFilterStore } from "../../model";
import { CaretDropDown } from "@/src/shared/ui/dropDown/CaretDropDown";
import { ListingsContentHeaderProps } from "@/src/entities/listings/model/type";
import { MouseEvent } from "react";

export const ListingsContentHeader = ({ totalCount }: ListingsContentHeaderProps) => {
  const sortType = useListingsFilterStore(state => state.sortType);
  const setSortType = useListingsFilterStore(state => state.setSortType);

  const onChange = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const nextSortType = sortType === "최신공고순" ? "마감임박순" : "최신공고순";
    setSortType(nextSortType);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xl font-bold">
        <p className="text-sm text-text-primary">공고</p>
        <p className="text-text-greyscale-grey-400 text-sm">{totalCount}</p>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-1">
          <CaretDropDown variant="ghost" types="drop" data={listingPoint} />
        </div>

        <div className="flex items-center gap-1" onClick={e => onChange(e)}>
          <div className="text-xs font-bold">{sortType}</div>
          <ArrowUpArrowDown />
        </div>
      </div>
    </div>
  );
};
