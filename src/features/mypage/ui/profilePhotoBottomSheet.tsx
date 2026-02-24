"use client";

import { useState, useLayoutEffect } from "react";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
} from "@/src/shared/lib/headlessUi";
import { useMobileSheetPortal } from "@/src/shared/context/mobileSheetPortalContext";

interface ProfilePhotoBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectFromAlbum: () => void;
  onRemovePhoto: () => void;
}

export const ProfilePhotoBottomSheet = ({
  open,
  onOpenChange,
  onSelectFromAlbum,
  onRemovePhoto,
}: ProfilePhotoBottomSheetProps) => {
  const portalRef = useMobileSheetPortal();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (portalRef?.current) setContainer(portalRef.current);
  }, [portalRef]);

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetContent className="p-6" showOverlay={false} container={container}>
        <BottomSheetTitle className="sr-only">프로필 사진 설정</BottomSheetTitle>
        <BottomSheetDescription className="sr-only">
          프로필 사진을 선택하거나 삭제할 수 있습니다.
        </BottomSheetDescription>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="h-12 w-full rounded-lg bg-primary-blue-300 text-base font-semibold text-white"
            onClick={onSelectFromAlbum}
          >
            앨범에서 선택
          </button>

          <button
            type="button"
            className="h-12 w-full rounded-lg bg-greyscale-grey-800 text-base font-semibold text-white"
            onClick={() => onOpenChange(false)}
          >
            닫기
          </button>

          <button
            type="button"
            className="h-12 w-full rounded-lg bg-transparent text-base font-semibold text-danger-400"
            onClick={onRemovePhoto}
          >
            프로필 사진 삭제
          </button>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
};
