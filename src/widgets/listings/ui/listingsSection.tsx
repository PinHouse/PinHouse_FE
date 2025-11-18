"use client";
import { ListingFilterPanel, ListingsContent, ListingsHeaders } from "@/src/features/listings";

export const ListingsSection = () => {
  return (
    <section className="scrollbar-hide flex h-full w-full flex-col justify-between overflow-y-auto px-5">
      <div className="flex flex-col gap-2">
        <ListingsHeaders />
        <div className="-mx-5">
          <ListingFilterPanel />
        </div>
        <div className="min-h-0 flex-1">
          <ListingsContent />
        </div>
      </div>
    </section>
  );
};
