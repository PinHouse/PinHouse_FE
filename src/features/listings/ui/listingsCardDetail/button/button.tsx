import { useDetailFilterResultButton } from "@/src/features/listings/ui/listingsCardDetail/hooks/hooks";

type ListingCardDetailProps = {
  filteredCount: number;
  handleCloseSheet: () => void;
};
export const ListingCardDetailOut = ({ filteredCount, handleCloseSheet }: ListingCardDetailProps) => {
  return (
    <div>
      <button
        onClick={handleCloseSheet}
        type="button"
        className="w-full rounded-xl bg-greyscale-grey-900 py-4 text-base font-semibold leading-[140%] tracking-[-0.01em] text-white"
      >
        {filteredCount}개의 단지가 있어요
      </button>
    </div>
  );
};