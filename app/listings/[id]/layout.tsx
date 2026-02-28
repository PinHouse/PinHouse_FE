import { DetailFilterSheet } from "@/src/features/listings/index.server";
import { ReactNode, Suspense } from "react";

export default function ListingsDetailLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <DetailFilterSheet />
      </Suspense>
    </>
  );
}
