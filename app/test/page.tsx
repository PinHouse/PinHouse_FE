"use client";

import EligibilityLoadingState from "@/src/features/eligibility/ui/common/eligibilityLoadingState";

export default function DefaultTest() {
  return (
    <main className="flex h-full flex-col">
      <EligibilityLoadingState />
    </main>
  );
}
