// app/listings/search/page.tsx
"use client";

import { DefaultHeader } from "@/src/shared/ui/header";

export const SearchForm = () => {
  return (
    <div className="items-cente relative flex p-5">
      <DefaultHeader title={"검색"} path={"/listings"} />
    </div>
  );
};
