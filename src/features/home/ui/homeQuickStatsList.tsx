import { CaretDown } from "@/src/assets/icons/button/caretDown";
import { HomeFiveoclock } from "@/src/assets/icons/home/HomeFiveoclock";
import { HomePushPin } from "@/src/assets/icons/home/homePushpin";

export const QuickStatsList = () => {
  return (
    <div className="relative flex items-center rounded-2xl bg-white px-4 py-4">
      {/* LEFT */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-1 text-xs text-greyscale-grey-500">
          <span>
            <HomePushPin width={17} height={17} />
          </span>
          <span>핀포인트</span>
        </div>

        <button className="flex items-center gap-1 text-lg font-semibold">
          핀포인트명
          <span className="pl-1 text-greyscale-grey-400">
            <CaretDown />
          </span>
        </button>
      </div>

      {/* DIVIDER */}
      <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-greyscale-grey-200" />

      {/* RIGHT */}
      <div className="flex flex-1 flex-col items-start gap-1 pl-6">
        <div className="flex items-center gap-1 text-xs text-greyscale-grey-500">
          <span>
            <HomeFiveoclock width={15} height={15} />
          </span>
          <span>최대시간</span>
        </div>

        <button className="flex items-center gap-1 text-lg font-semibold">
          00시간 00분
          <span className="pl-1 text-greyscale-grey-400">
            <CaretDown />
          </span>
        </button>
      </div>
    </div>
  );
};
