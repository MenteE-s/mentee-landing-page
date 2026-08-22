import { Reveal } from "@/components/Reveal";
import Link from "next/link";

const items = [
  {
    t: "AI platforms",
    d: "Production-grade AI systems we design, build, and deploy — engineered for scale, reliability, and real-world use from day one.",
    href: "/products",
    cta: "See products",
  },
  {
    t: "mentee-embed",
    d: "Our compact, multilingual text embedding model — trained from scratch for Arabic, English, and Urdu retrieval. Available to use and build on.",
    href: "/embed-models",
    cta: "Explore the model",
  },
  {
    t: "Research",
    d: "Open, reproducible research behind what we ship. Real measured numbers, failures included, every artifact public.",
    href: "/research",
    cta: "Read research",
  },
];

export function WhatWeBuild() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          What we build
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Products and services, shipped.
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-600">
          We build AI-powered platforms and sell the services around them. No
          briefs, no consulting — just products people use.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.t} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-neutral-100 p-6">
              <h3 className="text-lg font-semibold text-neutral-900">
                {item.t}
              </h3>
              <p className="mt-2 flex-1 text-sm text-neutral-600">{item.d}</p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
              >
                {item.cta} →
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
