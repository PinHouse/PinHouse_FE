"use client";

import { MapPin } from "@/src/assets/icons/onboarding";
import { useAddressStore } from "@/src/entities/address";
import { AddressSearch } from "@/src/features/addressSearch";
import { useAddPinpoint } from "@/src/features/mypage/hooks/useAddPinpoint";
import { Button } from "@/src/shared/lib/headlessUi";
import { useRouter } from "next/navigation";

const MypagePinpointsPage = () => {
  const title = "핀포인트 설정";
  const description = "나만의 핀포인트를 찍고\n원하는 거리 안의 임재주택을 찾아보세요!";
  const image = <MapPin />;
  const { address, pinPoint } = useAddressStore();
  const router = useRouter();
  const { addPinpoint, isLoading, isError, error } = useAddPinpoint({
    onSuccess: () => {
      router.push("/mypage/settings"); // 주소 선택 후 이전 화면으로
      // 또는 목록 새로고침 등
    },
    onError: err => {
      // 토스트 등 에러 처리
    },
  });
  return (
    <div className="p-5">
      <div className="mb-3 flex flex-[1] flex-col items-center justify-start text-center">
        <div className="inline-flex sm:min-w-[200px] sm:max-w-[250px] md:min-w-[250px] md:max-w-[300px] lg:min-w-[280px] lg:max-w-[340px]">
          {image}
        </div>
        {title && <h2 className="text-lg font-bold">{title}</h2>}
        <p className="mt-1 whitespace-pre-line text-center text-sm text-gray-500">{description}</p>
        <div className="mt-5 w-full">
          <AddressSearch />
        </div>
      </div>
      {address ? (
        <Button
          size={"md"}
          variant={"solid"}
          onClick={() => addPinpoint({ address, name: pinPoint || "핀 포인트", first: true })}
        >
          핀포인트 추가
        </Button>
      ) : null}
    </div>
  );
};

export default MypagePinpointsPage;
