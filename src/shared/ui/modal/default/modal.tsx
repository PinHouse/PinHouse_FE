"use client";

import { useState, useLayoutEffect } from "react";
import { cn } from "@/src/shared/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/src/shared/lib/headlessUi/modal/dialog";
import { useMobileSheetPortal } from "@/src/shared/context/mobileSheetPortalContext";

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
  showCloseButton = false,
  onClose,
}: ModalProps) => {
  const portalRef = useMobileSheetPortal();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (portalRef?.current) setContainer(portalRef.current);
  }, [portalRef]);

  if (!open) return null;

  const modalScript = discription[type];

  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        if (!value) onClose?.();
      }}
    >
      <DialogContent
        className={cn(modalContainerPreset, className)}
        overlayClassName={cn(modalOverlayPreset, overlayClassName)}
        showCloseButton={showCloseButton}
        container={container}
      >
        <div className="flex flex-col gap-5">
          <DialogTitle className="text-md mt-1 whitespace-pre-line text-center font-bold">
            {children ?? modalScript?.descript}
          </DialogTitle>

          <div className="flex items-center justify-center gap-2">
            {modalScript?.btnlabel?.map((item, index) => {
              const isSinglePrimary = (modalScript?.btnlabel?.length ?? 0) === 1;
              const variant = isSinglePrimary ? "solid" : index === 0 ? "outline" : "solid";
              const theme = isSinglePrimary ? "mainBlue" : index === 0 ? "black" : "mainBlue";
              return (
                <Button
                  key={item}
                  type="button"
                  variant={variant}
                  theme={theme}
                  size="sm"
                  className={cn("min-w-[130px] flex-1")}
                  disabled={index === 1 ? confirmButtonDisabled : undefined}
                  onClick={() => onButtonClick?.(index, item)}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
