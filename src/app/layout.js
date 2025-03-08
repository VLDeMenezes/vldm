import Script from "next/script";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

export const metadata = {
  title: "VLDM - Desarrollador Web y Móvil",
  description:
    "Portafolio profesional de VLDM, especializado en desarrollo web, diseño responsivo y aplicaciones móviles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="relative">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <!-- Primary Meta Tags --> */}
        <title>VLDM Portfolio</title>
        <meta name="title" content="VLDM Portfolio" />
        <meta name="description" content="FullStack Developer" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vldm.is-a.dev/" />
        <meta property="og:title" content="VLDM Portfolio" />
        <meta
          property="og:description"
          content="FullStack Developer - Desarrollador Web y Móvil"
        />
        <meta property="og:image" content="/TagFoto.webp" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://vldm.is-a.dev/" />
        <meta property="twitter:title" content="VLDM Portfolio" />
        <meta property="twitter:description" content="FullStack Developer" />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />
        <meta
          name="keywords"
          content="Desarrollo web, aplicaciones móviles, portafolio, diseño responsivo"
        />
        <meta name="author" content="VLDM" />
      </head>
      <body className={` antialiased duration-300 min-h-screen`}>
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center animate-backgroundMove"
          style={{
            backgroundImage: "url('/stacked.svg')",
            opacity: 0.6,
          }}
        />

        <header>
          <NavBar />
        </header>

        <main>{children}</main>

        <footer>
          <Footer />
        </footer>

        <Script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          strategy="lazyOnload"
          nonce="<uniqueNonce>"
        />

        {/* <style jsx global>{`
          @media (prefers-reduced-motion: reduce) {
            .animate-backgroundMove {
              animation: none;
            }
          }
        `}</style> */}
      </body>
    </html>
  );
}
