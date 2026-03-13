import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PortalTrackerProvider } from "@/components/providers/PortalTrackerProvider";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stoneclear-website.vercel.app"),
  title: {
    default: "Stone Clear | Stone Restoration, Floor Polishing & Exterior Cleaning",
    template: "%s | Stone Clear",
  },
  description:
    "Stone Clear restores marble, limestone, terrazzo, porcelain, epoxy floors and exterior surfaces for residential, hotel and commercial clients across Ireland.",
  keywords: [
    "stone restoration Ireland",
    "marble polishing Dublin",
    "terrazzo restoration",
    "epoxy floors Ireland",
    "window cleaning",
    "power washing",
  ],
  openGraph: {
    title: "Stone Clear",
    description:
      "Premium stone restoration, floor polishing, cleaning and maintenance services across Ireland.",
    images: ["/stoneclear/hero-floor.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        <Suspense fallback={null}>
          <PortalTrackerProvider />
        </Suspense>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
