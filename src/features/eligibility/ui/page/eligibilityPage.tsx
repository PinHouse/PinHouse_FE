import { getDiagnosisLatestOnServer } from "@/src/features/eligibility/api/diagnosisServerApi";
import { EligibilityPageClient } from "@/src/features/eligibility/ui/page/eligibilityPageClient";

type SearchParams = Record<string, string | string[] | undefined>;

export async function EligibilityPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const isEligibilityOnly = Object.keys(params ?? {}).length === 0;
  const initialLatest = await getDiagnosisLatestOnServer();
  return (
    <EligibilityPageClient initialLatest={initialLatest} isEligibilityOnly={isEligibilityOnly} />
  );
}
