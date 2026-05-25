import type { Metadata, Viewport } from "next";
import { Inter, Kantumruy_Pro } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  variable: "--font-kantumruy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "បូករហ័ស — Quick Sum",
  description: "Paste numbers, get instant totals. Fast, clean, offline-ready.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NumSum",
  },
  icons: {
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#6ee7b7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dark mode removed — light mode only
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${kantumruy.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Inter & Kantumruy Pro are loaded via next/font (self-hosted) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
