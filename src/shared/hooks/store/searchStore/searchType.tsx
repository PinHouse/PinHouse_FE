// export interface SearchState {
//   searchQuery: string[];
//   setSearchQuery: (value: string) => void;
//   removeSearchQuery: (value: string) => void;
//   reset: () => void;
// }
export interface SearchState {
  searchQuery: string[];
  query: string;
  setQuery: (value: string) => void;
  setSearchQuery: (value: string) => void;
  removeSearchQuery: (value: string) => void;
  resetQuery: () => void;
  reset: () => void;
}
