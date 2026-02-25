import { HomeSearchSection } from "@/src/widgets/homeSection";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="sticky top-0 z-20 bg-white">
        <HomeSearchSection />
      </div>
      {children}
    </div>
  );
}
