"use client";

import { QuickSearchNextButton, QuickSearchSectionProps } from "@/src/features/quickSearch";
import ChooseDistance from "@/src/features/quickSearch/ui/chooseDistance/chooseDistance";
import ChoosePinPoint from "@/src/features/quickSearch/ui/choosePinPoint/choosePinPoint";
import ChooseLivingNumber from "@/src/features/quickSearch/ui/chooseLivingNumber/chooseLivingNumber";
import { QuickSearchProgressBar } from "@/src/features/quickSearch/ui/common/quickSearchProgressBar";
import QuickSearchStepCard from "@/src/features/quickSearch/ui/common/quickSearchStepCard";
import { PageTransition } from "@/src/shared/ui/animation";
import ChooseRoomSize from "@/src/features/quickSearch/ui/chooseRoomSize/chooseRoomSize";
import ChooseBudget from "@/src/features/quickSearch/ui/chooseBudget/chooseBudget";

export const QuickSearchSection = ({
  title,
  description,
  isFillAll,
  boldRange,
  type,
  progress,
}: QuickSearchSectionProps) => {
  return (
    <section className="flex h-full w-full flex-col px-5">
      <QuickSearchProgressBar progress={progress} />
      <PageTransition>
        <div className="flex flex-col py-10">
          <QuickSearchStepCard
            title={title}
            description={description}
            isFillAll={isFillAll}
            boldRange={boldRange}
          />
        </div>
        {type === "choosePinPoint" && <ChoosePinPoint />}
        {type === "chooseDistance" && <ChooseDistance />}
        {type === "chooseLivingNumber" && <ChooseLivingNumber />}
        {type === "chooseRoomSize" && <ChooseRoomSize />}
        {type === "chooseBudget" && <ChooseBudget />}
      </PageTransition>
      <div className="w-full flex-none pb-3">
        <QuickSearchNextButton />
      </div>
    </section>
  );
};
