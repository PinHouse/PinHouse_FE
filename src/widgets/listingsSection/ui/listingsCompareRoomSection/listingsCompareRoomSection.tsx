import { ListingCompareHeader } from "@/src/features/listings/ui/listingsCompareRoom";
import { PageTransition } from "@/src/shared/ui/animation";

export const ListingCompareSection = ({ id }: { id: string }) => {
  return (
    <section className="mx-auto min-h-full w-full">
      <PageTransition>
        <ListingCompareHeader />
      </PageTransition>
    </section>
  );
};
