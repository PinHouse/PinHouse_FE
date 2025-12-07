import { ArrowUpArrowDown } from "@/src/assets/icons/button/arrowUpArrowDown";
import { ListingsCardTile } from "./listingsCardTile";
import { ComplexList } from "@/src/entities/listings/model/type";
import { ListingNoSearchResult } from "../../listingsNoSearchResult/listingNoSearchResult";

type ListingsCardDetailComplexSectionProps = {
  listings: ComplexList;
};

export const ListingsCardDetailComplexSection = ({
  listings,
}: ListingsCardDetailComplexSectionProps) => {
  if (!listings) return;

  const complexesCount =
    listings?.totalCount < 10 ? `0${listings?.totalCount}` : listings?.totalCount;

  return (
    <section className="border-b-[11px] border-b-greyscale-grey-25 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex gap-1 font-semibold">
          <p className="text-base-17 text-greyscale-grey-900">단지</p>
          <p className="text-base-17 text-greyscale-grey-600">{complexesCount}</p>
        </h2>
        <div className="flex gap-1">
          <span className="text-xs font-semibold text-greyscale-grey-900">핀포인트 거리 순</span>
          <ArrowUpArrowDown />
        </div>
      </div>
      {complexesCount === "00" ? (
        <div className="flex h-full flex-col items-center justify-center gap-5 pb-[55px]">
          <div>
            <ListingNoSearchResult
              text={"조건에 맞는 단지를 찾지 못했어요. <br />탐색 범위를 넓혀서 다시 탐색해 보세요"}
            />
          </div>
        </div>
      ) : (
        <>
          {listings.complexes.map(complex => (
            <ListingsCardTile key={complex.id} listing={complex} variant="default" />
          ))}
        </>
      )}
    </section>
  );
};
