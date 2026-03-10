export interface EditPinpointPayload {
  id: string;
  address: string;
  name: string;
}

export interface AddressState {
  address: string;
  pinPoint: string;
  isEmbed: boolean;
  /** 수정 모드일 때만 설정 (홈 핀포인트 설정 화면에서 사용) */
  editingPinpointId: string | null;
  setAddress: (value: string) => void;
  setPinPoint: (value: string) => void;
  setIsEmbed: (value: boolean) => void;
  setEditPinpoint: (payload: EditPinpointPayload) => void;
  clearEditPinpoint: () => void;
  reset: () => void;
}
