"use client";

import { eligibilityContentMap } from "@/src/features/eligibility/model/eligibilityContentMap";
import { EligibilitySection } from "@/src/widgets/eligibilitySection";
import { useParams } from "next/navigation";

export default function EligibilityPage() {
  const { type } = useParams() as { type: string };

  return (
    <main className="flex h-full flex-col">
      <EligibilitySection type={type as keyof typeof eligibilityContentMap} />
    </main>
  );
}
