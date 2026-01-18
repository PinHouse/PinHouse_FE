"use client";

import * as React from "react";

import { Popover, PopoverTrigger, PopoverContent } from "../../lib/headlessUi/popover/popover";
import { Button } from "../../lib/headlessUi";
import { Label } from "../../lib/headlessUi/label/label";
import { Calendar } from "../../lib/headlessUi/calendar/calendar";
import { ChevronDownIcon } from "lucide-react";

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value: controlledValue,
  onChange,
  label = "Date of birth",
  placeholder = "Select date",
  className,
}: DatePickerProps = {}) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(undefined);

  // Controlled 또는 Uncontrolled 모드
  const isControlled = controlledValue !== undefined;

  // Date 객체로 변환 (persist로 인해 문자열로 저장될 수 있음)
  const normalizeDate = (date: Date | string | null | undefined): Date | undefined => {
    if (!date) return undefined;
    if (date instanceof Date) return date;
    if (typeof date === "string") return new Date(date);
    return undefined;
  };

  const date = isControlled ? normalizeDate(controlledValue) : internalDate;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!isControlled) {
      setInternalDate(selectedDate);
    }
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
            {date ? date.toLocaleDateString() : placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
