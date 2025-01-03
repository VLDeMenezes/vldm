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
        <meta
          name="keywords"
          content="Desarrollo web, aplicaciones móviles, portafolio, diseño responsivo"
        />
        <meta name="author" content="VLDM" />
        <meta property="og:title" content="VLDM - Desarrollador Web y Móvil" />
        <meta
          property="og:description"
          content="Portafolio profesional de VLDM, especializado en desarrollo web y aplicaciones móviles."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VLDM - Desarrollador Web y Móvil" />
        <meta
          name="twitter:description"
          content="Portafolio profesional de VLDM."
        />
        <meta name="twitter:image" content="/twitter-image.jpg" />
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
