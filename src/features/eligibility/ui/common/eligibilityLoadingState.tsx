import EligibilityLoadingImg from "@/src/assets/images/eligibility/eligibilityLoadingImg";
import {
  ELIGIBILITY_LOADING_SUBTITLE_LINE1,
  ELIGIBILITY_LOADING_SUBTITLE_LINE2,
  ELIGIBILITY_LOADING_TITLE,
} from "@/src/features/eligibility/model/eligibilityConstants";

const EligibilityLoadingState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <EligibilityLoadingImg />
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h2 className="text-xl font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
            {ELIGIBILITY_LOADING_TITLE}
          </h2>
          <p className="text-xs-12 font-medium leading-[140%] text-greyscale-grey-500">
            {ELIGIBILITY_LOADING_SUBTITLE_LINE1}
            <br />
            {ELIGIBILITY_LOADING_SUBTITLE_LINE2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EligibilityLoadingState;
