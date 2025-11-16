"use client";

import { useParams } from "next/navigation";
import { quickSearchStepCardContentMap } from "@/src/features/quickSearch/model";
import { QuickSearchSection } from "@/src/widgets/quickSearchSection/ui/quickSearchSection";

export default function QuickSearchPage() {
  const { type } = useParams() as { type: string };
  const content = quickSearchStepCardContentMap[type as keyof typeof quickSearchStepCardContentMap];

  if (!content) return <div>잘못된 접근입니다.</div>;

  return (
    <main className="flex h-full flex-col">
      <QuickSearchSection
        title={content.title}
        description={content.description}
        isFillAll={content.isFillAll}
        boldRange={Array.from(content.boldRange)}
        type={type as keyof typeof quickSearchStepCardContentMap}
        progress={content.progress}
      />
    </main>
  );
}
