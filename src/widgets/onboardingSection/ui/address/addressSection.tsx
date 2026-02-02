"use client";
import { useAddressStore } from "@/src/entities/address";
import { EmbedAddress, EmbedAddressClose } from "@/src/features/addressSearch";
import { Button } from "@/src/shared/lib/headlessUi";
import { PageTransition } from "@/src/shared/ui/animation";
import { useRouter } from "next/navigation";
import Script from "next/script";

export const AddresWidgets = () => {
  const { address } = useAddressStore();
  const router = useRouter();
  const handleSetAddress = () => {
    router.back();
  };
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
          {address ? (
            <Button size={"md"} variant={"solid"} onClick={handleSetAddress}>
              선택한 주소로 설정
            </Button>
          ) : null}
        </div>
      </PageTransition>
    </section>
  );
};
