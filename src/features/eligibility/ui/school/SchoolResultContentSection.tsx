import SchoolSearchFillImg from "@/src/assets/images/eligibility/shcoolSearchFillImg";
import SchoolSearchEmptyImg from "@/src/assets/images/eligibility/shcoolSearchEmptyImg";
import {
  SCHOOL_RESULT_EMPTY_LINE1,
  SCHOOL_RESULT_EMPTY_LINE2,
  SCHOOL_RESULT_EMPTY_HINT1,
  SCHOOL_RESULT_EMPTY_HINT2,
  SCHOOL_RESULT_FILL_HINT,
} from "@/src/features/eligibility/model/eligibilityConstants";

type SchoolResultContentSectionProps = {
  isEligible: boolean;
  message: string | null;
  keyword: string;
};

export function SchoolResultContentSection({
  isEligible,
  message,
  keyword,
}: SchoolResultContentSectionProps) {
  return (
    <div className="flex flex-1 flex-col items-center px-5 pt-6">
      <div className="flex justify-center">
        {isEligible ? <SchoolSearchFillImg /> : <SchoolSearchEmptyImg />}
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        {isEligible && message ? (
          <>
            <p className="text-lg font-bold leading-tight tracking-[-0.01em] text-greyscale-grey-900">
              {message}
            </p>
            <p className="mt-2 text-sm leading-[140%] text-greyscale-grey-500">
              {SCHOOL_RESULT_FILL_HINT}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-bold leading-tight tracking-[-0.01em] text-greyscale-grey-900">
              {keyword ? SCHOOL_RESULT_EMPTY_LINE1(keyword) : ""}
            </p>
            <p className="text-lg font-bold leading-tight tracking-[-0.01em] text-greyscale-grey-900">
              {SCHOOL_RESULT_EMPTY_LINE2}
            </p>
            <p className="mt-2 text-sm leading-[140%] text-greyscale-grey-500">
              {SCHOOL_RESULT_EMPTY_HINT1}
            </p>
            <p className="text-sm leading-[140%] text-greyscale-grey-500">
              {SCHOOL_RESULT_EMPTY_HINT2}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
