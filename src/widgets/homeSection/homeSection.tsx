import { ActionCardList, HomeHeader } from "@/src/features/home";
import { PageTransition } from "@/src/shared/ui/animation";
import { PersonalShortcutList } from "@/src/features/home/ui/server/homePersonalShortcutList.server";
import { HomeHeroServer } from "@/src/features/home/ui/server/homeHero.server";
import { HomeQuickStatsListServer } from "@/src/features/home/ui/server/homeQuickStatsList.server";
import { HomeUrgentNoticeListServer } from "@/src/features/home/ui/server/homeUrgentNoticeList.server";

export const HomeSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-greyscale-grey-25 text-greyscale-grey-900 scrollbar-hide">
      <PageTransition>
        <div className="flex flex-col">
          <div className="px-4">
            <HomeHeader />
            <HomeHeroServer />
          </div>
          <div className="flex flex-col gap-3 border-b-8 border-greyscale-grey-50 px-4">
            <HomeQuickStatsListServer />
            <ActionCardList />
          </div>
          <div className="border-b-8 border-greyscale-grey-50 p-4">
            <PersonalShortcutList />
          </div>
          <div className="px-5">
            <HomeUrgentNoticeListServer />
          </div>
        </div>
      </PageTransition>
    </section>
  );
};
