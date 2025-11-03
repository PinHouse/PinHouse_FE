"use client";

import { useAddressStore } from "@/src/entities/address";
import { themeObj } from "@/src/entities/address/model/address.model";
import { useRef, useState } from "react";

declare global {
  interface Window {
    daum: any;
  }
}

export const useDaumPostcode = (onComplete: (data: any) => void, defaultQuery?: string) => {
  const embedRef = useRef<HTMLDivElement>(null);
  const { setIsEmbed } = useAddressStore();

  const openEmbed = () => {
    if (!window.daum?.Postcode || !embedRef.current) return;
    setIsEmbed(true);
    if (embedRef.current) {
      const postcode = new window.daum.Postcode({
        width: "100%",
        height: "100%",
        animation: false,
        autoMapping: true,
        autoShowFirst: true,
        autoSearch: true,
        theme: themeObj,
        oncomplete: (data: string) => {
          onComplete(data);
          if (embedRef.current) {
            embedRef.current.innerHTML = "";
            embedRef.current.style.display = "none";
          }
          setIsEmbed(false);
        },
      });

      postcode.embed(embedRef.current, {
        q: defaultQuery ?? "",
      });
      embedRef.current.style.display = "block";
    }
  };

  setTimeout(() => {
    const iframe = embedRef.current?.querySelector("iframe");
    if (iframe) {
      iframe.style.border = "1px solid #e5e7eb";
      iframe.style.borderRadius = "12px";
      iframe.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    }
  }, 300);

  const clearEmbed = () => {
    if (embedRef.current) {
      embedRef.current.innerHTML = "";
      embedRef.current.style.display = "none";
      setIsEmbed(false);
    }
  };

  return { embedRef, openEmbed, clearEmbed };
};
