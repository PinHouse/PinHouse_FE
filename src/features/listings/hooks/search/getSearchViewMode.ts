type SearchViewMode = "EMPTY" | "NO_RESULT" | "RESULT";

export function getSearchViewMode(args: {
  keyword: string;
  debounced: string;
  isFetching: boolean;
  resultCount: number;
}): SearchViewMode {
  if (!args.keyword) return "EMPTY";
  const loading = args.isFetching && !!args.debounced;
  if (!loading && args.resultCount === 0 && !!args.debounced) return "NO_RESULT";
  return "RESULT";
}
