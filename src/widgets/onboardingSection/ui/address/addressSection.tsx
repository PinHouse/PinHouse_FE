"use client";
import { EmbedAddress, EmbedAddressClose } from "@/src/features/addressSearch";
import { PageTransition } from "@/src/shared/ui/animation";
import Script from "next/script";

export const AddresWidgets = () => {
  return (
    <section className="flex h-full w-full flex-col justify-between overflow-hidden px-5 py-5">
      <PageTransition>
        <div className="flex flex-col gap-5">
          <Script
            src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            strategy="afterInteractive"
          />
          <EmbedAddressClose />
          <EmbedAddress />
        </div>
      </PageTransition>
    </section>
  );
};
