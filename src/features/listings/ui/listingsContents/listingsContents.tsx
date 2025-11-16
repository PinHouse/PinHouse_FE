import { ListingsContentHeader } from "./listingsContentsHeader";
import { ListingContentsList } from "./listingsContentsList";

export const ListingsContent = () => {
  return (
    <div className="flex h-full flex-col">
      <ListingsContentHeader />
      <div className="min-h-0 flex-1">
        <ListingContentsList />
      </div>
    </div>
  );
};
