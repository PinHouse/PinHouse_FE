"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarFold, ChevronDown, ChevronUp } from "lucide-react";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
} from "@/src/shared/lib/headlessUi/bottomSheet/bottomSheet";
import { Button } from "@/src/shared/lib/headlessUi";
import { Label } from "@/src/shared/lib/headlessUi/label/label";
import { cn } from "@/src/shared/lib/utils";
import { useMobileSheetPortal } from "@/src/shared/context/mobileSheetPortalContext";

export interface BottomSheetDatePickerProps {
  value?: Date | string | null;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const formatDate = (date?: Date) =>
  date
    ? `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일`
    : "";

const normalizeDate = (date?: Date | string | null): Date | undefined => {
  if (!date) return undefined;
  if (date instanceof Date) return date;
  if (typeof date === "string") {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }
  return undefined;
};

const WHEEL_ITEM_HEIGHT = 44;
const WHEEL_VISIBLE_COUNT = 3;
const WHEEL_PADDING_COUNT = Math.floor(WHEEL_VISIBLE_COUNT / 2);
const WHEEL_MAX_VISIBLE_DISTANCE = 1;
const FLICK_STEP_MULTIPLIER = 160;

interface WheelColumnProps {
  options: number[];
  selected: number;
  suffix: string;
  onChange: (value: number) => void;
  cyclic?: boolean;
}

function WheelColumn({
  options,
  selected,
  suffix,
  onChange,
  cyclic = false,
}: WheelColumnProps) {
  const selectedIndex = Math.max(
    0,
    options.findIndex(item => item === selected)
  );

  const dragStartYRef = useRef(0);
  const baseIndexRef = useRef(selectedIndex);
  const pointerIdRef = useRef<number | null>(null);
  const lastMoveRef = useRef<{ y: number; time: number }>({ y: 0, time: 0 });
  const velocityRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    baseIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  const clampIndex = (value: number) => Math.max(0, Math.min(options.length - 1, value));
  const normalizeIndex = (value: number) => {
    if (!cyclic) return clampIndex(value);
    const len = options.length;
    return ((value % len) + len) % len;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartYRef.current = e.clientY;
    baseIndexRef.current = selectedIndex;
    lastMoveRef.current = { y: e.clientY, time: performance.now() };
    velocityRef.current = 0;
    setDragOffset(0);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;
    const deltaY = e.clientY - dragStartYRef.current;
    const limitedDelta = Math.max(
      -WHEEL_ITEM_HEIGHT * 2.5,
      Math.min(WHEEL_ITEM_HEIGHT * 2.5, deltaY)
    );
    const now = performance.now();
    const dt = Math.max(1, now - lastMoveRef.current.time);
    const dy = e.clientY - lastMoveRef.current.y;
    velocityRef.current = dy / dt; // px/ms
    lastMoveRef.current = { y: e.clientY, time: now };
    setDragOffset(limitedDelta);
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    pointerIdRef.current = null;
    setIsDragging(false);

    const inertiaDistance = velocityRef.current * FLICK_STEP_MULTIPLIER;
    const movedSteps = Math.round((dragOffset + inertiaDistance) / WHEEL_ITEM_HEIGHT);
    const nextIndex = normalizeIndex(baseIndexRef.current - movedSteps);
    const nextValue = options[nextIndex];
    if (nextValue !== selected) onChange(nextValue);
    velocityRef.current = 0;
    setDragOffset(0);
  };

  const stepTo = (delta: number) => {
    const nextIndex = normalizeIndex(selectedIndex + delta);
    const nextValue = options[nextIndex];
    if (nextValue !== selected) onChange(nextValue);
  };

  return (
    <div className="relative flex-1">
      <button
        type="button"
        aria-label={`${suffix} 증가`}
        className="absolute left-1/2 top-0 z-20 -translate-x-1/2 text-greyscale-grey-300 hover:text-greyscale-grey-500"
        onClick={() => stepTo(-1)}
      >
        <ChevronUp className="h-4 w-4" />
      </button>

      <div
        className="relative h-[180px] touch-none select-none overflow-hidden text-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {options.map((_, idx) => {
          const relativeIndex = idx - WHEEL_PADDING_COUNT;
          const optionIndex = normalizeIndex(selectedIndex + relativeIndex);
          const item = options[optionIndex];
          const baseY = relativeIndex * WHEEL_ITEM_HEIGHT;
          const y = baseY + dragOffset;
          const distance = Math.abs(y / WHEEL_ITEM_HEIGHT);
          if (distance > WHEEL_MAX_VISIBLE_DISTANCE) return null;
          const isSelected = !isDragging && relativeIndex === 0;

          let textClass = "font-medium text-greyscale-grey-300";
          if (distance < 0.6) textClass = "font-semibold text-greyscale-grey-900";
          else if (distance < 1.6) textClass = "font-medium text-greyscale-grey-500";

          return (
            <div
              key={`${suffix}-${item}-${idx}`}
              className={cn(
                "absolute left-0 right-0 flex h-11 items-center justify-center text-lg font-medium leading-none tracking-[-0.02em] transition-[transform,color,opacity] duration-150",
                isSelected ? "font-semibold text-greyscale-grey-900" : textClass
              )}
              style={{
                transform: `translateY(${y}px)`,
                top: "50%",
                marginTop: `${-WHEEL_ITEM_HEIGHT / 2}px`,
                opacity: Math.max(0, 1 - distance * 0.35),
              }}
            >
              {String(item).padStart(2, "0")}
              <span className="ml-1 text-2xl">{suffix}</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label={`${suffix} 감소`}
        className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 text-greyscale-grey-300 hover:text-greyscale-grey-500"
        onClick={() => stepTo(1)}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white via-white/75 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/75 to-transparent" />
    </div>
  );
}

export function BottomSheetDatePicker({
  value,
  onChange,
  label = "생년월일을 선택해주세요",
  placeholder = "YYYY년 MM월 DD일",
  className,
}: BottomSheetDatePickerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const portalRef = useMobileSheetPortal();
  const container = portalRef?.current ?? undefined;
  const normalizedValue = normalizeDate(value);
  const today = new Date();

  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    const startYear = currentYear - 100;
    return Array.from({ length: 101 }, (_, idx) => currentYear - idx).filter(y => y >= startYear);
  }, [today]);

  const [tempYear, setTempYear] = useState(normalizedValue?.getFullYear() ?? today.getFullYear());
  const [tempMonth, setTempMonth] = useState((normalizedValue?.getMonth() ?? today.getMonth()) + 1);
  const [tempDay, setTempDay] = useState(normalizedValue?.getDate() ?? today.getDate());

  const daysInMonth = new Date(tempYear, tempMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    if (tempDay > daysInMonth) {
      setTempDay(daysInMonth);
    }
  }, [daysInMonth, tempDay]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (nextOpen) {
      const base = normalizeDate(value) ?? today;
      setTempYear(base.getFullYear());
      setTempMonth(base.getMonth() + 1);
      setTempDay(base.getDate());
    }
    setOpen(nextOpen);
  };

  const handleConfirm = () => {
    const safeDay = Math.min(tempDay, daysInMonth);
    onChange?.(new Date(tempYear, tempMonth - 1, safeDay));
    setOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-0.5">
        <h3 className="text-base font-semibold leading-[136%] tracking-[-0.02em] text-greyscale-grey-900">
          {label}
        </h3>
        <div className="h-1.5 w-1.5 self-start rounded-full bg-primary-blue-300" />
      </div>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => handleOpenChange(true)}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-greyscale-grey-100 bg-white px-4 text-left"
      >
        <span
          className={cn(
            "text-base leading-[140%]",
            normalizedValue ? "text-greyscale-grey-900" : "text-greyscale-grey-400"
          )}
        >
          {normalizedValue ? formatDate(normalizedValue) : placeholder}
        </span>
        <CalendarFold className="h-5 w-5 text-primary-blue-400" />
      </button>

      <BottomSheet open={open} onOpenChange={handleOpenChange}>
        <BottomSheetContent
          className="rounded-t-[20px] px-5 pb-6 pt-4"
          showOverlay={true}
          container={container}
          onCloseAutoFocus={e => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <BottomSheetTitle className="sr-only">YYYY년MM월DD일</BottomSheetTitle>

          <div className="flex gap-2 py-3">
            <WheelColumn options={years} selected={tempYear} suffix="년" onChange={setTempYear} />
            <WheelColumn
              options={Array.from({ length: 12 }, (_, i) => i + 1)}
              selected={tempMonth}
              suffix="월"
              onChange={setTempMonth}
              cyclic={true}
            />
            <WheelColumn
              options={days}
              selected={tempDay}
              suffix="일"
              onChange={setTempDay}
              cyclic={true}
            />
          </div>

          <Button
            type="button"
            variant="solid"
            size="md"
            className="bg-greyscale-grey-800"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
}
