"use client";
import { LeftButton } from "@/src/assets/icons/button";
import { SearchBar } from "@/src/features/home";
import { useRouter } from "next/navigation";

export const HomeSerachSection = () => {
  const router = useRouter();

  const handleRouter = () => {
    router.push("/home");
  };

  return (
    <div className="items-cente flex items-center gap-2 rounded-none border-b px-5 pb-2 pt-5">
      <LeftButton
        onClick={handleRouter}
        className="h-8 w-8 cursor-pointer text-greyscale-grey-400"
      />
      <SearchBar />
    </div>
  );
};
