import { DetailFilterSheet } from "@/src/features/listings/index.server";

export default function ListingsDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DetailFilterSheet />
    </>
  );
}
