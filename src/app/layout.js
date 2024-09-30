import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "VLDM",
  description: "Portafolio De Menezes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="relative">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased duration-300 min-h-screen`}
      >
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center  animate-backgroundMove"
          style={{
            backgroundImage: "url('/stacked.svg')",

            opacity: 0.6,
          }}
        />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
