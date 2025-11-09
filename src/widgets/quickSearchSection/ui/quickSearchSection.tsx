"use client";

import { QuickSearchNextButton, QuickSearchSectionProps } from "@/src/features/quickSearch";
import { QuickSearchProgressBar } from "@/src/features/quickSearch/ui/quickSearchProgressBar";
import QuickSearchStepCard from "@/src/features/quickSearch/ui/quickSearchStepCard";
import { PageTransition } from "@/src/shared/ui/animation";

export const QuickSearchSection = ({
  title,
  description,
  isFillAll,
  boldRange,
  type,
  progress,
}: QuickSearchSectionProps) => {
  return (
    <section className="flex h-full w-full flex-col">
      <QuickSearchProgressBar progress={progress} />
      <PageTransition>
        <div className="flex flex-col px-5 py-10">
          <QuickSearchStepCard
            title={title}
            description={description}
            isFillAll={isFillAll}
            boldRange={boldRange}
          />
        </div>
      </PageTransition>
      <div className="w-full flex-none py-2.5">
        <QuickSearchNextButton />
      </div>
    </section>
  );
};
