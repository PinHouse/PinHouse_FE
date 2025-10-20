import { Button } from "@/src/shared/ui/button/deafult";

interface OnboardingNextButtonProps {
  onNext?: () => void;
}
export const OnboardingNextButton = ({ onNext }: OnboardingNextButtonProps) => {
  return (
    <Button size={"lg"} variant={"solid"} onClick={onNext}>
      다음
    </Button>
  );
};
