import { ResultLifecycle } from "./resultLifecycle";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function HomeSearchResults({
  searchParams,
}: {
  searchParams: { q?: string; query?: string };
}) {
  const params = searchParams;

  const q =
    typeof params.q === "string" ? params.q : typeof params.query === "string" ? params.query : "";

  return <ResultLifecycle q={q} />;
}
