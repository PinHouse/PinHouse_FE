// app/listings/search/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { LeftButton } from "@/src/assets/icons/button";
import { useRouteStore } from "@/src/features/home/model/homeStore";
import { DefaultHeader } from "@/src/shared/ui/header";

export const SearchForm = () => {
  return (
    <div className="items-cente relative flex p-5">
      <DefaultHeader title={"검색"} path={"/listings"} />
    </div>
  );
};
