export type ListingsCacheEntry<T> = {
  expiresAt: number;
  value: T;
};

export interface ListingsCacheAdapter {
  get<T>(key: string): Promise<ListingsCacheEntry<T> | null>;
  set<T>(key: string, entry: ListingsCacheEntry<T>): Promise<void>;
  deleteByPrefix(prefix: string): Promise<void>;
}

class InMemoryListingsCacheAdapter implements ListingsCacheAdapter {
  private readonly store = new Map<string, ListingsCacheEntry<unknown>>();

  async get<T>(key: string) {
    const entry = this.store.get(key);
    return (entry as ListingsCacheEntry<T> | undefined) ?? null;
  }

  async set<T>(key: string, entry: ListingsCacheEntry<T>) {
    this.store.set(key, entry);
  }

  async deleteByPrefix(prefix: string) {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
  }
}

let listingsCacheAdapter: ListingsCacheAdapter = new InMemoryListingsCacheAdapter();

export function getListingsCacheAdapter() {
  return listingsCacheAdapter;
}

export function setListingsCacheAdapter(adapter: ListingsCacheAdapter) {
  listingsCacheAdapter = adapter;
}
