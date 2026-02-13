"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapPin } from "@/src/assets/icons/onboarding";
import { useAddressStore } from "@/src/entities/address";
import { AddressSearch } from "@/src/features/addressSearch";
import { useAddPinpoint } from "@/src/features/mypage/hooks/useAddPinpoint";
import {
  MYPAGE_LABEL_PINPOINTS,
  MYPAGE_PINPOINTS_ADD_BUTTON,
  MYPAGE_PINPOINTS_DEFAULT_NAME,
  MYPAGE_PINPOINTS_DESCRIPTION,
} from "@/src/features/mypage/model/mypageConstants";
import { Button } from "@/src/shared/lib/headlessUi";

/**
 * 마이페이지 핀포인트 설정 화면 위젯
 */
export const PinpointsSection = () => {
  const router = useRouter();
  const { address, pinPoint } = useAddressStore();
  const { addPinpoint, isLoading } = useAddPinpoint({
    onSuccess: () => {
      router.push("/mypage");
    },
    onError: () => {
      toast.error("핀포인트 추가에 실패했어요. 잠시 후 다시 시도해주세요.");
    },
  });

  const handleAddPinpoint = () => {
    if (!address) return;
    addPinpoint({
      address,
      name: pinPoint || MYPAGE_PINPOINTS_DEFAULT_NAME,
      first: true,
    });
  };

  return (
    <div className="p-5">
      <div className="mb-3 flex flex-1 flex-col items-center justify-start text-center">
        <div className="inline-flex sm:min-w-[200px] sm:max-w-[250px] md:min-w-[250px] md:max-w-[300px] lg:min-w-[280px] lg:max-w-[340px]">
          <MapPin />
        </div>
        <h2 className="text-lg font-bold text-greyscale-grey-900">
          {MYPAGE_LABEL_PINPOINTS}
        </h2>
        <p className="mt-1 whitespace-pre-line text-center text-sm text-greyscale-grey-500">
          {MYPAGE_PINPOINTS_DESCRIPTION}
        </p>
        <div className="mt-5 w-full">
          <AddressSearch />
        </div>
      </div>
      {address ? (
        <Button
          type="button"
          size="md"
          variant="solid"
          disabled={isLoading}
          onClick={handleAddPinpoint}
        >
          {MYPAGE_PINPOINTS_ADD_BUTTON}
        </Button>
      ) : null}
    </div>
  );
};
