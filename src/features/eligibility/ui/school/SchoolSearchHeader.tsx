import { DefaultHeader } from "@/src/shared/ui/header";
import { SCHOOL_SEARCH_TITLE } from "@/src/features/eligibility/model/eligibilityConstants";

const BACK_PATH = "/eligibility?step=youngSingle001";
export function SchoolSearchHeader() {
  return (
    <header className="relative flex items-center px-5 py-4">
      <DefaultHeader title={SCHOOL_SEARCH_TITLE} path={BACK_PATH} />
    </header>
  );
}
