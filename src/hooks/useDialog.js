"use client";

import { useCallback, useEffect, useRef } from "react";
import { useBodyScrollLock } from "./useBodyScrollLock";

/**
 * Wraps the native <dialog> element: focus trap, Escape and focus restore
 * come from the browser; this hook only keeps React state in sync.
 */
export function useDialog(open, onClose) {
  const ref = useRef(null);
  useBodyScrollLock(open);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;

    const handleClose = () => onClose?.();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const close = useCallback(() => {
    ref.current?.close();
  }, []);

  return { ref, close };
}
