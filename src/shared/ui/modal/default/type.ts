import { ReactNode } from "react";

export interface ModalDescriptProps {
  descript: string;
  btnlabel: string[];
}

export interface ModalDescriptMap {
  [key: string]: ModalDescriptProps;
}

export type ModalType = keyof ModalDescriptMap;

export interface ModalProps {
  children?: ReactNode;
  open?: boolean;
  type: ModalType;
  className?: string;
  overlayClassName?: string;
}
