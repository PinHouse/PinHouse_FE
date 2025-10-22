"use client";

declare global {
  interface Window {
    daum: any;
  }
}

export const useDaumPostcode = (onComplete: (data: any) => void) => {
  const open = () => {
    new window.daum.Postcode({ oncomplete: onComplete }).open();
  };
  return { open };
};
