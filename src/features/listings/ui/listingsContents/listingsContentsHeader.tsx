"use client";
import { ArrowUpArrowDown } from "@/src/assets/icons/button/arrowUpArrowDown";
import { listingPoint, useListingsFilterStore, useListingsSearchState } from "../../model";
import { CaretDropDown } from "@/src/shared/ui/dropDown/CaretDropDown";
import { ListingsContentHeaderProps } from "@/src/entities/listings/model/type";
import { MouseEvent } from "react";
import { useSearchParams } from "next/navigation";

export const ListingsContentHeader = ({ totalCount }: ListingsContentHeaderProps) => {
  const sortType = useListingsFilterStore(state => state.sortType);
  const setSortType = useListingsFilterStore(state => state.setSortType);
  const setSearchSortType = useListingsSearchState(state => state.setSortType);
  const searchSortType = useListingsSearchState(state => state.sortType);

  const searchParams = useSearchParams();
  const isSearchPage = searchParams.has("query");

  const onChange = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const saveSortType = isSearchPage ? setSearchSortType : setSortType;
    const nextSortType = sortType === "최신공고순" ? "마감임박순" : "최신공고순";
    const nextSearchSortType = searchSortType === "LATEST" ? "DEADLINE" : "LATEST";
    const sortTypeValue = isSearchPage ? nextSearchSortType : nextSortType;
    saveSortType(sortTypeValue);
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

        <div className="flex items-center gap-1 hover:cursor-pointer" onClick={e => onChange(e)}>
          <div className="text-sm font-bold">
            {isSearchPage ? (searchSortType === "LATEST" ? "최신공고순" : "마감임박순") : sortType}
          </div>
          <ArrowUpArrowDown />
        </div>
      </div>
    </div>
  );
};
