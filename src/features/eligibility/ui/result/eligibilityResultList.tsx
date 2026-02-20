"use client";

import type { EligibilityData } from "@/src/features/eligibility/model/eligibilityStore";
import { getEligibilityResultListItems } from "@/src/features/eligibility/model/eligibilityResultModel";

export interface EligibilityResultListProps {
  data: EligibilityData;
}

export const EligibilityResultList = ({ data }: EligibilityResultListProps) => {
  const items = getEligibilityResultListItems(data);

  return (
    <div className="shadow-result-card rounded-lg bg-white px-5">
      <ul className="flex flex-col" role="list">
        {items.map(({ label, value }) => (
          <li key={label} className="flex items-start justify-between gap-4 px-4 py-3.5">
            <span className="flex-1 shrink-0 text-sm font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-500">
              {label}
            </span>
            <span className="min-w-0 text-right text-sm font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
