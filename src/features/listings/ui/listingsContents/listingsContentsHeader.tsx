import { ArrowUpArrowDown } from "@/src/assets/icons/button/arrowUpArrowDown";
import { CaretDown } from "@/src/assets/icons/button/caretDown";

export const ListingsContentHeader = () => {
  return (
    <div className="flex">
      <div className="flex w-full flex-1 gap-3 text-2xl font-bold">
        <p className="text-text-primary">공고</p>
        <p className="text-text-tertiary">00</p>
      </div>
      <div className="flex w-full flex-1 justify-end gap-7">
        <div className="flex items-center gap-1">
          <p className="font-bold">전체</p>
          <CaretDown />
        </div>
        <div className="flex items-center gap-1">
          <div className="font-bold">최신순</div>
          <ArrowUpArrowDown />
        </div>
      </div>
    </div>
  );
};
