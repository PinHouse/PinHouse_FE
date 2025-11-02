"use client";
import Script from "next/script";
import { ChangeEvent, useEffect } from "react";
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
  const { address, setAddress, setPinPoint, isEmbed } = useAddressStore();
  const { embedRef, openEmbed, clearEmbed } = useDaumPostcode(
    data => setAddress(data.address),
    "분당"
  );

  const onPinPointChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinPoint(e.target.value);
    clearEmbed();
  };

  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
      <div className="flex flex-col gap-2">
        {address ? (
          <>
            <p className="text-left text-sm font-bold">핀포인트 명을 입력해주세요(학교/직장)</p>
            <Input
              size={"lg"}
              variant={"ghost"}
              placeholder="핀포인트 1"
              onChange={onPinPointChange}
              className="text-sm placeholder:text-sm placeholder:font-medium placeholder:text-gray-400"
            />
          </>
        ) : null}
        <IconButton size={"lg"} variant={"ghost"}>
          <div className="flex w-full items-center gap-3" onClick={openEmbed}>
            <Search />
            <span className="text-text-tertiary">
              <p className="text-sm">{address === "" ? "주소를 입력해주세요" : address}</p>
            </span>
          </div>
        </IconButton>
        {!isEmbed ? (
          <ul className="space-y-1 pl-2 text-sm font-semibold text-gray-700">
            <li className="flex items-start gap-2">
              <span>주소검색 Tip</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[7px] size-1.5 rounded-full bg-black" />
              <span>도로명 + 건물번호 (예: 한강길 123)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[7px] size-1.5 rounded-full bg-black" />
              <span>동/읍/면/리 + 번지 (예: 노을동 1-23)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[7px] size-1.5 rounded-full bg-black" />
              <span>건물명, 아파트명 (예: 주황아파트)</span>
            </li>
          </ul>
        ) : null}

        <div
          ref={embedRef}
          className="mt-1 h-64 w-full rounded-lg border-none transition-all duration-300"
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};
