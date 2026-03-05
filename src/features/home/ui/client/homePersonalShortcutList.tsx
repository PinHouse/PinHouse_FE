"use client";
import {
  usePersonalRouteHooks,
  usePersonalShortcutHooks,
} from "@/src/features/home/ui/homeUseHooks/usePersonalShortcutHooks";
import type { ReactNode } from "react";
import { ShortcutMessage } from "@/src/features/home/ui/components";

type PersonalShortcutItem = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  button: ReactNode;
  message: string;
  path: string;
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
