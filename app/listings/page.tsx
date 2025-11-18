"use client";
import { useFilterSheetStore } from "@/src/features/listings/model/listingsStore";
import { ListingFilterPartialSheet } from "@/src/features/listings/ui/listingsFullSheet.tsx/listingsFullSheet";
import { ListingsSection } from "@/src/widgets/listings";

export default function Listings() {
  const open = useFilterSheetStore(state => state.open);
  return (
    <main className="flex h-full flex-col">
      <ListingsSection />
      <ListingFilterPartialSheet />
    </main>
  );
}
