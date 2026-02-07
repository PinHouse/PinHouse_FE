"use client";
import { HomeScreenLogo } from "@/src/assets/icons/home/homeScreenLogo";
import { PinhouseLogo } from "@/src/assets/icons/logo";
import { useRouter } from "next/navigation";
import { SearchLine } from "@/src/assets/icons/home";
import { useHomeHeaderHooks } from "@/src/widgets/homeSection/hooks/homeHeaderHooks";

export const HomeHeader = () => {
  const { onRouteChange } = useHomeHeaderHooks();

  return (
    <header className="flex items-center justify-between pt-5">
      <div className="flex items-center gap-1">
        <HomeScreenLogo /> <PinhouseLogo className="h-7 w-auto" />
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="검색">
          <SearchLine onClick={onRouteChange} />
        </button>
      </div>
    </header>
  );
};
