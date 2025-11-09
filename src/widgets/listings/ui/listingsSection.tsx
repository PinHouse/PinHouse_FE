"use client";
import { ListingsHeaders } from "@/src/features/listings";
import { ListingFilterPanel } from "@/src/features/listings/ui/listingsFilter/listingsFilterPanel";

export const ListingsSection = () => {
  return (
    <section className="flex h-full w-full flex-col justify-between overflow-hidden px-5 py-5">
      <div className="flex flex-col gap-2">
        <ListingsHeaders />
        <div className="-mx-5">
          <ListingFilterPanel />
        </div>
      </div>
    </section>
  );
};
