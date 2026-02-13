"use client";

import { Button } from "@/src/shared/lib/headlessUi";
import {
  MYPAGE_PIN_REPORT_BUTTON,
  MYPAGE_PIN_REPORT_DESCRIPTION_LINES,
  MYPAGE_PIN_REPORT_TITLE,
} from "@/src/features/mypage/model/mypageConstants";

interface PinReportSectionProps {
  onDiagnosisClick?: () => void;
}

const PIN_REPORT_HEADING_ID = "pin-report-heading";

export const PinReportSection = ({
  onDiagnosisClick,
}: PinReportSectionProps) => {
  return (
    <section
      aria-labelledby={PIN_REPORT_HEADING_ID}
      className="flex flex-col rounded-lg bg-white"
    >
      <div className="px-4 py-4">
        <h2
          id={PIN_REPORT_HEADING_ID}
          className="border-b border-greyscale-grey-50 text-base font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900"
        >
          {MYPAGE_PIN_REPORT_TITLE}
        </h2>
      </div>
      <div className="flex flex-col items-center gap-4 px-4 py-6">
        <p className="text-center text-sm font-medium leading-[132%] tracking-[-0.012em] text-greyscale-grey-500">
          {MYPAGE_PIN_REPORT_DESCRIPTION_LINES.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        <Button
          type="button"
          variant="solid"
          size="md"
          theme="mainBlue"
          radius="xl"
          disabled={!onDiagnosisClick}
          onClick={onDiagnosisClick}
          className="w-fit px-8 py-2.5"
        >
          {MYPAGE_PIN_REPORT_BUTTON}
        </Button>
      </div>
    </section>
  );
};
