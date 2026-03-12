import { ReactNode, RefObject } from "react";

export const FilterSheetContent = ({
  children,
  scrollRef,
  onScroll,
  isAtBottom,
}: {
  children: ReactNode;
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  isAtBottom: boolean;
}) => {
  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="no-scrollbar h-full overflow-y-auto px-5 py-5"
      >
        {children}
      </div>
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white to-transparent transition-all duration-300 ${
          isAtBottom ? "h-0 opacity-0" : "h-16 opacity-100"
        }`}
      />
    </div>
  );
};
