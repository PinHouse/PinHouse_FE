// PinpointItem.tsx
import { memo } from "react";
import { PionPointData } from "@/src/entities/listings/model/type";

interface PinpointItemProps {
  item: PionPointData;
  isSelected: boolean;
  onSelect: ({ id, name }: { id: string; name: string }) => void;
}

export const PinpointItem = memo(({ item, isSelected, onSelect }: PinpointItemProps) => {
  return (
    <li className="p-2" onClick={() => onSelect({ id: item.id, name: item.name })}>
      <div className="mb-1 flex min-h-[22px] items-center gap-2">
        <span className="text-md font-semibold text-gray-900">{item.name}</span>

        <span
          className={`rounded px-2 py-[2px] text-xs font-medium ${
            isSelected ? "bg-blue-50 text-blue-600" : "invisible"
          }`}
        >
          선택됨
        </span>
      </div>

      <p className="text-md mb-2 text-gray-600">{item.address}</p>
    </li>
  );
});

PinpointItem.displayName = "PinpointItem";
