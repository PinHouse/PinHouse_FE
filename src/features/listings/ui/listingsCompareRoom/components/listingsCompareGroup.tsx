// ListingCompareCard.tsx
import { UnitType } from "@/src/entities/listings/model/type";
import { formatNumber } from "@/src/shared/lib/numberFormat";
import { LikeType } from "../../../hooks/listingsHooks";
import { CompareDefaultImage } from "@/src/assets/images/compare/compare";
import { ListingCompareCardGroup } from "./listingsCompareCardsGroup";
import { SheetState } from "../../../model";

interface Props {
  unit: UnitType;
  onOpenSheet: (state: SheetState) => void;
}

export const ListingsCompareGroup = ({ unit, onOpenSheet }: Props) => {
  return (
    <article
      className="rounded-xl border bg-white hover:cursor-pointer active:bg-blue-50"
      onClick={() =>
        onOpenSheet({
          open: true,
          section: "room",
          listingId: unit.complex.complexId,
        })
      }
    >
      <div className="relative h-[92px] w-full overflow-hidden rounded-t-xl bg-greyscale-grey-25">
        <CompareDefaultImage className="absolute inset-0 top-4 h-full w-full object-cover opacity-90" />

        <div className="absolute left-0 right-0 top-0 z-0 p-2">
          <div className="flex items-start justify-between">
            <ListingCompareCardGroup group={unit.group} />

            <span
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <LikeType
                id={unit.typeId}
                liked={unit.isLiked}
                type="ROOM"
                resetQuery={["compareNotice"]}
              />
            </span>
          </div>
        </div>
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
            <span className="text-greyscale-grey-400">전용면적</span>
            <span>
              약 {unit.area.exclusiveAreaM2}m<sup>2</sup> ({unit.area.exclusiveAreaPyeong}평)
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};
