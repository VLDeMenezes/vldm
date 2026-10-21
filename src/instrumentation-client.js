import { applyStoredTheme } from "./lib/theme";

// Runs before hydration, so a dark-theme visitor never sees a light flash.
applyStoredTheme();
