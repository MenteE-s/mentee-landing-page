import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ResearchTeaser } from "@/components/ResearchTeaser";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { Capabilities } from "@/components/Capabilities";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { NotificationBubble } from "@/components/NotificationBubble";
import Link from "next/link";
import { posts } from "./blog/posts";

export const metadata: Metadata = {
  title: "MenteE AI — Trilingual Embeddings & AI Products",
  description:
    "MenteE AI builds open multilingual embedding models (Arabic, English, Urdu) and production-ready AI platforms. mentee-embed-v3 — 41M params, Apache 2.0, trained from scratch.",
  keywords: [
    "MenteE AI", "menteeai.org", "mentee-embed", "mentee-embed-v3",
    "Arabic NLP", "Urdu NLP", "multilingual embeddings", "AI products",
    "Syed Syab Ahmad", "syab.tech",
  ],
  alternates: { canonical: "https://menteeai.org" },
  openGraph: {
    title: "MenteE AI — Trilingual Embeddings & AI Products",
    description:
      "Open multilingual embedding models for Arabic, English and Urdu. Production-ready AI platforms. mentee-embed-v3 is live on Hugging Face.",
    url: "https://menteeai.org",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "MenteE AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MenteE AI — Trilingual Embeddings & AI Products",
    description: "Open multilingual embedding models for Arabic, English and Urdu.",
    images: ["/MenteE.png"],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <ResearchTeaser />
        <WhatWeBuild />
        <Capabilities />
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Blog</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">Latest articles</h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-600">
                Product updates, research notes and founder insights.
              </p>
            </div>
            <Link href="/blog" className="hidden text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline sm:block">
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-neutral-200 p-6 hover:border-neutral-900">
                <div className="text-xs text-neutral-500">{p.coverLabel} · {p.readTime}</div>
                <h3 className="mt-3 line-clamp-2 text-base font-semibold text-neutral-900 group-hover:underline underline-offset-4">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <NotificationBubble />
    </>
  );
}
