"use client";

import { useEffect } from "react";

/**
 * The mobile preview is a full-screen overlay, but the shared layout still
 * renders the site header/footer behind it. Make those regions inert so
 * keyboard and screen-reader users start at the preview's back link instead
 * of tabbing through invisible navigation.
 */
export default function MovileFocusGuard({ children }) {
  useEffect(() => {
    const regions = [
      document.querySelector("header"),
      document.querySelector("footer"),
      document.querySelector(".skip-link"),
    ].filter(Boolean);

    regions.forEach((region) => {
      region.inert = true;
    });

    return () => {
      regions.forEach((region) => {
        region.inert = false;
      });
    };
  }, []);

  return children;
}
