"use client";
import { homeSheetParseObject } from "@/src/features/listings/model";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useHomeSheetStore } from "../../model/homeStore";
import { useMemo } from "react";
import { PinpointRowBox } from "./pinpointRowBoxs";
import { MaxTimeSliderBox } from "./maxTime";
import { Button } from "@/src/shared/lib/headlessUi";
import { cn } from "@/lib/utils";
import { usePinhouseRouter } from "@/src/features/home/hooks/hooks";
import { PinpointSelectedButton } from "@/src/features/home/ui/components/components/pinpointSelectedButton";

export const HomeSheet = () => {
  const open = useHomeSheetStore(s => s.open);
  const searchParams = useSearchParams();
  const mode = useMemo(() => {
    return homeSheetParseObject(searchParams);
  }, [searchParams]);
  const { replaceRouter, handleSetPinpoint } = usePinhouseRouter();

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
            className="fixed bottom-0 left-0 right-0 flex h-[55vh] flex-col rounded-t-2xl bg-white p-5 shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {/* <div className="mx-auto mb-3 mt-2 h-1.5 w-12 rounded-full bg-gray-300" /> */}

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{mode?.label}</h2>
              <button onClick={replaceRouter}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <motion.div
                key={mode?.key}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex h-full flex-col justify-between"
              >
                {mode?.key === "pinpoints" && <PinpointRowBox />}
                {mode?.key === "maxTime" && <MaxTimeSliderBox />}
                {!mode ? null : (
                  <PinpointSelectedButton mode={mode?.key} handleSetPinpoint={handleSetPinpoint} />
                )}
                {/*<div className="flex gap-3">*/}
                {/*  <Button*/}
                {/*    className={cn(*/}
                {/*      "flex-1 border-greyscale-grey-100 bg-white text-sm font-medium text-gray-800",*/}
                {/*      mode?.key === "maxTime" ? "hidden" : "block"*/}
                {/*    )}*/}
                {/*    variant="outline"*/}
                {/*    radius="sm"*/}
                {/*    onClick={handleSetPinpoint}*/}
                {/*  >*/}
                {/*    핀포인트 설정*/}
                {/*  </Button>*/}
                {/*  <Button*/}
                {/*    className="flex-1 bg-[#2E2A3B] text-sm font-medium text-white"*/}
                {/*    radius="sm"*/}
                {/*  >*/}
                {/*    저장하기*/}
                {/*  </Button>*/}
                {/*</div>*/}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
