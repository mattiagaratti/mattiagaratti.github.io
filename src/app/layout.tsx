import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `${site.name} | %s` },
  description: site.description,
  verification: { google: site.googleSiteVerification },
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description },
};

export const viewport: Viewport = { themeColor: "#00131f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-prussian-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header name={site.name} nav={site.nav} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
