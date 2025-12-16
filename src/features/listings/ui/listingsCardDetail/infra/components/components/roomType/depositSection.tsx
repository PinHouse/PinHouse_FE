import { useState, memo, useMemo } from "react";
import { DepositTabs } from "./depositTab";
import { DepositDetail } from "./depositDetail";
import { DepositTab } from "@/src/features/listings/model";

interface DepositSectionProps {
  deposit?: {
    min?: any;
    normal?: any;
    max?: any;
  };
}

export const DepositSection = memo(({ deposit }: DepositSectionProps) => {
  const [tab, setTab] = useState<DepositTab>("min");

  const currentDeposit = useMemo(() => {
    return deposit?.[tab];
  }, [deposit, tab]);

  return (
    <div className="border-t border-greyscale-grey-50">
      <DepositTabs tab={tab} onChange={setTab} />
      <DepositDetail deposit={currentDeposit} />
    </div>
  );
});
