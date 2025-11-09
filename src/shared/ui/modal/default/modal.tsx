import { cn } from "@/src/shared/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/src/shared/lib/headlessUi/modal/dialog";

import { Button } from "../../button/deafult";
import { modalButtonPreset } from "../../button/preset";
import { discription, modalContainerPreset, modalOverlayPreset } from "../preset";
import { ModalProps } from "./type";

export const Modal = ({ children, open = true, type, className, overlayClassName }: ModalProps) => {
  if (!open) return null;

  const modalScript = discription[type];

  return (
    <Dialog open={open}>
      <DialogContent
        className={cn(modalContainerPreset, className)}
        overlayClassName={cn(modalOverlayPreset, overlayClassName)}
        showCloseButton={false}
      >
        <div className="flex flex-col gap-5">
          <DialogTitle className="text-md mt-1 whitespace-pre-line text-center font-bold">
            {children ?? modalScript?.descript}
          </DialogTitle>

          <div className="flex items-center justify-center gap-2">
            {modalScript?.btnlabel?.map((item, index) => (
              <Button
                key={item}
                {...modalButtonPreset}
                variant={index === 0 ? "ghost" : "solid"}
                className={cn(
                  "min-w-[140px] flex-1 font-bold",
                  index === 0
                    ? "border-[#CECED7] bg-white text-[#1F1F25]"
                    : "bg-[#306FFF] text-white"
                )}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
