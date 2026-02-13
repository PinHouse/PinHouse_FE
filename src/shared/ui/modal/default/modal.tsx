import { cn } from "@/src/shared/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/src/shared/lib/headlessUi/modal/dialog";

import { discription, modalContainerPreset, modalOverlayPreset } from "../preset";
import { ModalProps } from "./type";
import { Button } from "@/src/shared/lib/headlessUi";

export const Modal = ({
  children,
  open = true,
  type,
  className,
  overlayClassName,
  onButtonClick,
  confirmButtonDisabled = false,
}: ModalProps) => {
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
                type="button"
                variant={index === 0 ? "outline" : "solid"}
                theme={index === 0 ? "black" : "mainBlue"}
                size="sm"
                className={cn("min-w-[140px] flex-1")}
                disabled={index === 1 ? confirmButtonDisabled : undefined}
                onClick={() => onButtonClick?.(index, item)}
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
