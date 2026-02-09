import { useHomeSheetStore } from "@/src/features/home/model/homeStore";
import { useOAuthStore } from "@/src/features/login/model";
import { splitAddress } from "@/src/shared/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export const useHomeUseHooks = () => {
  const openSheet = useHomeSheetStore(s => s.openSheet);
  const { pinPointId, pinPointName } = useOAuthStore();
  const [line1, line2] = splitAddress(pinPointName ?? "핀포인트 이름 설정해주세요");
  const searchParams = useSearchParams();
  const router = useRouter();
  const onSelectSection = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", key);
    params.set("id", pinPointId ?? "");
    router.push(`?${params.toString()}`, { scroll: false });
    openSheet();
  };

  return {
    line1,
    line2,
    onSelectSection
  }
}