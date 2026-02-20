"use client";

import ResultBannerImg from "@/src/assets/images/eligibility/resultBannerImg";
import {
  ELIGIBILITY_RESULT_BANNER_SUBTITLE,
  ELIGIBILITY_RESULT_BANNER_TITLE,
} from "@/src/features/eligibility/model/eligibilityConstants";

export interface EligibilityResultBannerProps {
  /** 진단 결과 문구에 넣을 사용자 이름
   * TODO: 추후 닉네임으로 API 변경 필요 - 백엔드에 추후 요청 필요
   */
  userName: string;
}

export const EligibilityResultBanner = ({ userName }: EligibilityResultBannerProps) => {
  return (
    <div className="flex flex-col items-center gap-4 pb-6 pt-9">
      <ResultBannerImg />
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-lg font-semibold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
          {ELIGIBILITY_RESULT_BANNER_TITLE(userName)}
        </h2>
        <p className="text-xs-12 font-medium leading-[140%] tracking-[-0.02em] text-greyscale-grey-500">
          {ELIGIBILITY_RESULT_BANNER_SUBTITLE}
        </p>
      </div>
    </div>
  );
};
