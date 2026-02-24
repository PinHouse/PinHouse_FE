import { Button } from "@/src/shared/lib/headlessUi/button/button";
import { SCHOOL_RESULT_BUTTON } from "@/src/features/eligibility/model/eligibilityConstants";

type SchoolSearchResultButtonSectionProps = {
  hasKeyword: boolean;
  onResultClick: () => void;
};

export function SchoolSearchResultButtonSection({
  hasKeyword,
  onResultClick,
}: SchoolSearchResultButtonSectionProps) {
  return (
    <div className="px-5 pb-8 pt-4">
      <Button
        type="button"
        variant="capsule"
        size="lg"
        radius="md"
        theme="mainBlue"
        disabled={!hasKeyword}
        onClick={onResultClick}
        className="w-full"
      >
        {SCHOOL_RESULT_BUTTON}
      </Button>
    </div>
  );
}
