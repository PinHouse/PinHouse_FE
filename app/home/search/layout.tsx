import { HomeSearchSection } from "@/src/widgets/homeSection";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HomeSearchSection />
      {children}
    </div>
  );
}
