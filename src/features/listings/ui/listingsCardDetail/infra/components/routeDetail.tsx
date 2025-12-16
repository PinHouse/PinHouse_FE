import { useListingRouteDetail } from "@/src/entities/listings/hooks/useListingDetailHooks";
import { ListingRouteInfo } from "@/src/entities/listings/model/type";

export const RouteDetail = ({ listingId }: { listingId: string }) => {
  const { data, isFetching } = useListingRouteDetail<ListingRouteInfo, { pinPointId: string }>({
    id: listingId,
    queryK: "useListingRoomTypeDetail",
    url: "transit",
    params: {
      pinPointId: "fec9aba3-0fd9-4b75-bebf-9cb7641fd251",
    },
  });

  return <div>노선정보</div>;
};
