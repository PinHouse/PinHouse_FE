import { HomeScreenLogo } from "@/src/assets/icons/home/homeScreenLogo";
import { ListingsSection } from "@/src/widgets/listingsSection";
import { Suspense } from "react";

export default function Listings() {
  return (
    <main className="flex h-full flex-col">
      <Suspense
        fallback={
          <div className="flex min-h-screen w-full -translate-y-20 items-center justify-center">
            <HomeScreenLogo width={60} height={50} />
          </div>
        }
      >
        <ListingsSection />
      </Suspense>
    </main>
  );
}
