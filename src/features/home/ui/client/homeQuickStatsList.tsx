"use client";

import { CaretDown } from "@/src/assets/icons/button/caretDown";
import { transTime } from "@/src/shared/lib/utils";
import { useHomeUseHooks } from "@/src/features/home/ui/homeUseHooks/homeUseHooks";
import { useHomeMaxTime } from "@/src/features/home/model/homeStore";

export const QuickStatsList = () => {
  const { line2, line1, onSelectSection } = useHomeUseHooks();
  const maxTime = useHomeMaxTime(s => s.maxTime);

  return (
    <>
      <div
        className="mt-2 flex gap-4 hover:cursor-pointer"
        onClick={() => onSelectSection("pinpoints")}
      >
        <span className="flex flex-col text-lg font-semibold leading-none">
          <p>{line1}</p>
          <p>{line2}</p>
        </span>
        <span className="flex items-center">
          <CaretDown />
        </span>
      </div>

      <div className="flex items-center pl-6" onClick={() => onSelectSection("maxTime")}>
        <button className="flex items-center gap-1 text-lg font-semibold leading-none">
          {transTime(maxTime)}
          <span className="pl-1 text-greyscale-grey-400">
            <CaretDown />
          </span>
        </button>
      </div>
    </>
  );
};
