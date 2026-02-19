"use client";
import { ArrowUpRight } from "@/src/assets/icons/button/arrowUpRight";
import { useNoticeCount, useRecommendedNotice } from "@/src/entities/home/hooks/homeHooks";
import { useHomeActionCard } from "@/src/features/home/ui/homeUseHooks/homeUseHooks";
import { useDiagnosisResultStore } from "@/src/features/eligibility/model/diagnosisResultStore";

export const ActionCardList = () => {
  const { data } = useNoticeCount();
  const { data: recommend } = useRecommendedNotice();
  const hasDiagnosisResult = useDiagnosisResultStore(state => state.result != null);

  const count = data?.count;
  const { onListingsPageMove, onEligibilityPageMove } = useHomeActionCard();

  return (
    <div className="mb-4 flex gap-4">
      <div
        className="flex min-h-[88px] flex-1 cursor-pointer flex-col justify-between rounded-lg bg-primary-blue-300 px-4 py-3"
        onClick={onListingsPageMove}
      >
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-bold leading-tight opacity-[0.7] hover:cursor-pointer">
            핀포인트 기준
          </p>
          <div className="flex items-center justify-center">
            <ArrowUpRight />
          </div>
        </div>

        <p className="text-xl font-bold leading-tight text-white">{count}건</p>
      </div>

      <div
        className="flex min-h-[88px] flex-1 cursor-pointer flex-col justify-between rounded-lg px-4 py-3"
        style={{ background: "#FFBA18" }}
        onClick={onEligibilityPageMove}
      >
        <div className="flex items-center justify-between text-white">
          <p className="text-sm font-bold leading-tight opacity-[0.7] hover:cursor-pointer">
            자격진단 기준
          </p>

          <div className="flex items-center justify-center">
            <ArrowUpRight />
          </div>
        </div>

        <div className="flex gap-2 text-xl leading-tight">
          <p className="font-bold text-white">
            {recommend?.pages?.[0]?.totalElements ?? 0}건
          </p>
          <span
            className="flex items-center rounded-xl bg-greyscale-grey-25 p-1 text-xs font-bold"
            style={{ color: "#FFBA18" }}
          >
            <p>{hasDiagnosisResult ? "100% 완료" : "0% 완료"}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
