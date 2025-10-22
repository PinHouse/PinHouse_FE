"use client";
import Script from "next/script";
import { ChangeEvent } from "react";
import { IconButton } from "@/src/shared/ui/button/iconButton";
import { Search } from "@/src/assets/icons/home";
import { useDaumPostcode } from "../hook/useDaumPostcode";
import { Input } from "@/src/shared/ui/input/deafult";
import { useAddressStore } from "@/src/entities/address";

declare global {
  interface Window {
    daum: any;
  }
}

export const AddressSearch = () => {
  const { address, setAddress, setPinPoint } = useAddressStore();
  const { open } = useDaumPostcode(data => setAddress(data.address));
  const onPinPointChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinPoint(e.target.value);
  };
  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
      <div className="flex flex-col gap-2">
        {address ? (
          <Input
            size={"lg"}
            variant={"ghost"}
            placeholder="핀포인트 1"
            onChange={onPinPointChange}
            className="text-sm placeholder:text-sm placeholder:font-medium placeholder:text-gray-400"
          />
        ) : null}
        <IconButton size={"lg"} variant={"ghost"}>
          <div className="flex w-full items-center gap-3">
            <Search />
            <span className="text-text-tertiary" onClick={open}>
              <p className="text-sm">{address === "" ? "주소를 입력해주세요" : address}</p>
            </span>
          </div>
        </IconButton>
      </div>
    </>
  );
};
