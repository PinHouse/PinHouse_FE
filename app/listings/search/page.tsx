import { ListingsSearch } from "@/src/widgets/listingsSection";
import { Suspense } from "react";

export default function properySearch() {
  return (
    <Suspense fallback={null}>
      <ListingsSearch />
    </Suspense>
  );
}
