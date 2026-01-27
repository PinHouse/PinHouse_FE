import { ListingsCardTileProps } from "@/src/entities/listings/model/type";
import { TagButton } from "@/src/shared/ui/button/tagButton";
import { ReactNode, useCallback, useState } from "react";

import { useListingRentalDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { TransportIconRenderer } from "./TransportIconRenderer";
import { Button } from "@/src/shared/lib/headlessUi";
import { InfraSheet } from "./infraSheet";
import { SheetState } from "../../../model";
import { ComplexesInfo } from "../../../hooks/listingsHooks";
import { SmallSpinner } from "@/src/shared/ui/spinner/small/smallSpinner";

interface DetailSectionProps {
  title: string;
  showAction?: boolean;
  children: ReactNode;
  onOpen: () => void;
}

const DetailSection = ({ title, children, showAction = false, onOpen }: DetailSectionProps) => {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold text-greyscale-grey-800">{title}</p>
        {showAction && (
          <Button
            type="button"
            theme={"grey"}
            variant={"ghost"}
            className="text-primary-blue-300 hover:text-primary-blue-500"
            size={"xs"}
            radius={"sm"}
            onClick={onOpen}
          >
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
  const { data: infra } = useListingRentalDetail(listing.id);
  const [sheetState, setSheetState] = useState<SheetState>({
    open: false,
  });

  const route = infra?.distance;
  const infraData = infra?.infra;
  const roomTypes = infra?.unitTypes;
  const rentalInfo = infra?.rentalInfo;

  const openRouteSheet = useCallback(() => {
    if (!infra?.id) return;
    setSheetState({ open: true, section: "route", listingId: infra.id });
  }, [infra?.id]);

  const openInfraSheet = useCallback(() => {
    if (!infra?.id) return;
    setSheetState({ open: true, section: "infra", listingId: infra.id });
  }, [infra?.id]);

  const openRoomSheet = useCallback(() => {
    if (!infra?.id) return;
    setSheetState({ open: true, section: "room", listingId: infra.id });
  }, [infra?.id]);

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
