import { Button } from "@/src/shared/lib/headlessUi/button/button";
import { SCHOOL_RESULT_TRY_AGAIN_BUTTON } from "@/src/features/eligibility/model/eligibilityConstants";

type SchoolResultTryAgainSectionProps = {
  onTryAgain: () => void;
};

export function SchoolResultTryAgainSection({ onTryAgain }: SchoolResultTryAgainSectionProps) {
  return (
    <div className="px-5 pb-8 pt-6">
      <Button
        type="button"
        variant="capsule"
        size="lg"
        radius="md"
        theme="mainBlue"
        onClick={onTryAgain}
        className="w-full"
      >
        {SCHOOL_RESULT_TRY_AGAIN_BUTTON}
      </Button>
    </div>
  );
}
