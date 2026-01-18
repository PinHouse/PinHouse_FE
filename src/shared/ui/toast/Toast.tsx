"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";
import { useTheme } from "next-themes";

/**
 * 프로젝트용 커스텀 Toast 컴포넌트
 */
export const Toast = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      duration={1000}
      className="toaster group"
      icons={{}}
      toastOptions={{
        classNames: {
          toast: "h-[38px] !bg-greyscale-grey-800 !text-white !rounded !text-xs-12 !font-semibold",
          description: "",
          actionButton: "",
          cancelButton: "",
        },
      }}
      visibleToasts={1}
      offset={{ top: "12px" }}
      mobileOffset={{ top: "12px" }}
      {...props}
    />
  );
};
