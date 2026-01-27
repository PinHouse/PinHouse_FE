import { ResultLifecycle } from "./resultLifecycle";

export default async function HomeSearchResults({
  searchParams,
}: {
  searchParams: { q?: string; query?: string };
}) {
  const params = await searchParams;

  const q =
    typeof params.q === "string" ? params.q : typeof params.query === "string" ? params.query : "";

  return <ResultLifecycle q={q} />;
}
