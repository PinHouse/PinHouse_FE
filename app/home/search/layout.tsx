import { HomeSearchSection } from "@/src/widgets/homeSection";
import { ReactNode, Suspense } from "react";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="sticky top-0 z-20 bg-white">
        <Suspense fallback={null}>
          <HomeSearchSection />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
