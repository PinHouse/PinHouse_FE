"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/src/shared/ui/input/deafult";
import { useAddressStore } from "@/src/entities/address";
import { AddressButton } from "./addressButton";

declare global {
  interface Window {
    daum: any;
  }
}

export const AddressSearch = () => {
  const { address, setPinPoint } = useAddressStore();
  const onPinPointChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinPoint(e.target.value);
  };

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
