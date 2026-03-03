import { EligibilityRecommendedContent } from "@/src/features/eligibility";

export default function EligibilityRecommendedPage() {
  return (
    <main className="flex h-full flex-col">
      <EligibilityRecommendedContent enableInfiniteScroll />
    </main>
  );
}
