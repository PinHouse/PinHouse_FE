"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/lib/utils";

const BottomSheet = SheetPrimitive.Root;

const BottomSheetTrigger = SheetPrimitive.Trigger;

const BottomSheetClose = SheetPrimitive.Close;

const BottomSheetPortal = SheetPrimitive.Portal;

const overlayClass = (isInsideContainer: boolean) =>
  cn(
    "z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    isInsideContainer ? "absolute inset-0" : "fixed inset-0"
  );

const BottomSheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
    /** 포탈 컨테이너 안에 렌더될 때 true → absolute 사용 */
    isInsideContainer?: boolean;
  }
>(({ className, isInsideContainer, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(overlayClass(Boolean(isInsideContainer)), className)}
    {...props}
    ref={ref}
  />
));
BottomSheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface BottomSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  showCloseButton?: boolean;
  showOverlay?: boolean;
  /** 지정 시 이 엘리먼트 안에 포탈하고, overlay/content를 absolute로 배치 (폰 프레임 내 시트용) */
  container?: HTMLElement | null;
}

const contentClass = (isInsideContainer: boolean) =>
  cn(
    "z-50 gap-4 rounded-t-3xl border-t bg-white p-6 shadow-[0px_-16px_24px_-10px_rgba(48,111,255,0.15)] transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
    isInsideContainer ? "absolute inset-x-0 bottom-0 left-0 right-0" : "fixed inset-x-0 bottom-0"
  );

const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  BottomSheetContentProps
>(({ className, children, showCloseButton = false, showOverlay = true, container, ...props }, ref) => {
  const isInsideContainer = Boolean(container);
  return (
    <BottomSheetPortal container={container ?? undefined}>
      {showOverlay && <BottomSheetOverlay isInsideContainer={isInsideContainer} />}
      <SheetPrimitive.Content
        ref={ref}
        className={cn(contentClass(isInsideContainer), className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </BottomSheetPortal>
  );
});
BottomSheetContent.displayName = SheetPrimitive.Content.displayName;

const BottomSheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
BottomSheetHeader.displayName = "BottomSheetHeader";

const BottomSheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
BottomSheetFooter.displayName = "BottomSheetFooter";

const BottomSheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
BottomSheetTitle.displayName = SheetPrimitive.Title.displayName;

const BottomSheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
BottomSheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  BottomSheet,
  BottomSheetPortal,
  BottomSheetOverlay,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
};
