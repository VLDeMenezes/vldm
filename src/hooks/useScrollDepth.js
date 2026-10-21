"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

/** Fires each scroll-depth threshold once per page view. */
export function useScrollDepth() {
  const fired = useRef(new Set());

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const depth = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);

      THRESHOLDS.forEach((threshold) => {
        if (depth >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          track("scroll_depth", { depth: threshold });
        }
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
