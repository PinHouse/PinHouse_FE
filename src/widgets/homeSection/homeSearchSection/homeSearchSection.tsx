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
    <div className="items-cente flex items-center gap-2 border-b px-5 py-2">
      <LeftButton
        onClick={handleRouter}
        className="h-8 w-8 cursor-pointer text-greyscale-grey-400"
      />
      <SearchBar />
    </div>
  );
};
