import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/src/app/providers/queryProvider";
// import { BottomNavigation } from "@/src/shared/ui/bottomNavigation/";
import { Toast } from "@/src/shared/ui/toast";
import { HomeLandingRender } from "@/src/shared/ui/globalRender/globalRender";
import { FrameBottomNav } from "@/src/shared/ui/bottomNavigation/frameBottomNavigation";
import { ClientOnly } from "@/src/shared/ui/clientOnly/clientOnly";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "pinhouse",
  description: "pinhosue-fe",
  icons: {
    icon: "/BrandLogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full bg-gray-100">
      <body className="h-full bg-white text-gray-900 antialiased">
        <QueryProvider>
          <div className="flex min-h-screen w-full justify-center">
            {/* <div className="relative flex h-full w-full max-w-[765px] flex-col bg-white shadow-md"> */}
            <div className="relative flex min-h-screen w-full flex-col bg-transparent shadow-none">
              {/* 헤더자리 */}
              {/* <header className="flex h-[44px] w-full items-center"></header> */}
              {/* <TempHeaders className="h-full w-full" /> */}
              {/* <main className="flex-1 overflow-y-auto">{children}</main>
              <BottomNavigation /> */}

              <HomeLandingRender
                bottom={
                  <ClientOnly>
                    <FrameBottomNav />
                  </ClientOnly>
                }
              >
                {children}
              </HomeLandingRender>
            </div>
          </div>
          <Toast />
        </QueryProvider>
      </body>
    </html>
  );
}
