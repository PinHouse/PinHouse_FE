"use client";

import { SearchLine } from "@/src/assets/icons/home";
import { useHomeHeaderHooks } from "@/src/widgets/homeSection/hooks/homeHeaderHooks";

export const HomeHeader = () => {
  const { onRouteChange } = useHomeHeaderHooks();

  return (
    <div className="flex items-center gap-3">
      <button aria-label="검색">
        <SearchLine onClick={onRouteChange} />
      </button>
    </div>
  );
};
