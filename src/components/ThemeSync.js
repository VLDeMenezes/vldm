"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { applyStoredTheme } from "@/lib/theme";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * React can reset the <html> class on client navigation. Re-apply the stored
 * theme in a layout effect so the correct theme is kept before the next paint,
 * and notify useTheme subscribers so the toggle icon stays in sync.
 */
export default function ThemeSync() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    applyStoredTheme();
  }, [pathname]);

  return null;
}
