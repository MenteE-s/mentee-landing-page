import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const products = [
  {
    label: "MenteE Embed",
    tag: null,
    href: "/research",
    hrefLabel: "Read the research",
    external: false,
    d: "Compact multilingual text embedding model — ~41M params, trained from scratch for Arabic, English, and Urdu retrieval. 384-dim, Apache 2.0.",
  },
  {
    label: "MenteE SWE",
    tag: "Beta",
    href: "/products/swe",
    hrefLabel: "Learn more",
    external: false,
    d: "Autonomous SWE agent in your terminal. Investigates, edits, verifies with your tests, reports with evidence. Model-agnostic, safe by design.",
  },
];

export function ProductCards() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Products
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
          What we build
        </h2>
        <p className="mt-2 max-w-xl text-sm text-neutral-600">
          Two platforms, one mission: production-grade AI that actually ships.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {products.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.08}>
            <div className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-900">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-neutral-900">{p.label}</h3>
                {p.tag && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    {p.tag}
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{p.d}</p>
              <div className="mt-6">
                {p.external ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
                  >
                    {p.hrefLabel} →
                  </a>
                ) : (
                  <Link
                    href={p.href}
                    className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
                  >
                    {p.hrefLabel} →
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
