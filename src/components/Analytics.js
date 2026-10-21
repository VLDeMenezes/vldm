"use client";

import Script from "next/script";
import { flushAnalyticsQueue } from "@/lib/analytics";

const WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ??
  "25370e63-6824-45b7-988c-5c583d2cb2bc";

export default function Analytics() {
  if (!WEBSITE_ID) return null;

  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={WEBSITE_ID}
      strategy="afterInteractive"
      onReady={flushAnalyticsQueue}
    />
  );
}
