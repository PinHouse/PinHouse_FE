import { SearchHistory, SearchForm, SearchResults } from "@/src/features/listings";
import { PageTransition } from "@/src/shared/ui/animation";

export const ListingsSearch = () => {
  return (
    <section className="relative h-full overflow-hidden">
      <PageTransition>
        <div className="flex h-screen flex-col">
          <div className="shrink-0">
            <SearchForm />
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <SearchHistory />
            <SearchResults />
          </div>
        </div>
      </PageTransition>
    </section>
  );
};
