"use client";
import { homeSheetParseObject } from "@/src/features/listings/model";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useHomeSheetStore } from "../../model/homeStore";
import { useMemo } from "react";
import { PinpointRowBox } from "./pinpointRowBoxs";
import { MaxTimeSliderBox } from "./maxTime";

export const HomeSheet = () => {
  const open = useHomeSheetStore(s => s.open);
  const closeSheet = useHomeSheetStore(s => s.closeSheet);
  const searchParams = useSearchParams();

  const mode = useMemo(() => {
    return homeSheetParseObject(searchParams);
  }, [searchParams]);

  const router = useRouter();
  const replaceRouter = () => {
    router.replace("/home");
    closeSheet();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40"
            onClick={replaceRouter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 flex h-[55vh] flex-col rounded-t-2xl bg-white shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="mx-auto mb-3 mt-2 h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="flex items-center justify-between px-8">
              <h2 className="text-lg font-bold">{mode?.label}</h2>
              <button onClick={replaceRouter}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              <motion.div
                key={mode?.key}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full"
              >
                {mode?.key === "pinpoints" && <PinpointRowBox />}
                {mode?.key === "maxTime" && <MaxTimeSliderBox />}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
