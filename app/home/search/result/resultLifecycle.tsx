// app/home/search/result/ResultLifecycle.tsx
"use client";
import { useEffect, useRef } from "react";
import { useSearchState } from "@/src/shared/hooks/store";
import { HomeResultSection } from "@/src/widgets/homeSection";

export const ResultLifecycle = ({ q }: { q: string }) => {
  const { setSearchQuery } = useSearchState();

  const committedRef = useRef(q);

  useEffect(() => {
    return () => {
      if (committedRef.current) {
        setSearchQuery(committedRef.current);
      }
    };
  }, [setSearchQuery]);

  return <HomeResultSection q={q} />;
};
