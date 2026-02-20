import { ArrowUpRight } from "@/src/assets/icons/button/arrowUpRight";
import { useNoticeCount } from "@/src/entities/home/hooks/homeHooks";
import { useOAuthStore } from "@/src/features/login/model";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SliceResponse } from "@/src/entities/home/model/type";
import { ListingItem } from "@/src/entities/listings/model/type";
import { getNoticeByPinPoint } from "@/src/entities/home/interface/homeInterface";
import { HOME_RECOMMENDED_ENDPOINT } from "@/src/shared/api";

type PinpointStandardProps = {
  onListingsPageMove: () => void;
};

export const PinpointStandard = ({ onListingsPageMove }: PinpointStandardProps) => {
  const { data } = useNoticeCount();
  const count = data?.count;
  return (
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
  );
};
