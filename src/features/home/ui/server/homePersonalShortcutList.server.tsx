import { PERSONAL_SHORTCUTS } from "@/src/features/home/model/model";
import { PersonalShortcutListClient } from "@/src/features/home/ui/client/homePersonalShortcutList";

export const PersonalShortcutList = () => {
  return <PersonalShortcutListClient items={PERSONAL_SHORTCUTS} />;
};
