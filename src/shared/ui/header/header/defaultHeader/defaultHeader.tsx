"use client";
import { useRouter } from "next/navigation";
import { LeftButton } from "@/src/assets/icons/button";
import { useRouteStore } from "@/src/features/home/model/homeStore";
import { useDefaultHeader } from "@/src/shared/ui/header/header/defaultHeader/useDefaultHeader";

type DefaultHeaderProps = {
  title: string;
  path: string;
};

export const DefaultHeader = ({ title, path }: DefaultHeaderProps) => {
  const { prevPath, reset } = useRouteStore();
  const { handleRouter } = useDefaultHeader({
    path,
    prevPath,
    reset,
  });

  return (
    <>
      <LeftButton
        onClick={handleRouter}
        className="h-7 w-7 cursor-pointer text-greyscale-grey-200"
      />
      <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
        {title}
      </p>
    </>
  );
};
