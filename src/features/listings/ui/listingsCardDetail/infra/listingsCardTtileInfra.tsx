import { ListingsCardTileProps } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { ReactNode, useMemo } from "react";
import { ComplexesInfo, ComplexInfo, formatMinutes, majorRoute } from "../../../model";
import { FireIcon } from "@/src/assets/icons/onboarding/fire";
import { useListingRentalDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";

const DetailSection = ({
  title,
  children,
  showAction = false,
}: {
  title: string;
  children: ReactNode;
  showAction?: boolean;
}) => {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold text-greyscale-grey-800">{title}</p>
        {showAction && (
          <button
            type="button"
            className="text-xs font-semibold text-primary-blue-300 transition-colors hover:text-primary-blue-400"
          >
            자세히
          </button>
        )}
      </div>
      {children}
    </section>
  );
};

const EmptyDetail = ({ children }: { children: ReactNode }) => (
  <p className="rounded-lg bg-greyscale-grey-25 px-3 py-2 text-xs font-medium text-greyscale-grey-500">
    {children}
  </p>
);

// export const ComplexesInfoItem = ({ info }: { info: ComplexInfo }) => {
//   const Icon = info.icon;

//   return (
//     <div className="flex items-center gap-1">
//       <Icon stroke="#BBBAC5" /> <span>{info.label}</span>
//     </div>
//   );
// };

export const ListingsCardTileDetails = ({
  listing,
}: {
  listing: ListingsCardTileProps["listing"];
}) => {
  const roomTypes = useMemo(() => listing.roomTypesDetail ?? [], [listing.roomTypesDetail]);
  const infraTags = useMemo(() => listing.infra ?? [], [listing.infra]);

  const { data: infra } = useListingRentalDetail(listing.id);

  return (
    <div className="mt-3 space-y-4 border-t border-dashed border-greyscale-grey-100 pt-3">
      {/* {highlights.length > 0 && ( */}
      <div className="rounded-lg bg-greyscale-grey-25 p-3">
        <div className="space-y-1 text-xs text-greyscale-grey-600">
          {infra?.rentalInfo.map(info => (
            <div key={info.key} className="flex items-center gap-1 leading-relaxed">
              <ComplexesInfo infoKey={info.key} infoValue={info.value} />
            </div>
          ))}
        </div>
      </div>
      {/* )} */}

      <DetailSection title="주요 노선" showAction>
        <div className="rounded-lg border border-greyscale-grey-75 p-3">
          <p className="text-xs font-medium text-greyscale-grey-500">
            핀포인트로부터 {majorRoute.distanceKm}Km · 약 {formatMinutes(majorRoute.totalMinutes)}
            거리
          </p>
          <div className="mt-2 flex items-end gap-2">
            {/* {majorRoute.legs.map(seg => (
              <SegmentPill key={seg.id} seg={seg} />
            ))} */}
          </div>
        </div>
      </DetailSection>

      <DetailSection title="주변 환경 정보">
        {infraTags.length === 0 ? (
          <EmptyDetail>주변 정보가 제공되지 않았어요.</EmptyDetail>
        ) : (
          <div className="flex flex-wrap gap-2">
            {infraTags.map(tag => (
              <TagButton
                key={tag}
                size="xs"
                variant="ghost"
                className="rounded-2xl border border-greyscale-grey-75 px-3 py-1 text-xs font-semibold text-greyscale-grey-700"
              >
                {tag}
              </TagButton>
            ))}
          </div>
        )}
      </DetailSection>

      <DetailSection title="방 타입" showAction>
        {roomTypes.length === 0 ? (
          <EmptyDetail>방 타입 정보가 제공되지 않았어요.</EmptyDetail>
        ) : (
          <div className="space-y-2">
            {roomTypes.map(room => (
              <div key={room.id} className="rounded-xl border border-greyscale-grey-75 p-3">
                <div className="flex items-center justify-between text-sm font-semibold text-greyscale-grey-900">
                  <p>{room.name}</p>
                  {(room.deposit || room.monthlyRent) && (
                    <span className="text-xs font-medium text-greyscale-grey-700">
                      {room.deposit && <span>보증금 {room.deposit}</span>}
                      {room.deposit && room.monthlyRent && (
                        <span className="mx-1 text-greyscale-grey-300">|</span>
                      )}
                      {room.monthlyRent && <span>월세 {room.monthlyRent}</span>}
                    </span>
                  )}
                </div>
                {(room.supplyArea || room.exclusiveArea) && (
                  <p className="mt-1 text-xs font-medium text-greyscale-grey-500">
                    {room.supplyArea && <span>공급 {room.supplyArea}</span>}
                    {room.supplyArea && room.exclusiveArea && <span className="mx-1">·</span>}
                    {room.exclusiveArea && <span>전용 {room.exclusiveArea}</span>}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </DetailSection>
    </div>
  );
};
