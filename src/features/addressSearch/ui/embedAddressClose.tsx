import { CloseButton } from "@/src/assets/icons/button";
import { useRouter } from "next/navigation";

export const EmbedAddressClose = () => {
  const router = useRouter();
  const embedClose = () => router.back();
  return (
    <div className="flex w-full justify-end">
      <CloseButton onClick={embedClose} />
    </div>
  );
};
