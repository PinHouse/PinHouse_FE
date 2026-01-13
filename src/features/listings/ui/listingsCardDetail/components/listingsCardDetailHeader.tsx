"use client";
import { LeftButton } from "@/src/assets/icons/button";
import { useRouteStore } from "@/src/features/home/model/homeStore";
import { useRouter } from "next/navigation";

export const ListingsCardDetailHeader = () => {
  const router = useRouter();
  const { prevPath, reset } = useRouteStore();
  const handleRouter = () => {
    const nextPath = prevPath ?? "/listings";
    reset();
    router.push(nextPath);
  };

  return (
    <header className="sticky top-0 z-10 border-b border-greyscale-grey-100 bg-white">
      <div className="flex items-center p-5 text-base font-semibold">
        <LeftButton className="h-6 w-6 text-greyscale-grey-200" onClick={handleRouter} />
        <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg-19 font-bold text-greyscale-grey-800">
          공고 상세
        </p>
      </div>
    </header>
  );
};
