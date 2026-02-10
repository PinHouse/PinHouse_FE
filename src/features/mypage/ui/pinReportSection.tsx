"use client";

import { Button } from "@/src/shared/lib/headlessUi";

interface PinReportSectionProps {
    onDiagnosisClick?: () => void;
}

export const PinReportSection = ({ 
    onDiagnosisClick 
}: PinReportSectionProps) => {
    return (
        <div className="flex flex-col rounded-lg bg-white">
            <div className="px-4 py-4">
                <h2 className="border-b border-greyscale-grey-50 text-base font-bold leading-[140%] tracking-[-0.02em] text-greyscale-grey-900">
                    핀 보고서
                </h2>
            </div>
            <div className="flex flex-col items-center gap-4 px-4 py-6">
                <p className="text-center text-sm font-medium leading-[132%] tracking-[-0.012em] text-greyscale-grey-500">
                    자격진단으로
                    <br />
                    임대주택 지원 가능 여부를 확인하고
                    <br />
                    맞춤 보고서를 받아보세요
                </p>
                <Button variant="solid" size="md" theme="mainBlue" radius="xl" onClick={onDiagnosisClick} className="w-fit px-8 py-2.5">
                    자격진단 하러가기
                </Button>
            </div>
            

        </div>
    );
};
