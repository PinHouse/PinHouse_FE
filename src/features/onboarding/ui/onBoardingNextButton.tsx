"use client";
import { Button } from "@/src/shared/ui/button/deafult";
import { onboardingContentMap } from "../model/onboardingContentMap";
import { usePathname, useRouter } from "next/navigation";
import { useAddressStore } from "@/src/entities/address";
import { onBoardingButtonPreset } from "@/src/shared/ui/button/preset";

export const OnboardingNextButton = () => {
  const steps = Object.values(onboardingContentMap);
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();
  const { address } = useAddressStore();
  const btnDisable = pathname.includes("/agent") && address === "" ? true : false;

  return (
    <Button
      {...onBoardingButtonPreset}
      onClick={() => next && router.push(next.path)}
      disabled={btnDisable}
    >
      다음
    </Button>
  );
};
