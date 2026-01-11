import { HomeScreenLogo } from "@/src/assets/icons/home/homeScreenLogo";
import { PinhouseLogo } from "@/src/assets/icons/logo";
import { useRouter } from "next/navigation";
import { useRouteStore } from "../model/homeStore";
import { SearchLine } from "@/src/assets/icons/home";

export const HomeHeader = () => {
  const router = useRouter();
  const { setPrevPath } = useRouteStore();

  const pageRouter = () => {
    setPrevPath("/home");
    router.push("/listings/search");
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <HomeScreenLogo /> <PinhouseLogo className="h-7 w-auto" />
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="검색">
          <SearchLine onClick={pageRouter} />
        </button>
      </div>
    </header>
  );
};
