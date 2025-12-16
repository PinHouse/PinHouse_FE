import { memo } from "react";

type DepositTab = "min" | "normal" | "max";

const TABS: { key: DepositTab; label: string }[] = [
  { key: "min", label: "보증금 최소납입" },
  { key: "normal", label: "보증금 기본" },
  { key: "max", label: "보증금 최대납입" },
];

interface Props {
  tab: DepositTab;
  onChange: (tab: DepositTab) => void;
}

export const DepositTabs = memo(({ tab, onChange }: Props) => {
  return (
    <div className="relative">
      <div className="flex gap-5 px-5 pt-3 text-sm font-medium">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={tab === t.key ? "p-1 font-bold text-text-primary" : "p-1 text-gray-500"}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="mt-2 h-[2px] bg-button-primary"
        style={{
          width: `${Math.max(0, tab === "min" ? 100 : tab === "normal" ? 90 : 100)}px`,
          marginLeft: `${tab === "min" ? 20 : tab === "normal" ? 20 + 90 + 20 : 20 + 90 + 20 + 78 + 20}px`,
        }}
      />
    </div>
  );
});
