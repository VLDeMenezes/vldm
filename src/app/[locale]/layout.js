import "../globals.css";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale, locales } from "@/i18n/settings";
import resources from "@/i18n/resources";
import I18nProvider from "@/i18n/I18nProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import Analytics from "@/components/Analytics";
import ThemeSync from "@/components/ThemeSync";
import { profile } from "@/data/profile";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = resources[locale]?.Meta ?? resources[defaultLocale].Meta;
  const path = `/${isLocale(locale) ? locale : defaultLocale}`;

  return {
    metadataBase: new URL(profile.url),
    title: meta.title,
    description: meta.description,
    keywords: [
      "Full Stack Developer",
      "Frontend Engineer",
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Barcelona",
      "remote",
    ],
    authors: [{ name: profile.fullName, url: profile.url }],
    creator: profile.fullName,
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: profile.name,
      title: meta.title,
      description: meta.description,
      locale: path === "/es" ? "es_ES" : "en_US",
      images: [
        {
          url: "/TagFoto.webp",
          width: 1200,
          height: 628,
          alt: meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/TagFoto.webp"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D9CCC1" },
    { media: "(prefers-color-scheme: dark)", color: "#011720" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: "VLDM",
  jobTitle: "Full Stack Developer & Frontend Engineer",
  description:
    "Full Stack Developer and Frontend Engineer with 6+ years building web and mobile products.",
  url: profile.url,
  email: profile.email,
  image: `${profile.url}/profile.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  sameAs: [profile.linkedin, profile.github],
  knowsLanguage: ["es", "en"],
  knowsAbout: [
    "React",
    "React Native",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS",
    "CI/CD",
    "AI-assisted engineering",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Soy Henry" },
    { "@type": "CollegeOrUniversity", name: "Silicon Misiones" },
  ],
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const year = new Date().getFullYear();
  const schema = JSON.stringify(personSchema).replace(/</g, "\\u003c");

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={geistSans.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      </head>
      <body className="antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 animate-backgroundMove bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/stacked.svg')" }}
        />

        <I18nProvider key={locale} locale={locale}>
          <ThemeSync />
          <SkipLink />
          <header>
            <NavBar />
          </header>
          <main id="main" tabIndex={-1} className="pb-28 md:pb-0 md:pl-24">
            <div className="section-shell py-6 md:py-10">{children}</div>
          </main>
          <footer className="md:pl-24">
            <Footer year={year} />
          </footer>
          <Analytics />
        </I18nProvider>
      </body>
    </html>
  );
}
