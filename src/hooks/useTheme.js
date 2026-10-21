"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_EVENT } from "@/lib/theme";

function subscribe(callback) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const onMediaChange = () => {
    // Only follow the OS when the visitor has not chosen explicitly.
    try {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", media.matches);
      }
    } catch {
      // localStorage can be unavailable in private mode.
    }
    callback();
  };

  const onStorage = (event) => {
    if (event.key !== "theme") return;
    const dark = event.newValue
      ? event.newValue === "dark"
      : media.matches;
    document.documentElement.classList.toggle("dark", dark);
    callback();
  };

  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onMediaChange);

  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onMediaChange);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

/**
 * Theme is stored on <html class="dark"> so CSS can handle it before hydration.
 */
export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next) => {
    const dark = next === "dark";
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Ignore storage errors.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggle = useCallback(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "light" : "dark"
    );
  }, [setTheme]);

  return { isDark, setTheme, toggle };
}
