import { useRouter, useSearchParams } from "next/navigation";
import { useSearchState } from "@/src/shared/hooks/store";
import { useListingsSearchState } from "@/src/features/listings/model";

export function useListingsSearchRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = (searchParams.get("query") ?? "").trim();
  const { setSearchQuery } = useSearchState();
  const searchState = useListingsSearchState();

  const submit = (next: string) => {
    if (!next.trim()) return;
    router.push(`/listings/search?query=${next}`);
    setSearchQuery(next);
  };

  const clear = () => {
    router.push("/listings/search?query=");
    searchState.reset();
  };

  return { keyword, submit, clear };
}
