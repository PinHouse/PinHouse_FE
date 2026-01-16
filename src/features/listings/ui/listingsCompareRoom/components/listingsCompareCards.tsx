import { UnitType } from "@/src/entities/listings/model/type";
import { formatNumber } from "@/src/shared/lib/numberFormat";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { LikeType } from "../../../hooks/listingsHooks";

export const ListingCompareCard = (unit: UnitType) => {
  return (
    <article className="w-[160px] rounded-xl border bg-white">
      {/* HEADER */}
      <div className="h-[92px] w-full rounded-t-lg rounded-tl-xl rounded-tr-xl bg-greyscale-grey-25 p-2">
        <div className="flex justify-between rounded-full">
          {unit.group.map(item => (
            <div className="text-xs-12" key={item}>
              <TagButton
                key={item}
                size="xxs"
                variant="ghost"
                className="rounded-md border bg-white text-xs font-bold text-greyscale-grey-400"
              >
                {item}
              </TagButton>
            </div>
          ))}
          <LikeType
            id={unit.typeId}
            liked={unit.isLiked}
            type="ROOM"
            resetQuery={["useListingRoomTypeDetail"]}
          />
        </div>
        {/* <div className="mx-3 h-[120px] rounded-lg bg-[linear-gradient(45deg,#f2f2f2_25%,transparent_25%,transparent_50%,#f2f2f2_50%,#f2f2f2_75%,transparent_75%,transparent)] bg-[length:12px_12px]" /> */}
      </div>

      <div className="p-3">
        <p className="mb-1 text-xs text-gray-400">단지이름</p>
        <p className="mb-1 line-clamp-1 text-sm font-semibold text-greyscale-grey-900">
          {unit.complex.name}
        </p>
        <p className="mb-1 text-xs text-blue-500">핀포인트 거리 · 0시간 0분</p>
        <div className="mb-1 flex gap-4">
          <p className="flex flex-col text-xs">
            <span className="text-greyscale-grey-400">보증금</span>
            <span className="whitespace-nowrap">{formatNumber(unit.cost.totalDeposit)}만원</span>
          </p>

          <p className="flex flex-col text-xs">
            <span className="text-greyscale-grey-400">월임대료</span>
            <span className="whitespace-nowrap">{formatNumber(unit.cost.monthlyRent)}원</span>
          </p>
        </div>
        <div className="flex gap-4">
          <p className="flex flex-col text-xs text-greyscale-grey-600">
            <span className="text-greyscale-grey-400">전용면적 </span>
            <span>
              약{unit.area.exclusiveAreaM2}m<sup>2</sup> ({unit.area.exclusiveAreaPyeong}
              )평
            </span>
          </p>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1">
          {unit.nearbyFacilities.map((tag, index) => (
            <TagButton
              key={index}
              size="xxs"
              variant="solid"
              className="items-center rounded-sm border-none border-greyscale-grey-100 text-[10px]"
            >
              <span className="block w-full truncate whitespace-nowrap text-[10px] text-greyscale-grey-400">
                {tag}
              </span>
            </TagButton>
          ))}
        </div>
      </div>
    </article>
  );
};
