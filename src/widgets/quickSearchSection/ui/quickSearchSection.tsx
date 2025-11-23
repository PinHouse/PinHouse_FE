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
import { quickSearchStepCardContentMap } from "@/src/features/quickSearch/model";

// 타입별 컴포넌트 매핑
const chooseComponents = {
  choosePinPoint: ChoosePinPoint,
  chooseDistance: ChooseDistance,
  chooseLivingNumber: ChooseLivingNumber,
  chooseRoomSize: ChooseRoomSize,
  chooseBudget: ChooseBudget,
} as const;

export const QuickSearchSection = ({
  title,
  description,
  isFillAll,
  boldRange,
  type,
  progress,
}: QuickSearchSectionProps) => {
  const ChooseComponent =
    type in chooseComponents ? chooseComponents[type as keyof typeof chooseComponents] : null;
  const needsDivider = type === "chooseBudget";

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
        {needsDivider && (
          <div className="h-[0.5rem] border-t border-greyscale-grey-50 bg-greyscale-grey-25" />
        )}
        {ChooseComponent && (
          <div className="px-5">
            <ChooseComponent />
          </div>
        )}
      </PageTransition>
      <div className="w-full flex-none px-5 pb-3">
        <QuickSearchNextButton />
      </div>
    </section>
  );
};
