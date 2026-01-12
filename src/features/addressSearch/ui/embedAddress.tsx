import { useAddressStore } from "@/src/entities/address";
import { useDaumPostcode } from "../hook/useDaumPostcode";
import { IconButton } from "@/src/shared/ui/button/iconButton";

import { AddressTip } from "./addressTip";
import { SearchLine } from "@/src/assets/icons/home";

export const EmbedAddress = () => {
  const { address, setAddress, isEmbed } = useAddressStore();
  const { embedRef, openEmbed } = useDaumPostcode(
    data => setAddress(data.address),
    "경기도 성남시 분당구 분당동 "
  );

  return (
    <>
      <IconButton size={"lg"} variant={"ghost"}>
        <div className="flex w-full items-center gap-3" onClick={openEmbed}>
          <SearchLine />
          <span className="text-text-tertiary">
            <p className="text-sm">{address === "" ? "주소를 입력해주세요" : address}</p>
          </span>
        </div>
      </IconButton>
      {!isEmbed ? <AddressTip /> : null}

      <div
        ref={embedRef}
        className="mt-1 h-64 w-full rounded-lg border-none transition-all duration-300"
        style={{ display: "none" }}
      />
    </>
  );
};
