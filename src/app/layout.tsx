import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CursorTrail } from "@/components/CursorTrail";
import { JsonLd } from "@/components/JsonLd";
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
    default: "MenteE — Research for humanity",
    template: "%s | MenteE",
  },
  description:
    "MenteE is an umbrella for research aimed at humanity: open multilingual embeddings, autonomous software engineering, applied learning systems. Apache 2.0, honest benchmarks, failures published.",
  keywords: [
    "MenteE",
    "menteeai.org",
    "research organization",
    "open research",
    "applied research",
    "reproducible",
    "mentee-embed",
    "multilingual embeddings",
    "Arabic NLP",
    "Urdu NLP",
    "text embeddings",
    "knowledge distillation",
    "Syed Syab Ahmad",
    "syab.tech",
  ],
  authors: [{ name: "MenteE", url: "https://menteeai.org" }],
  creator: "MenteE",
  publisher: "MenteE",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://menteeai.org",
    siteName: "MenteE",
    title: "MenteE — Research for humanity",
    description:
      "MenteE is an umbrella for research aimed at humanity. We take on fields where the answer is not settled, build the smallest thing that can be checked, and publish the method, the numbers and the failures.",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "MenteE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MenteE — Research for humanity",
    description:
      "An umbrella for research aimed at humanity: open multilingual embedding research, autonomous software engineering, applied learning systems. Apache 2.0, honest benchmarks.",
    images: ["/MenteE.png"],
    creator: "@menteeaiorg",
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
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <ScrollToTop />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
