import { EligibilityPage } from "@/src/features/eligibility";

export const dynamic = "force-dynamic";
type SearchParams = Record<string, string | string[] | undefined>;
export default function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return <EligibilityPage searchParams={searchParams} />;
}
