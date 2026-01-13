import { ArrowUpArrowDown } from "@/src/assets/icons/button/arrowUpArrowDown";
import { CaretDropDown } from "@/src/shared/ui/dropDown/CaretDropDown";
import { listingsComparePoint } from "../../../model";

export const ListingsCompareContentHeader = () => {
  // const onChange = (e: MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const saveSortType = isSearchPage ? setSearchSortType : setSortType;
  //   const nextSortType = sortType === "최신공고순" ? "마감임박순" : "최신공고순";
  //   const nextSearchSortType = searchSortType === "LATEST" ? "DEADLINE" : "LATEST";
  //   const sortTypeValue = isSearchPage ? nextSearchSortType : nextSortType;
  //   saveSortType(sortTypeValue);
  // };

  return (
    <section className="border-greyscale-grey-100 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xl font-bold">
          <p className="text-base-17 text-text-primary">방</p>
          <p className="text-base-17 text-text-tertiary">{"00"}</p>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-1"></div>

          <div className="flex items-center">
            {/* <span>
              <p>핀포인트 거리순</p>
            </span> */}
            <CaretDropDown
              variant="ghost"
              types="drop"
              size={"xs"}
              data={listingsComparePoint}
              fullWidth={false}
              className="w-fit"
              containerClassName="w-auto"
              menuClassName="left-[-60] w-[100] "
            />
          </div>
        </div>
      </div>
    </section>
  );
};
