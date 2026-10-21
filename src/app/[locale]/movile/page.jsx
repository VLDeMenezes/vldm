import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import resources from "@/i18n/resources";
import { defaultLocale, isLocale } from "@/i18n/settings";
import PhoneScreen from "@/components/PhoneScreen";
import MovileFocusGuard from "@/components/MovileFocusGuard";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  const copy = resources[safeLocale].Movile;

  return {
    title: copy.title,
    description: copy.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${safeLocale}/movile`,
      languages: { en: "/en/movile", es: "/es/movile" },
    },
  };
}

export default async function MobilePage({ params }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  const copy = resources[safeLocale].Movile;

  return (
    <MovileFocusGuard>
      <div className="fixed inset-0 z-50 overflow-hidden bg-SectionDark text-InkDark">
        <h1 className="sr-only">{copy.title}</h1>
        <Link
          href={`/${safeLocale}`}
          className="absolute left-4 top-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-Ink shadow-lg"
        >
          <IoArrowBack aria-hidden="true" className="text-lg" />
          {copy.back}
        </Link>
        <PhoneScreen locale={safeLocale} title={copy.iframeTitle} />
      </div>
    </MovileFocusGuard>
  );
}
