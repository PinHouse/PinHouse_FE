"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapPin } from "@/src/assets/icons/onboarding";
import { useAddressStore } from "@/src/entities/address";
import { AddressSearch } from "@/src/features/addressSearch";
import { useAddPinpoint } from "@/src/features/mypage/hooks/useAddPinpoint";
import { DefaultHeader } from "@/src/shared/ui/header";
import { Button } from "@/src/shared/lib/headlessUi";
import { PageTransition } from "@/src/shared/ui/animation/pageTransition";
import { HOME_PINPOINT_HEADER_TITLE } from "@/src/features/home/model/homePinpointConstants";
import { MYPAGE_PINPOINTS_DEFAULT_NAME } from "@/src/features/mypage/model/mypageConstants";

/** 홈 > 핀포인트 추가 주소 검색 화면 */
export function HomePinpointAddressSection() {
  const router = useRouter();
  const { address, pinPoint } = useAddressStore();
  const { addPinpoint, isLoading } = useAddPinpoint({
    onSuccess: () => {
      router.push("/home/pinpoints");
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
          aria-label={HOME_PINPOINT_HEADER_TITLE}
        >
          <DefaultHeader title={HOME_PINPOINT_HEADER_TITLE} path="/home/pinpoints" />
        </header>
        <div className="border-b border-greyscale-grey-25" />
        <div className="mb-3 flex flex-1 flex-col items-center justify-start px-5 pt-6 text-center">
          <div className="inline-flex sm:min-w-[200px] sm:max-w-[250px] md:min-w-[250px] md:max-w-[300px] lg:min-w-[280px] lg:max-w-[340px]">
            <MapPin />
          </div>
          <h2 className="text-lg font-bold text-greyscale-grey-900">핀포인트 추가</h2>
          <p className="mt-1 text-center text-sm text-greyscale-grey-500">
            주소를 검색한 뒤 핀포인트 이름을 입력해 주세요.
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
              핀포인트 추가
            </Button>
          </div>
        ) : null}
      </PageTransition>
    </div>
  );
}
