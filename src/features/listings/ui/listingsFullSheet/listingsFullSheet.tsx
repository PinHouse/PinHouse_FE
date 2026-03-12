"use client";
import { AnimatePresence } from "framer-motion";
import { ListingFilterPartialSheetHooks } from "./hooks/hooks";
import { FilterSheetContainer } from "./components/filterSheetContainer";
import { FilterSheetHeader } from "./components/filterSheetHeader";
import { FilterSheetContent } from "./components/filterSheetContent";
import { FilterSheetFooter } from "./components/filterSheetFooter";
import { UseCheckBox } from "./components/useCheckBox";
import { ListingSheet } from "./components/listingSheet";

export const ListingFilterPartialSheet = () => {
  const { open, scrollRef, isAtBottom, displayTotal, handleScroll, handleCloseSheet } =
    ListingFilterPartialSheetHooks();

  return (
    <AnimatePresence>
      {open && (
        <FilterSheetContainer onDismiss={handleCloseSheet}>
          <FilterSheetHeader onClose={handleCloseSheet} />
          <FilterSheetContent scrollRef={scrollRef} onScroll={handleScroll} isAtBottom={isAtBottom}>
            <div className="space-y-6">
              <UseCheckBox />
              <ListingSheet />
            </div>
          </FilterSheetContent>
          <FilterSheetFooter total={displayTotal} onApply={handleCloseSheet} />
        </FilterSheetContainer>
      )}
    </AnimatePresence>
  );
};
