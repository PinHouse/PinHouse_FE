import { SearchLine } from "@/src/assets/icons/home";
import { useAddressStore } from "@/src/entities/address";
import { IconButton } from "@/src/shared/ui/button/iconButton";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const AddressButton = () => {
  const { address } = useAddressStore();
  const { type } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const openEmbed = () => {
    if (pathname?.startsWith("/mypage/pinpoints")) {
      router.push("/mypage/pinpoints/address");
      return;
    }
    if (type === "agent") router.push(`${type}/address`);
    return;
  };
  return (
    <IconButton size={"lg"} variant={"ghost"}>
      <div className="flex w-full items-center gap-3" onClick={openEmbed}>
        <SearchLine />
        <span className="text-text-tertiary">
          <p className="text-sm">{address === "" ? "주소를 입력해주세요" : address}</p>
        </span>
      </div>
    </IconButton>
  );
};
