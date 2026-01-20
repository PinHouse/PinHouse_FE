import { Suspense } from "react";
import { ListingsSearch } from "@/src/widgets/listingsSection";

export default function properySearch() {
  return (
    <Suspense fallback={null}>
      <ListingsSearch />
    </Suspense>
  );
}
