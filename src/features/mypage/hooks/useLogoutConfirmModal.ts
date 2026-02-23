import { useCallback, useState } from "react";
import { logout } from "@/src/features/login/utils/logout";

export function useLogoutConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const onButtonClick = useCallback((buttonIndex: number, _buttonLabel?: string) => {
    if (buttonIndex === 0) {
      setIsOpen(false);
    } else if (buttonIndex === 1) {
      setIsOpen(false);
      logout();
    }
  }, []);

  return { isOpen, open, close, onButtonClick };
}
