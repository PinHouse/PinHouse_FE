"use client";
import { EmbedAddress, EmbedAddressClose } from "@/src/features/addressSearch";
import Script from "next/script";

export const AddresWidgets = () => {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
      <EmbedAddressClose />
      <EmbedAddress />
    </div>
  );
};
