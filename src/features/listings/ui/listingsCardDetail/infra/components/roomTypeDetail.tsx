import { useListingRoomTypeDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";

export const RoomTypeDetail = () => {
  const { data } = useListingRoomTypeDetail("19408#1");

  return <div>방타입</div>;
};
