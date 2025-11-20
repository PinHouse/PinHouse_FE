export interface SearchState {
  searchQuery: string[];
  setSearchQuery: (value: string) => void;
  reset: () => void;
}
