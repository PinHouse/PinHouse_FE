"use client";

import {
  usePersonalRouteHooks,
  usePersonalShortcutHooks,
} from "@/src/features/home/ui/homeUseHooks/usePersonalShortcutHooks";
import type { ReactNode } from "react";

type PersonalShortcutItem = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  button: ReactNode;
  message: string;
  path: string;
};

const ShortcutMessage = ({ text }: { text: string }) => {
  return (
    <div className="z-5 absolute -top-2 left-4">
      <div className="relative rounded-lg bg-greyscale-grey-900 px-3 py-1 text-xs text-white">
        {text}
        <span className="absolute left-4 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-greyscale-grey-900" />
      </div>
    </div>
  );
};

export const PersonalShortcutListClient = ({
  items,
}: {
  items: readonly PersonalShortcutItem[];
}) => {
  const { showMessage } = usePersonalShortcutHooks();
  const { personalRoute } = usePersonalRouteHooks();

  return (
    <section className="flex flex-col gap-4">
      {items.map(item => (
        <div key={item.id} className="relative">
          {showMessage && item.message && <ShortcutMessage text={item.message} />}

          <button
            className="shadow- flex w-full items-center gap-2 rounded-2xl border border-greyscale-grey-50 bg-white p-4 text-left"
            type="button"
            onClick={() => personalRoute(item.path)}
          >
            <div>{item.icon}</div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-greyscale-grey-900">{item.title}</p>
              <p className="whitespace-pre-line text-xs text-greyscale-grey-500">
                {item.description}
              </p>
            </div>

            <span className="ml-auto text-lg text-greyscale-grey-400">
              <div className="rotate-180">{item.button}</div>
            </span>
          </button>
        </div>
      ))}
    </section>
  );
};
