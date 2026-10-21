"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
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
  const [isScrolling, setIsScrolling] = useState(false);

  const paramLocale = params?.locale;
  const locale = isLocale(paramLocale) ? paramLocale : defaultLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const switchLocale = useCallback(
    async (next = locale === "en" ? "es" : "en") => {
      if (!locales.includes(next) || next === locale) return;

      document.cookie = `${cookieName}=${next};path=/;max-age=31536000;samesite=lax`;

      const hash = window.location.hash;
      const nextPath = pathname.replace(
        new RegExp(`^/${locale}(?=/|$)`),
        `/${next}`
      );

      // Let the current page travel smoothly to the top before the locale
      // navigation, instead of jumping as soon as the route changes.
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!hash && !reduceMotion && window.scrollY > 8) {
        setIsScrolling(true);
        await new Promise((resolve) => {
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            window.removeEventListener("scrollend", finish);
            resolve();
          };

          window.addEventListener("scrollend", finish, { once: true });
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.setTimeout(finish, 600);
        });
        setIsScrolling(false);
      }

      startTransition(() => {
        router.push(`${nextPath || `/${next}`}${hash}`);
      });
    },
    [locale, pathname, router]
  );

  return { locale, switchLocale, isPending: isPending || isScrolling };
}
