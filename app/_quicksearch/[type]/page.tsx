import { QuickSearchPageClient } from "./quickSearchPageClient";

type QuickSearchPageProps = {
  params: Promise<{
    type: string;
  }>;
};

export default async function QuickSearchPage({ params }: QuickSearchPageProps) {
  const { type } = await params;

  return <QuickSearchPageClient type={type} />;
}
