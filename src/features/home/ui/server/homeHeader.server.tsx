import { HomeScreenLogo } from "@/src/assets/icons/home/homeScreenLogo";
import { PinhouseLogo } from "@/src/assets/icons/logo";
import { HomeHeader } from "@/src/features/home/ui/client/homeHeader";

export const HomeHeaderServer = () => {
  return (
    <header className="flex items-center justify-between pt-5">
      <div className="flex items-center gap-1">
        <HomeScreenLogo /> <PinhouseLogo className="h-7 w-auto" />
      </div>
      <HomeHeader />
    </header>
  );
};
