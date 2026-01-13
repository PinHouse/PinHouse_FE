"use client";
import { CloseButton } from "@/src/assets/icons/button";
import { useRouter } from "next/navigation";

export const ListingCompareHeader = ({ id }: { id: string }) => {
  const router = useRouter();

  const onClose = () => {
    router.replace(`/listings/${id}`);
  };

  return (
    <header className="sticky top-0 z-10 border-b border-greyscale-grey-100 bg-white">
      <div className="flex items-center p-5 text-base font-semibold">
        <p className="absolute left-1/2 -translate-x-1/2 text-lg-19 font-bold">방 비교</p>
        <CloseButton onClick={onClose} className="ml-auto" />
      </div>
    </header>
  );
};
