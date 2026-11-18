import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const products = [
  {
    label: "MenteE Embed",
    chapter: "Language",
    tag: null,
    href: "/research",
    hrefLabel: "Read the research",
    external: false,
    d: "Compact multilingual text embedding model — ~41M params, trained from scratch for Arabic, English, and Urdu retrieval, so search works in the languages a billion people actually use. 384-dim, Apache 2.0.",
    stats: [
      { k: "~41M", v: "Parameters" },
      { k: "384", v: "Dimensions" },
      { k: "3", v: "Languages" },
      { k: "v4", v: "Latest" },
    ],
  },
  {
    label: "MenteE SWE",
    chapter: "Software engineering",
    tag: "Beta",
    href: "/products/swe",
    hrefLabel: "Learn more",
    external: false,
    d: "Autonomous SWE agent in your terminal. Investigates your repo, plans the change, edits, verifies with your tests, reports with evidence. Model-agnostic, safe by design.",
    stats: [
      { k: "CLI", v: "Terminal-native" },
      { k: "Any", v: "Model provider" },
      { k: "npx", v: "Zero-install try" },
      { k: "MIT", v: "Licensed" },
    ],
  },
  {
    label: "RecruAI",
    chapter: "Work & opportunity",
    tag: "Live",
    href: "/products/recruai",
    hrefLabel: "Explore platform",
    external: false,
    d: "AI hiring and interview platform — semantic role matching, ATS-scored CV optimization, unlimited mock interviews with instant feedback, and screening agents for organization pipelines. Built for Pakistan and expanding across the Gulf: UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman.",
    stats: [
      { k: "AI", v: "Matching" },
      { k: "ATS", v: "Scoring" },
      { k: "Pipeline", v: "Automation" },
      { k: "Gulf", v: "Coverage" },
    ],
  },
];

export function ProductCards() {
  return (
    <section id="products" className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Under the MenteE umbrella
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Chapters of one research programme.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-neutral-600">
            Language, software engineering, work and opportunity — each product
            is a field the research has reached so far, built and verified by
            the same two people.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-neutral-200">
          {products.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <article className="group grid gap-6 border-b border-neutral-200 py-12 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-1">
                  <span className="font-mono text-xs text-neutral-400">
                    0{i + 1}
                  </span>
                </div>

                <div className="md:col-span-7">
                  <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    Chapter {String(i + 1).padStart(2, "0")} · {p.chapter}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                      {p.label}
                    </h3>
                    {p.tag && (
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          p.tag === "Live"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
                    {p.d}
                  </p>
                  <Link
                    href={p.href}
                    className="mt-6 inline-block text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:no-underline"
                  >
                    {p.hrefLabel} →
                  </Link>
                </div>

                <div className="md:col-span-4 md:pl-8">
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                    {p.stats.map((s) => (
                      <div key={s.v} className="min-w-0">
                        <dd className="text-sm font-semibold tracking-tight text-neutral-900">
                          {s.k}
                        </dd>
                        <dt className="mt-0.5 text-xs text-neutral-500">
                          {s.v}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
