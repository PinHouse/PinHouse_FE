import { HomeSheet } from "@/src/features/home/index.server";
import { ReactNode, Suspense } from "react";

export default function HomeFullSheet({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      {children}
      <HomeSheet />
    </Suspense>
  );
}
