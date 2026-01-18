// export interface SearchState {
//   searchQuery: string[];
//   setSearchQuery: (value: string) => void;
//   removeSearchQuery: (value: string) => void;
//   reset: () => void;
// }
export interface SearchState {
  searchQuery: string[];
  setSearchQuery: (value: string) => void;
  removeSearchQuery: (value: string) => void;

  reset: () => void;
}
