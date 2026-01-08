// app/listings/search/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { LeftButton } from "@/src/assets/icons/button";
import { useRouteStore } from "@/src/features/home/model/homeStore";

export const SearchForm = () => {
  const router = useRouter();
  const { prevPath, reset } = useRouteStore();
  const handleRouter = () => {
    router.push(prevPath ? prevPath : `/listings`);
    reset();
  };

  return (
    <div className="items-cente relative flex p-5">
      <LeftButton
        onClick={handleRouter}
        className="h-6 w-6 cursor-pointer text-greyscale-grey-200"
      />
      <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
        검색
      </p>
    </div>
  );
};
