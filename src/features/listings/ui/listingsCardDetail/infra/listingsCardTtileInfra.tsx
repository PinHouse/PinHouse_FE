import { ListingsCardTileProps } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { ReactNode, useMemo } from "react";
import { ComplexesInfo, parseMinutes } from "../../../model";
import { useListingRentalDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { TransportIconRenderer } from "./TransportIconRenderer";
import { Button } from "@/src/shared/lib/headlessUi";

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
          <Button type="button" theme={"grey"} className="text-sm">
            자세히
          </Button>
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

export const ListingsCardTileDetails = ({
  listing,
}: {
  listing: ListingsCardTileProps["listing"];
}) => {
  const roomTypes = useMemo(() => listing.roomTypesDetail ?? [], [listing.roomTypesDetail]);
  const { data: infra, isFetching } = useListingRentalDetail(listing.id);
  const route = infra?.distance;
  const infraData = infra?.infra;
  console.log(infra);
  if (isFetching || !route) {
    return <SmallSpinner />;
  }
  return (
    <div className="mt-3 space-y-4 border-t border-dashed border-greyscale-grey-100 pt-3">
      <div className="rounded-lg bg-greyscale-grey-25 p-3">
        <div className="space-y-1 text-xs text-greyscale-grey-600">
          {infra?.rentalInfo.map(info => (
            <div key={info.key} className="flex items-center gap-1 leading-relaxed">
              <ComplexesInfo infoKey={info.key} infoValue={info.value} />
            </div>
          ))}
        </div>
      </div>

      <DetailSection title="주요 노선" showAction>
        <div className="rounded-lg border border-greyscale-grey-75 p-3">
          <div>
            <p className="text-sm font-medium text-greyscale-grey-600">
              핀포인트로부터 {route?.totalDistance}Km · 약 {route?.totalTime}
              거리
            </p>

            <div className="flex w-full items-center justify-start overflow-hidden pt-2">
              <TransportIconRenderer totalTime={route?.totalTime} routes={route} />
            </div>
          </div>
        </div>
      </DetailSection>

      <DetailSection title="주변 환경 정보">
        {infraData?.length === 0 ? (
          <EmptyDetail>주변 정보가 제공되지 않았어요.</EmptyDetail>
        ) : (
          <div className="flex flex-wrap gap-2">
            {infraData?.map(tag => (
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
