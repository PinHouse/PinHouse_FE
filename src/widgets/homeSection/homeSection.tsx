"use client";
import {
  ActionCardList,
  HomeHeader,
  HomeHero,
  PersonalShortcutList,
  QuickStatsList,
  UrgentNoticeList,
} from "@/src/features/home";

import { PageTransition } from "@/src/shared/ui/animation";

export const HomeSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-y-auto bg-greyscale-grey-25 text-greyscale-grey-900 scrollbar-hide">
      <PageTransition>
        <div className="flex flex-col pb-6">
          <div className="px-4">
            <HomeHeader />
            <HomeHero userName="홍길동" />
          </div>
          <div className="flex flex-col gap-3 border-b-8 border-greyscale-grey-50 px-4">
            <QuickStatsList />
            <ActionCardList />
          </div>
          <div className="border-b-8 border-greyscale-grey-50 p-4">
            <PersonalShortcutList />
          </div>
          <div className="px-5 py-3">
            <UrgentNoticeList />
          </div>
        </div>
      </PageTransition>
    </section>
  );
};
