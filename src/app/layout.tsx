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
  title: "MenteE — Intelligent automation for modern teams",
  description:
    "MenteE builds practical, production-ready AI that automates complex workflows, improves productivity, and helps businesses make better use of their data.",
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
