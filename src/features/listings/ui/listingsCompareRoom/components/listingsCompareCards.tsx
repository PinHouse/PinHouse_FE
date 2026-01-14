import { UnitType } from "@/src/entities/listings/model/type";
import { formatNumber } from "@/src/shared/lib/numberFormat";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { LikeType } from "../../../hooks/listingsHooks";

export const ListingCompareCard = (unit: UnitType) => {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-white">
      <div className="relative h-[92px] w-full rounded-t-lg bg-greyscale-grey-25">
        <div className="absolute right-2 top-2 rounded-full">
          <LikeType
            id={unit.typeId}
            liked={unit.isLiked}
            type="ROOM"
            resetQuery={["useListingRoomTypeDetail"]}
          />
        </div>
        {unit.group.map(item => (
          <div className="absolute top-[70px] pl-1 text-xs-12" key={item}>
            <TagButton
              key={item}
              size="xxs"
              variant="ghost"
              className="rounded-md border border-greyscale-grey-100 bg-white text-xs font-bold text-greyscale-grey-400"
            >
              {item}
            </TagButton>
          </div>
        ))}
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-center justify-between">
          <p className="line-clamp-1 text-sm font-semibold">{unit.complex.name}</p>
          <button className="text-greyscale-grey-400">⋮</button>
        </div>
        <div className="mb-1 flex gap-4">
          <p className="flex flex-col text-xs text-greyscale-grey-600">
            <span>보증금 </span>
            <span>{formatNumber(unit.cost.totalDeposit)}만원</span>
          </p>

          <p className="flex flex-col text-xs text-greyscale-grey-600">
            <span>월임대료 </span>
            <span>{formatNumber(unit.cost.monthlyRent)}만원</span>
          </p>
        </div>

        <div className="flex gap-4">
          <p className="flex flex-col text-xs text-greyscale-grey-600">
            <span>전용면적 </span>
            <span>
              {unit.area.exclusiveAreaM2}m<sup>2</sup> ({unit.area.exclusiveAreaPyeong}
              )평
            </span>
          </p>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1">
          {unit.nearbyFacilities.map((tag, index) => (
            <span
              key={index}
              className="truncate rounded-md border border-greyscale-grey-200 py-[2px] text-center text-xs text-greyscale-grey-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
