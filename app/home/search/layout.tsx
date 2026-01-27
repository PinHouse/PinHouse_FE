import { HomeSerachSection } from "@/src/widgets/homeSection";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HomeSerachSection />
      {children}
    </div>
  );
}
