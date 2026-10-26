"use client";

import { useEffect, useState } from "react";
import { acquirePortfolioTools, releasePortfolioTools } from "@/lib/webmcp";

/**
 * Registers the portfolio's WebMCP tools once per page and reports whether the
 * browser exposes the API. Registration is shared, so remounts are cheap.
 */
export function useWebMcp({ enabled = true } = {}) {
  const [status, setStatus] = useState(
    enabled ? "checking" : "unsupported"
  );
  const [registeredTools, setRegisteredTools] = useState([]);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;

    acquirePortfolioTools()
      .then((result) => {
        if (cancelled) return;

        setRegisteredTools(result.registered);

        if (!result.supported) {
          setStatus("unsupported");
          return;
        }

        setStatus(result.registered.length > 0 ? "active" : "error");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      releasePortfolioTools();
    };
  }, [enabled]);

  return { status, registeredTools };
}
