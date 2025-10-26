import { cn } from "@/src/shared/lib/utils";
import { Button } from "../../button/deafult";
import { modalButtonPreset } from "../../button/preset";
import { discription, modalContainerPreset, modalOverlayPreset } from "../preset";
import { ModalProps } from "./type";

export const Modal = ({ children, open = true, type, className, overlayClassName }: ModalProps) => {
  if (!open) return null;

  const modalScript = discription[type];

  return (
    <div className={cn(modalOverlayPreset, overlayClassName)}>
      <div className={cn(modalContainerPreset, className)}>
        <div className="flex flex-col gap-5">
          <p className="text-md mt-1 whitespace-pre-line text-center font-bold">
            {children ?? modalScript?.descript}
          </p>

          <div className="flex items-center justify-center gap-2">
            {modalScript?.btnlabel?.map(item => (
              <Button
                key={item}
                {...modalButtonPreset}
                className="min-w-[140px] flex-1 font-bold active:bg-button-light active:font-sans active:text-button-text"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
