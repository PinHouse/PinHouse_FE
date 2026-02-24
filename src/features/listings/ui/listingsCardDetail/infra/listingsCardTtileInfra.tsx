import { ListingsCardTileProps } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { TransportIconRenderer } from "./TransportIconRenderer";
import { InfraSheet } from "./infraSheet";
import { ComplexesInfo } from "../../../hooks/listingsHooks";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";
import { DetailSection, EmptyDetail } from "@/src/features/listings/hooks/useListingsCardTileHooks";
import { useListingRentalDetailHooks, useRouteSheetHooks } from "@/src/features/listings/hooks";

export const ListingsCardTileDetails = ({
  listing,
}: {
  listing: ListingsCardTileProps["listing"];
}) => {
  const { infra, infraData, roomTypes, rentalInfo, route } = useListingRentalDetailHooks(listing);
  const { sheetState, openRouteSheet, openInfraSheet, openRoomSheet, setSheetState } =
    useRouteSheetHooks(infra);

  if (!infra || !route || !roomTypes) {
    return <SmallSpinner />;
  }
  return (
    <div className="rounded-b-lg border-t border-greyscale-grey-100 bg-bgColor-mute">
      {/* 기본 정보 */}
      <div className="border-b border-greyscale-grey-100 bg-greyscale-grey-25">
        <div className="space-y-1 p-3 text-xs text-greyscale-grey-600">
          {rentalInfo?.map(info => (
            <div key={info.key} className="flex items-center gap-1 leading-relaxed">
              <ComplexesInfo infoKey={info.key} infoValue={info.value} />
            </div>
          ))}
        </div>
      </div>

      {/* 주요 노선 */}
      <div className="border-b border-greyscale-grey-100 p-3">
        <DetailSection title="주요 노선" showAction onOpen={openRouteSheet}>
          <p className="text-sm font-medium text-greyscale-grey-600">
            핀포인트로부터 {route?.totalDistance}Km · 약 {route?.totalTime} 거리
          </p>

          <div className="flex w-full items-center justify-start overflow-hidden pt-2">
            <TransportIconRenderer totalTime={route?.totalTime} routes={route} />
          </div>
        </DetailSection>
      </div>

      {/* 주변 환경 정보 */}
      <div className="border-b border-greyscale-grey-100 p-3">
        <DetailSection title="주변 환경 정보" showAction onOpen={openInfraSheet}>
          {infraData?.length === 0 ? (
            <EmptyDetail>주변 정보가 제공되지 않았어요.</EmptyDetail>
          ) : (
            <div className="flex flex-wrap gap-1">
              {infraData?.map((tag, index) => (
                <TagButton
                  key={`${tag}-${index}`}
                  size="xs"
                  variant="ghost"
                  className="rounded border border-greyscale-grey-75 bg-greyscale-grey-75 px-3 py-1 text-xs text-greyscale-grey-700"
                >
                  {tag}
                </TagButton>
              ))}
            </div>
          )}
        </DetailSection>
      </div>

      {/* 방 타입 */}
      <div className="p-3">
        <DetailSection title="방 타입" showAction onOpen={openRoomSheet}>
          {roomTypes?.length === 0 ? (
            <EmptyDetail>방 타입 정보가 제공되지 않았어요.</EmptyDetail>
          ) : (
            <div className="flex flex-wrap gap-1">
              {roomTypes?.map((tag, index) => (
                <TagButton
                  key={`${tag}-${index}`}
                  size="xs"
                  variant="ghost"
                  className="rounded border border-greyscale-grey-100 bg-white px-3 py-1 text-xs font-bold text-greyscale-grey-400"
                >
                  {tag}
                </TagButton>
              ))}
            </div>
          )}
        </DetailSection>
      </div>

      {sheetState.open && (
        <InfraSheet sheetState={sheetState} onClose={() => setSheetState({ open: false })} />
      )}
    </div>
  );
};
