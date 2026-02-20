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
  MYPAGE_PINPOINTS_HEADER_TITLE,
} from "@/src/features/mypage/model/mypageConstants";
import { Button } from "@/src/shared/lib/headlessUi";
import { DefaultHeader } from "@/src/shared/ui/header";
import { PageTransition } from "@/src/shared/ui/animation/pageTransition";

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
    <div>
      <PageTransition>
        <header
          className="relative flex items-center px-5 py-4"
          aria-label={MYPAGE_PINPOINTS_HEADER_TITLE}
        >
          <DefaultHeader title={MYPAGE_PINPOINTS_HEADER_TITLE} path="/mypage" />
        </header>
        <div className="border-b border-greyscale-grey-25"></div>
        <div className="mb-3 flex flex-1 flex-col items-center justify-start px-5 text-center">
          <div className="inline-flex sm:min-w-[200px] sm:max-w-[250px] md:min-w-[250px] md:max-w-[300px] lg:min-w-[280px] lg:max-w-[340px]">
            <MapPin />
          </div>
          <h2 className="text-lg font-bold text-greyscale-grey-900">{MYPAGE_LABEL_PINPOINTS}</h2>
          <p className="mt-1 whitespace-pre-line text-center text-sm text-greyscale-grey-500">
            {MYPAGE_PINPOINTS_DESCRIPTION}
          </p>
          <div className="mt-5 w-full">
            <AddressSearch />
          </div>
        </div>
        {address ? (
          <div className="px-5">
            <Button
              type="button"
              size="md"
              variant="solid"
              disabled={isLoading}
              onClick={handleAddPinpoint}
            >
              {MYPAGE_PINPOINTS_ADD_BUTTON}
            </Button>
          </div>
        ) : null}
      </PageTransition>
    </div>
  );
};
