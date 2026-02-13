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
  onButtonClick?: (buttonIndex: number, buttonLabel: string) => void;
  /** 확인(두 번째) 버튼 비활성화 (예: 제출 중) */
  confirmButtonDisabled?: boolean;
}
