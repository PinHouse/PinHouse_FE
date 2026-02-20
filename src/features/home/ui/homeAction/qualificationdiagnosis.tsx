import { ArrowUpRight } from "@/src/assets/icons/button/arrowUpRight";
import { useRecommendedNotice } from "@/src/entities/home/hooks/homeHooks";

type QualificationDiagnosisProps = {
  onEligibilityPageMove: () => void;
};
export const QualificationDiagnosis = ({ onEligibilityPageMove }: QualificationDiagnosisProps) => {
  const { data: recommend } = useRecommendedNotice();
  const count = recommend?.pages[0]?.totalCount;

  return (
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
        <p className="font-bold text-white">{count ? count : "0"}건</p>
        <span
          className="flex items-center rounded-xl bg-greyscale-grey-25 p-1 text-xs font-bold"
          style={{ color: "#FFBA18" }}
        >
          <p>0% 완료</p>
        </span>
      </div>
    </div>
  );
};
