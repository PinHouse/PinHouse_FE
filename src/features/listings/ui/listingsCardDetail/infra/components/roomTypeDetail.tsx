import { useListingRoomTypeDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";

export const RoomTypeDetail = ({ listingId }: { listingId: string }) => {
  const { data } = useListingRoomTypeDetail(listingId);

  return <div>방타입</div>;
};
