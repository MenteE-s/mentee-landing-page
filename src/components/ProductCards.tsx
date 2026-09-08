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
    stats: [
      { k: "~41M", v: "Parameters" },
      { k: "384", v: "Dimensions" },
      { k: "3", v: "Languages" },
      { k: "v4", v: "Latest" },
    ],
  },
  {
    label: "MenteE SWE",
    tag: "Beta",
    href: "/products/swe",
    hrefLabel: "Learn more",
    external: false,
    d: "Autonomous SWE agent in your terminal. Investigates, edits, verifies with your tests, reports with evidence. Model-agnostic, safe by design.",
    stats: [
      { k: "CLI", v: "Terminal-native" },
      { k: "Any", v: "Model provider" },
      { k: "Safe", v: "By design" },
      { k: "MIT", v: "Licensed" },
    ],
  },
  {
    label: "RecruAI",
    tag: "Live",
    href: "/products/recruai",
    hrefLabel: "Explore platform",
    external: false,
    d: "AI-powered hiring and interview platform — built for Pakistan, expanding across the Gulf (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman). Job seekers find AI-matched roles, optimize CVs, practice mock interviews, and track applications. Organizations post unlimited listings, manage hiring pipelines, and screen candidates with AI agents.",
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
    <section className="border-y border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Products
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            What we build
          </h2>
          <p className="mt-4 max-w-xl text-lg text-neutral-600">
            Three platforms, one mission: production-grade AI that actually ships.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <div className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-8 transition-all hover:border-neutral-900 hover:shadow-lg sm:p-10">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold text-neutral-900">{p.label}</h3>
                  {p.tag && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="mt-4 flex-1 text-base leading-relaxed text-neutral-600">{p.d}</p>

                {/* Stat chips */}
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {p.stats.map((s) => (
                    <div key={s.v} className="rounded-xl bg-neutral-50 px-3 py-2.5 text-center">
                      <p className="text-sm font-bold text-neutral-900">{s.k}</p>
                      <p className="text-[10px] text-neutral-500">{s.v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  {p.external ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:no-underline"
                    >
                      {p.hrefLabel}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={p.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:no-underline"
                    >
                      {p.hrefLabel}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
