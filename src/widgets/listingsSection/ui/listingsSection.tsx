"use client";
import {
  ListingFilterPanel,
  ListingFilterPartialSheet,
  ListingsContent,
  ListingsHeaders,
} from "@/src/features/listings";

export const ListingsSection = () => {
  return (
    <section className="flex h-full w-full flex-col justify-between overflow-y-auto px-5 scrollbar-hide">
      <div className="flex flex-col gap-2">
        <ListingsHeaders />
        <div className="-mx-5">
          <ListingFilterPanel />
        </div>
        <div className="min-h-0 flex-1">
          <ListingsContent />
        </div>
      </div>
      <ListingFilterPartialSheet />
    </section>
  );
};
