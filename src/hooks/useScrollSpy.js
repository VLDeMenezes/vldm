"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section currently occupies a reference line near the top of the
 * viewport. A reference line is more reliable than an IntersectionObserver
 * band: when scrolling up from the footer, the previous section becomes active
 * as soon as it crosses the line, even before its heading reaches the top.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0] ?? null);
  const key = ids.join("|");

  useEffect(() => {
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section.id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        current = sections[sections.length - 1].id;
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}
