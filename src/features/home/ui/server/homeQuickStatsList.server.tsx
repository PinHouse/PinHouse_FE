import { HomePushPin } from "@/src/assets/icons/home/homePushpin";
import { HomeFiveoclock } from "@/src/assets/icons/home/HomeFiveoclock";
import { QuickStatsList } from "@/src/features/home";

export const HomeQuickStatsListServer = () => {
  return (
    <div className="relative grid grid-cols-2 grid-rows-[auto,1fr] rounded-2xl bg-white p-4">
      <div className="flex items-center gap-1 text-sm text-greyscale-grey-500">
        <HomePushPin width={17} height={17} />
        <span>핀포인트</span>
      </div>

      <div className="flex items-center gap-1 pl-6 text-sm text-greyscale-grey-500">
        <HomeFiveoclock width={15} height={15} />
        <span>최대시간</span>
      </div>
      <QuickStatsList />
      <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-greyscale-grey-200" />
    </div>
  );
};
