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
  /** 우측 상단 X 버튼 노출 여부. true일 때만 표시 */
  showCloseButton?: boolean;
  /** X 버튼 또는 외부 클릭으로 닫을 때 호출 (showCloseButton 사용 시 상태 정리용) */
  onClose?: () => void;
}
