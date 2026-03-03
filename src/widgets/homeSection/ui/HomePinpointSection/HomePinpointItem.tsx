"use client";

import { useRouter } from "next/navigation";
import { PinPoint } from "@/src/entities/pinpoint/model/pinpoint.type";
import { useOAuthStore } from "@/src/features/login/model";
import { useDeletePinpoint } from "@/src/features/home/hooks/useDeletePinpoint";
import {
  HOME_PINPOINT_DELETE_BUTTON,
  HOME_PINPOINT_EDIT_BUTTON,
  HOME_PINPOINT_SELECTED_TAG,
} from "@/src/features/home/model/homePinpointConstants";
import { Button } from "@/src/shared/lib/headlessUi";
import { toast } from "sonner";

type HomePinpointItemProps = {
  item: PinPoint;
};

export function HomePinpointItem({ item }: HomePinpointItemProps) {
  const router = useRouter();
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

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/home/pinpoints/address?edit=${encodeURIComponent(item.id)}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("이 핀포인트를 삭제할까요?")) {
      deletePinpoint(item.id);
    }
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
            <span className="rounded-lg bg-primary-blue-25 px-1 py-1 text-xs-10 font-medium text-primary-blue-400">
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
          size="sm"
          className="rounded-lg border-greyscale-grey-200 px-2.5 py-1.5 text-xs-12 font-medium text-greyscale-grey-900"
          onClick={handleEdit}
        >
          {HOME_PINPOINT_EDIT_BUTTON}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-lgborder-greyscale-grey-200 px-2.5 py-1.5 text-xs-12 font-medium text-greyscale-grey-900"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {HOME_PINPOINT_DELETE_BUTTON}
        </Button>
      </div>
    </li>
  );
}
