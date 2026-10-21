export const THEME_EVENT = "vldm:themechange";

/**
 * Applies the persisted theme (or the OS preference) to <html> before paint.
 * Kept framework-free so it can run from client instrumentation and from the
 * React sync component without rendering a script tag.
 */
export function applyStoredTheme() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  let dark;

  try {
    const stored = window.localStorage.getItem("theme");
    dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.documentElement.classList.toggle("dark", dark);
  window.dispatchEvent(new Event(THEME_EVENT));
  return dark;
}
