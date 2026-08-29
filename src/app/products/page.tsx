import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — MenteE",
  description:
    "AI-powered platforms built for production — multilingual embeddings and autonomous software engineering.",
};

const products = [
  {
    label: "MenteE Embed",
    tag: null,
    href: "/research",
    hrefLabel: "Read the research",
    d: "Compact multilingual text embedding model — ~41M params, trained from scratch for Arabic, English, and Urdu retrieval. 384-dimensional outputs, up to 512-token context, fully reproducible. Apache 2.0.",
    stats: [
      { k: "~41M", v: "Parameters" },
      { k: "384", v: "Dimensions" },
      { k: "3", v: "Languages" },
      { k: "Apache 2.0", v: "License" },
    ],
  },
  {
    label: "MenteE SWE",
    tag: "Beta",
    href: "/products/swe",
    hrefLabel: "Learn more",
    d: "Autonomous software-engineering agent that lives in your terminal. Investigates your repository, plans changes, edits files, verifies with your tests, and reports with evidence. Model-agnostic, safe by design.",
    stats: [
      { k: "Model-agnostic", v: "Kimi, GLM, Z.ai" },
      { k: "Safe", v: "No silent deletions" },
      { k: "Persistent", v: "Memory across sessions" },
      { k: "MIT", v: "Licensed" },
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Products
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Platforms built for production, not demos.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              Every MenteE platform is engineered for reliability at scale —
              designed to be used, not just shown.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-neutral-900">{p.label}</h2>
                    {p.tag && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">{p.d}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {p.stats.map((s) => (
                      <div key={s.v} className="rounded-lg bg-neutral-50 px-3 py-2">
                        <p className="text-sm font-bold text-neutral-900">{s.k}</p>
                        <p className="text-[11px] text-neutral-500">{s.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href={p.href}
                      className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
                    >
                      {p.hrefLabel} →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Want to see our platforms in action?
              </h2>
              <div className="mt-6 flex justify-center">
                <a
                  href="/contact"
                  className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
