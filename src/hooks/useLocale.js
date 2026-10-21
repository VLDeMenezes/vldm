"use client";

import { useCallback, useEffect, useTransition } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  cookieName,
  defaultLocale,
  isLocale,
  locales,
} from "@/i18n/settings";

export function useLocale() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const paramLocale = params?.locale;
  const locale = isLocale(paramLocale) ? paramLocale : defaultLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const switchLocale = useCallback(
    (next = locale === "en" ? "es" : "en") => {
      if (!locales.includes(next) || next === locale) return;

      document.cookie = `${cookieName}=${next};path=/;max-age=31536000;samesite=lax`;

      const hash = window.location.hash;
      const nextPath = pathname.replace(
        new RegExp(`^/${locale}(?=/|$)`),
        `/${next}`
      );

      startTransition(() => {
        router.push(`${nextPath || `/${next}`}${hash}`);
      });
    },
    [locale, pathname, router]
  );

  return { locale, switchLocale, isPending };
}
