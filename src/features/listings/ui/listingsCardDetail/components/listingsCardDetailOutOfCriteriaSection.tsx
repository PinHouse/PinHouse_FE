import { ListingsCardTile } from "./listingsCardTile";
import { ComplexList } from "@/src/entities/listings/model/type";

type ListingsCardDetailOutOfCriteriaSectionProps = {
  listings: ComplexList,
  className?: string
};

export const ListingsCardDetailOutOfCriteriaSection = ({
 listings,
 className,
}: ListingsCardDetailOutOfCriteriaSectionProps) => {
  if (listings.complexes.length === 0) return;
  return (
    <div className="p-5">
      <p className="mb-2 text-base-17 font-bold text-gray-700">필터 기준을 벗어난 단지예요</p>
      {listings.complexes.map(complex => (
        <ListingsCardTile key={complex.id} listing={complex} variant="muted" />
      ))}
    </div>
  );
};
