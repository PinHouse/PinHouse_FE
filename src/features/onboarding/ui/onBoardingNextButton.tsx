"use client";
import { Button } from "@/src/shared/ui/button/deafult";
import { onboardingContentMap } from "../model/onboardingContentMap";
import { usePathname, useRouter } from "next/navigation";

export const OnboardingNextButton = () => {
  const steps = Object.values(onboardingContentMap);
  const pathname = usePathname();
  const currentIndex = steps.findIndex(s => s.path === pathname);
  const next = steps[currentIndex + 1];
  const router = useRouter();

  return (
    <Button size={"lg"} variant={"solid"} onClick={() => next && router.push(next.path)}>
      다음
    </Button>
  );
};
