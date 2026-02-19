"use client";

import { useRouter } from "next/navigation";
import { useEligibilityStore } from "@/src/features/eligibility/model/eligibilityStore";
import {
  ELIGIBILITY_RESULT_BUTTON,
  ELIGIBILITY_RESULT_PAGE_TITLE,
} from "@/src/features/eligibility/model/eligibilityConstants";
import {
  EligibilityResultBanner,
  EligibilityResultList,
} from "@/src/features/eligibility/ui/result";
import { DefaultHeader } from "@/src/shared/ui/header";
import { Button } from "@/src/shared/lib/headlessUi/button/button";
import { useOAuthStore } from "@/src/features/login/model/authStore";

export const EligibilityResultSection = () => {
  const router = useRouter();
  const data = useEligibilityStore();
  const { userName } = useOAuthStore();

  return (
    <section className="flex h-full flex-col">
      <header
        className="relative flex items-center bg-white px-5 py-4"
        aria-label={ELIGIBILITY_RESULT_PAGE_TITLE}
      >
        <DefaultHeader title={ELIGIBILITY_RESULT_PAGE_TITLE} path="/eligibility" />
      </header>
      <div className="flex flex-1 flex-col gap-4 bg-greyscale-grey-25 px-5 pb-5">
        <EligibilityResultBanner userName={userName} />
        <EligibilityResultList data={data} />
      </div>
      <div className="bg-greyscale-grey-25 px-5">
        <Button
          type="button"
          variant="capsule"
          size="lg"
          theme="mainBlue"
          radius="xl"
          onClick={() => router.push("/eligibility/report")}
        >
          {ELIGIBILITY_RESULT_BUTTON}
        </Button>
      </div>
    </section>
  );
};
