"use client";

import { useRouter } from "next/navigation";
import { HOME_PINPOINT_ADD_BUTTON } from "@/src/features/home/model/homePinpointConstants";
import PinpointsAddImg from "@/src/assets/images/home/pinpointsAddImg";
import { Button } from "@/src/shared/lib/headlessUi";
import { useAddressStore } from "@/src/entities/address";

export function HomePinpointAddButton() {
  const router = useRouter();
  const { reset } = useAddressStore();
  const handleAddPinpoint = () => {
    reset();
    router.push("/home/pinpoints/setting");
  };

  return (
    <Button
      variant="outline"
      size="md"
      onClick={handleAddPinpoint}
      className="flex w-full items-center justify-center gap-1.5 border-none py-4 text-primary-blue-300"
      aria-label={HOME_PINPOINT_ADD_BUTTON}
    >
      <PinpointsAddImg />
      <span className="text-base font-medium">{HOME_PINPOINT_ADD_BUTTON}</span>
    </Button>
  );
}
