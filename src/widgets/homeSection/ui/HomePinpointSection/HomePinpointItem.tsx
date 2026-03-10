"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PinPoint } from "@/src/entities/pinpoint/model/pinpoint.type";
import { useAddressStore } from "@/src/entities/address";
import { useOAuthStore } from "@/src/features/login/model";
import { useDeletePinpoint } from "@/src/features/home/hooks/useDeletePinpoint";
import {
  HOME_PINPOINT_DELETE_BUTTON,
  HOME_PINPOINT_EDIT_BUTTON,
  HOME_PINPOINT_SELECTED_TAG,
} from "@/src/features/home/model/homePinpointConstants";
import { Button } from "@/src/shared/lib/headlessUi";
import { Modal } from "@/src/shared/ui/modal/default/modal";
import { toast } from "sonner";

type HomePinpointItemProps = {
  item: PinPoint;
};

export function HomePinpointItem({ item }: HomePinpointItemProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const pinPointId = useOAuthStore(s => s.pinPointId);
  const { setPinPointId, setPinpointName } = useOAuthStore();
  const { deletePinpoint, isDeleting } = useDeletePinpoint({
    onError: () => toast.error("핀포인트 삭제에 실패했어요. 잠시 후 다시 시도해주세요."),
  });

  const isSelected = pinPointId === item.id;

  const handleSelect = () => {
    setPinPointId(item.id);
    setPinpointName(item.name);
  };

  const setEditPinpoint = useAddressStore(s => s.setEditPinpoint);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditPinpoint({
      id: item.id,
      address: item.address,
      name: item.name,
    });
    router.push("/home/pinpoints/setting");
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalButtonClick = (index: number) => {
    if (index === 1) {
      deletePinpoint(item.id);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <li
      className="-mx-5 flex flex-col gap-3 border-b border-greyscale-grey-50 px-5 py-4"
      onClick={handleSelect}
    >
      <div className="flex flex-col gap-1">
        <div className="flex gap-1.5">
          <span className="text-base font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
            {item.name}
          </span>
          {isSelected && (
            <span className="rounded bg-primary-blue-25 px-1 py-1 text-xs-10 font-medium text-primary-blue-400">
              {HOME_PINPOINT_SELECTED_TAG}
            </span>
          )}
        </div>
        <p className="text-sm leading-[140%] tracking-[-0.02em] text-greyscale-grey-700">
          {item.address}
        </p>
      </div>
      <div className="flex w-fit gap-2">
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="rounded-lg border-greyscale-grey-200 px-2.5 py-1.5 text-xs-10 font-medium text-greyscale-grey-900"
          onClick={handleEdit}
        >
          {HOME_PINPOINT_EDIT_BUTTON}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="rounded-lg border-greyscale-grey-200 px-2.5 py-1.5 text-xs-10 font-medium text-greyscale-grey-900"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {HOME_PINPOINT_DELETE_BUTTON}
        </Button>
      </div>

      <Modal
        type="pinpointDeleteConfirm"
        open={isDeleteModalOpen}
        onButtonClick={handleDeleteModalButtonClick}
      >
        {`${item.name}을(를) 삭제할까요?`}
      </Modal>
    </li>
  );
}
