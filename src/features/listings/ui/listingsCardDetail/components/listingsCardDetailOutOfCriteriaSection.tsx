import { ListingsCardTile } from "./listingsCardTile";
import type { ListingsCardDetailListing } from "./listingsCardDetailComplexSection";
import { ComplexList } from "@/src/entities/listings/model/type";

type ListingsCardDetailOutOfCriteriaSectionProps = {
  description: string;
  listings: ComplexList;
};

export const ListingsCardDetailOutOfCriteriaSection = ({
  description,
  listings,
}: ListingsCardDetailOutOfCriteriaSectionProps) => {
  return (
    <div className="p-5">
      <p className="mb-2 text-base-17 font-bold text-gray-700">{description}</p>
      {listings.complexes.map(complex => (
        <ListingsCardTile key={complex.id} listing={complex} variant="muted" />
      ))}
    </div>
  );
};
