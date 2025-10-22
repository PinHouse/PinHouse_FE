export interface AddressState {
  address: string;
  pinPoint: string;
  setAddress: (value: string) => void;
  setPinPoint: (value: string) => void;
  reset: () => void;
}
