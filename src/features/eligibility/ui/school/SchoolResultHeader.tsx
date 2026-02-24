import { DefaultHeader } from "@/src/shared/ui/header";
import { SCHOOL_RESULT_PAGE_TITLE } from "@/src/features/eligibility/model/eligibilityConstants";

const BACK_PATH = "/eligibility/school";

export function SchoolResultHeader() {
  return (
    <header className="relative flex items-center px-5 py-4">
      <DefaultHeader title={SCHOOL_RESULT_PAGE_TITLE} path={BACK_PATH} />
    </header>
  );
}
