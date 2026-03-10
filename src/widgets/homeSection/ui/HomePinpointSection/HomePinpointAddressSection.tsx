"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAddressStore } from "@/src/entities/address";
import { AddressSearch } from "@/src/features/addressSearch";
import { useUpdatePinpoint } from "@/src/features/home/hooks/useUpdatePinpoint";
import { useAddPinpoint } from "@/src/features/mypage/hooks/useAddPinpoint";
import { DefaultHeader } from "@/src/shared/ui/header";
import { Button } from "@/src/shared/lib/headlessUi";
import { PageTransition } from "@/src/shared/ui/animation/pageTransition";
import { HOME_PINPOINT_HEADER_TITLE } from "@/src/features/home/model/homePinpointConstants";
import { MYPAGE_PINPOINTS_DEFAULT_NAME } from "@/src/features/mypage/model/mypageConstants";

/** 홈 > 핀포인트 추가/수정 주소 검색 화면 */
export function HomePinpointAddressSection() {
  const router = useRouter();
  const { address, pinPoint, editingPinpointId, reset } = useAddressStore();
  const editId = editingPinpointId;
  const isEditMode = Boolean(editId);

  const { addPinpoint, isLoading: isAdding } = useAddPinpoint({
    onSuccess: () => {
      reset();
      router.push("/home/pinpoints");
    },
    onError: () => {
      toast.error("핀포인트 추가에 실패했어요. 잠시 후 다시 시도해주세요.");
    },
  });

  const { updatePinpoint, isUpdating } = useUpdatePinpoint({
    onSuccess: () => {
      reset();
      router.push("/home/pinpoints");
    },
    onError: () => {
      toast.error("핀포인트 수정에 실패했어요. 잠시 후 다시 시도해주세요.");
    },
  });

  const isLoading = isAdding || isUpdating;

  const handleSubmit = () => {
    if (!address) return;
    const name = pinPoint || MYPAGE_PINPOINTS_DEFAULT_NAME;
    if (isEditMode && editId) {
      updatePinpoint({ id: editId, name });
    } else {
      addPinpoint({
        address,
        name,
        first: true,
      });
    }
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
              onClick={handleSubmit}
            >
              {isEditMode ? "핀포인트 이름 수정" : "핀포인트 추가"}
            </Button>
          </div>
        ) : null}
      </PageTransition>
    </div>
  );
}
