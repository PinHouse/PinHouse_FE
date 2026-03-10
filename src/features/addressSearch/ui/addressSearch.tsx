"use client";

import { Input } from "@/src/shared/ui/input/deafult";
import { AddressButton } from "./addressButton";
import { useAddressSearchInput } from "../hook/useAddressSearchInput";

declare global {
  interface Window {
    daum: any;
  }
}

export interface AddressSearchProps {
  /** 있으면 input 초기/현재 값으로 사용 */
  inputValue?: string;
}

export const AddressSearch = ({ inputValue }: AddressSearchProps) => {
  const { address, inputDisplayValue, onPinPointChange } =
    useAddressSearchInput(inputValue);

  return (
    <>
      <div className="flex flex-col gap-2">
        {address ? (
          <>
            <p className="text-left text-sm font-bold">핀포인트 명을 입력해주세요(학교/직장)</p>
            <Input
              size={"default"}
              variant={"default"}
              placeholder="핀포인트"
              value={inputDisplayValue}
              onChange={onPinPointChange}
              className="text-sm placeholder:text-sm placeholder:font-medium placeholder:text-gray-400"
            />
          </>
        ) : null}
        <AddressButton />
      </div>
    </>
  );
};
