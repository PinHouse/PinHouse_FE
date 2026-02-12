"use client";

import { RefObject, useEffect } from "react";

interface UseScrollLockOptions {
  locked: boolean;
  anchorRef?: RefObject<HTMLElement | null>;
  lockDocument?: boolean;
}

const findScrollableAncestor = (element: HTMLElement | null) => {
  let current = element?.parentElement ?? null;

  while (current) {
    const styles = window.getComputedStyle(current);
    const overflowY = styles.overflowY;
    const overflow = styles.overflow;

    if (
      overflowY === "auto" ||
      overflowY === "scroll" ||
      overflow === "auto" ||
      overflow === "scroll"
    ) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
};

export const useScrollLock = ({
  locked,
  anchorRef,
  lockDocument = true,
}: UseScrollLockOptions) => {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const anchor = anchorRef?.current ?? null;
    const scrollContainer = findScrollableAncestor(anchor);
    const html = document.documentElement;
    const body = document.body;

    const prevContainerOverflow = scrollContainer?.style.overflow ?? "";
    const prevContainerOverflowY = scrollContainer?.style.overflowY ?? "";
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
      scrollContainer.style.overflowY = "hidden";
    }

    if (lockDocument) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflow = prevContainerOverflow;
        scrollContainer.style.overflowY = prevContainerOverflowY;
      }

      if (lockDocument) {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
      }
    };
  }, [anchorRef, lockDocument, locked]);
};
