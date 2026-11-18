"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const authors = [
  {
    mark: "1",
    name: "Syed Syab Ahmad Shah",
    affiliation: "MenteE AI — Founder & Lead Engineer",
    contributions: [
      "Conceived and designed the mentee-embed study",
      "Trained all models from random initialization",
      "Wrote the manuscript and released under DOI",
    ],
    artifacts: [
      { label: "How Far Can Multilingual Embeddings Be Trained From Scratch?", meta: "Zenodo · 10.5281/zenodo.22117673" },
      { label: "mentee-embed-v1", meta: "Zenodo · Apache 2.0" },
    ],
    href: "/research",
    linkLabel: "Read the research",
  },
  {
    mark: "2",
    name: "Sania Shakeel",
    affiliation: "MenteE AI — Co-Founder & Data Scientist",
    contributions: [
      "Built retrieval and evaluation pipelines",
      "Data preparation and hard-negative mining",
      "Cross-lingual analysis for Arabic, English, Urdu",
    ],
    artifacts: [
      { label: "Applied Data Science with Python", meta: "University of Michigan" },
      { label: "Applied Social Network Analysis in Python", meta: "University of Michigan" },
    ],
    href: "https://www.linkedin.com/in/saniashakeel/",
    linkLabel: "Profile",
  },
];

export function TeamAlt() {
  return (
    <section id="team" className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          Authors
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Who does the work at MenteE
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          We publish what we build. These are the people behind the papers and
          the products — listed the way we list them in the manuscript.
        </p>
      </Reveal>

      <div className="mt-14 space-y-14">
        {authors.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="flex items-baseline gap-2">
                <sup className="font-mono text-xs text-neutral-400">
                  {a.mark}
                </sup>
                <h3 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                  {a.name}
                </h3>
              </div>

              <p className="mt-1.5 font-mono text-xs text-neutral-500">
                {a.affiliation}
              </p>

              <ul className="mt-5 space-y-2 border-l border-neutral-200 pl-5">
                {a.contributions.map((c) => (
                  <li key={c} className="text-sm leading-relaxed text-neutral-600">
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3">
                {a.artifacts.map((art) => (
                  <div
                    key={art.label}
                    className="flex flex-col gap-0.5 border-b border-neutral-100 pb-3"
                  >
                    <p className="text-sm text-neutral-800">{art.label}</p>
                    <p className="font-mono text-[11px] text-neutral-400">
                      {art.meta}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={a.href}
                className="mt-5 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
              >
                {a.linkLabel} →
              </Link>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 border-t border-neutral-200 pt-6">
          <p className="font-mono text-xs leading-relaxed text-neutral-500">
            Correspondence — Syed Syab Ahmad Shah, MenteE AI.
            <br />
            We hire rarely and remotely.{" "}
            <Link
              href="/careers"
              className="text-neutral-900 underline underline-offset-4 hover:no-underline"
            >
              Open roles
            </Link>
            .
          </p>
        </div>
      </Reveal>
    </section>
  );
}
