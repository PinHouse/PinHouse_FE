import { CloseButton } from "@/src/assets/icons/button";

export const ListingCompareHeader = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-greyscale-grey-100 bg-white">
      <div className="flex items-center p-5 text-base font-semibold">
        <CloseButton className="ml-auto" />
        <p className="absolute left-1/2 -translate-x-1/2 text-base text-lg-19 font-bold">방 비교</p>
      </div>
    </header>
  );
};
