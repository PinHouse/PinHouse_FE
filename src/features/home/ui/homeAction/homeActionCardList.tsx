"use client";
import { useHomeActionCard } from "@/src/features/home/ui/homeUseHooks/homeUseHooks";
import { PinpointStandard } from "@/src/features/home/ui/homeAction/pinpointStandard";
import { QualificationDiagnosis } from "@/src/features/home/ui/homeAction/qualificationdiagnosis";

export const ActionCardList = () => {
  const { onListingsPageMove, onEligibilityPageMove } = useHomeActionCard();

  return (
    <div className="mb-4 flex gap-4">
      <PinpointStandard onListingsPageMove={onListingsPageMove} />
      <QualificationDiagnosis onEligibilityPageMove={onEligibilityPageMove} />
    </div>
  );
};
