import type { Metadata } from "next";
import { Archivo, Lato } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
const primary = Archivo({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});
const secondary = Lato({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://stoneclear-website.vercel.app"),
  title: {
    default: "Stone Clear | The beauty is still there",
    template: "%s | Stone Clear",
  },
  description:
    "Specialist stone restoration, polishing and sealing for homes and businesses. Carlow, Dublin, Kildare and across Ireland. Arrange a free demonstration and quote.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Stone Clear — The beauty is still there",
    description: "Stone restoration, polishing & care across Ireland.",
    images: ["/assets/carrara.webp"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${primary.variable} ${secondary.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
