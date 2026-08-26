import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CursorTrail } from "@/components/CursorTrail";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://menteeai.org"),
  verification: {
    google: "7TPElgdSdBMXV0qeAJCsNfgK97mp1JS0BJlorG6nvD8",
  },
  title: {
    default: "MenteE AI — Trilingual Embeddings & AI Products",
    template: "%s | MenteE AI",
  },
  description:
    "MenteE AI builds production-ready AI platforms and open multilingual embedding models for Arabic, English and Urdu. Open research, honest benchmarks, Apache 2.0.",
  keywords: [
    "MenteE AI",
    "menteeai.org",
    "mentee-embed",
    "multilingual embeddings",
    "Arabic NLP",
    "Urdu NLP",
    "AI product company",
    "text embeddings",
    "knowledge distillation",
    "Syed Syab Ahmad",
    "syab.tech",
  ],
  authors: [{ name: "MenteE AI", url: "https://menteeai.org" }],
  creator: "MenteE AI",
  publisher: "MenteE AI",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://menteeai.org",
    siteName: "MenteE AI",
    title: "MenteE AI — Trilingual Embeddings & AI Products",
    description:
      "Open multilingual embedding models for Arabic, English and Urdu. Production-ready AI platforms. Open research and honest benchmarks.",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "MenteE AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MenteE AI — Trilingual Embeddings & AI Products",
    description:
      "Open multilingual embedding models for Arabic, English and Urdu. Production-ready AI platforms.",
    images: ["/MenteE.png"],
    creator: "@menteeai",
  },
  alternates: { canonical: "https://menteeai.org" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PC622GPGMP"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PC622GPGMP');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <ScrollToTop />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
