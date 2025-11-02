export interface AddressState {
  address: string;
  pinPoint: string;
  isEmbed: boolean;
  setAddress: (value: string) => void;
  setPinPoint: (value: string) => void;
  setIsEmbed: (value: boolean) => void;
  reset: () => void;
}
