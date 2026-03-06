import { useHomeSheetStore } from "@/src/features/home/model/homeStore";
import { useOAuthStore } from "@/src/features/login/model";
import { splitAddress } from "@/src/shared/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * @returns Home action section state and handlers
 */
export const useHomeUseHooks = () => {
  const openSheet = useHomeSheetStore(s => s.openSheet);
  const { pinPointId, pinPointName } = useOAuthStore();
  const [line1, line2] = splitAddress(pinPointName ?? "핀포인트 이름 설정해주세요");
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * @key Selected home sheet mode key
   */
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
    onSelectSection,
  };
};

/**
 * @returns Home action-card routing handlers
 */
export const useHomeActionCard = () => {
  const router = useRouter();

  /** @description Move to listings page */
  const onListingsPageMove = () => {
    router.push("/listings");
  };

  /** @description Move to eligibility recommended page */
  const onEligibilityPageMove = () => {
    router.push("/eligibility/recommended");
  };

  return {
    onListingsPageMove,
    onEligibilityPageMove,
  };
};
