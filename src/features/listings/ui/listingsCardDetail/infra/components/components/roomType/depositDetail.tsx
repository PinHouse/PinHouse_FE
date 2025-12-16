import { memo } from "react";
import { formatNumber } from "@/src/shared/lib/numberFormat";

interface Props {
  deposit?: {
    total?: number;
    contract?: number;
    balance?: number;
    monthPay?: number;
  };
}

export const DepositDetail = memo(({ deposit }: Props) => {
  return (
    <div className="p-5">
      <div className="rounded-xl bg-greyscale-grey-25 p-4">
        <Row label="보증금 합계" value={deposit?.total} />
        <Row label="계약금" value={deposit?.contract} />
        <Row label="잔금" value={deposit?.balance} />
        <div className="mt-2 border-t border-greyscale-grey-100 pt-2">
          <Row label="월 임대료" value={deposit?.monthPay} />
        </div>
      </div>
    </div>
  );
});

const Row = ({ label, value }: { label: string; value?: number }) => (
  <div className="flex items-center justify-between py-1 text-sm">
    <span className="text-text-secondary">{label}</span>
    <span className="font-semibold text-text-primary">{formatNumber(value ?? 0)}원</span>
  </div>
);
