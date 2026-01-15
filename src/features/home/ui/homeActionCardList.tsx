import { ArrowUpRight } from "@/src/assets/icons/button/arrowUpRight";
import { useNoticeCount } from "@/src/entities/home/hooks/homeHooks";

export const ActionCardList = () => {
  const { data } = useNoticeCount();
  const conut = data?.count;

  return (
    <div className="mb-4 flex gap-4">
      <div className="flex min-h-[88px] flex-1 flex-col justify-between rounded-lg bg-primary-blue-300 px-4 py-3">
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-bold leading-tight opacity-[0.7]">핀포인트 기준</p>
          <div className="flex items-center justify-center">
            <ArrowUpRight />
          </div>
        </div>

        <p className="text-xl font-bold leading-tight text-white">{conut}건</p>
      </div>

      <div
        className="flex min-h-[88px] flex-1 flex-col justify-between rounded-lg px-4 py-3"
        style={{ background: "#FFBA18" }}
      >
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-bold leading-tight opacity-[0.7]">자격진단 기준</p>

          <div className="flex items-center justify-center">
            <ArrowUpRight />
          </div>
        </div>

        <div className="flex gap-2 text-xl leading-tight">
          <p className="font-bold text-white">0건</p>
          <span
            className="flex items-center rounded-xl bg-greyscale-grey-25 p-1 text-xs font-bold"
            style={{ color: "#FFBA18" }}
          >
            <p>0% 완료</p>
          </span>
        </div>
      </div>
    </div>
  );
};
