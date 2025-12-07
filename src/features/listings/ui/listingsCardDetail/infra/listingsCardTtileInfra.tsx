import { ListingsCardTileProps } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { ReactNode, useMemo } from "react";
import { formatMinutes } from "../../../model";

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

export const ListingsCardTileDetails = ({
  listing,
}: {
  listing: ListingsCardTileProps["listing"];
}) => {
  const highlights = useMemo(() => listing.highlights?.filter(Boolean) ?? [], [listing.highlights]);
  const routes = useMemo(() => listing.mainRoutes ?? [], [listing.mainRoutes]);
  const roomTypes = useMemo(() => listing.roomTypesDetail ?? [], [listing.roomTypesDetail]);
  const infraTags = useMemo(() => listing.infra ?? [], [listing.infra]);

  return (
    <div className="mt-3 space-y-4 border-t border-dashed border-greyscale-grey-100 pt-3">
      {highlights.length > 0 && (
        <div className="rounded-lg bg-greyscale-grey-25 p-3">
          <p className="mb-2 text-xs font-semibold text-primary-blue-300">필터 이유</p>
          <div className="space-y-1 text-xs text-greyscale-grey-600">
            {highlights.map((text, index) => (
              <p key={`${text}-${index}`} className="leading-relaxed">
                • {text}
              </p>
            ))}
          </div>
        </div>
      )}

      <DetailSection title="주요 노선" showAction>
        {routes.length === 0 ? (
          <EmptyDetail>등록된 노선 정보가 없어요.</EmptyDetail>
        ) : (
          <div className="space-y-3">
            {routes.map(route => (
              <div
                key={route.id}
                className="rounded-lg border border-greyscale-grey-75 p-3 text-sm text-greyscale-grey-700"
              >
                <div className="flex items-center justify-between text-sm font-semibold text-greyscale-grey-900">
                  <p>{route.label}</p>
                  <span className="text-xs font-medium text-greyscale-grey-500">
                    {route.distanceKm ? `약 ${route.distanceKm}km · ` : ""}
                    {route.minutes ? formatMinutes(route.minutes) : "이동시간 정보 없음"}
                  </span>
                </div>
                {route.description && (
                  <p className="mt-1 text-xs font-medium text-greyscale-grey-500">
                    {route.description}
                  </p>
                )}
                {route.stations && route.stations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {route.stations.map(station => (
                      <span
                        key={station}
                        className="rounded-full bg-greyscale-grey-50 px-2 py-0.5 text-[11px] font-semibold text-greyscale-grey-600"
                      >
                        {station}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
