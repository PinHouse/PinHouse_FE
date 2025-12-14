import { ListingsSection } from "@/src/widgets/listingsSection";
import { Suspense } from "react";

export default function Listings() {
  return (
    <main className="flex h-full flex-col">
      <Suspense fallback={null}>
        <ListingsSection />
      </Suspense>
    </main>
  );
}
