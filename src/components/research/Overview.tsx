"use client";

import { Reveal, PublicationCard } from "./shared";

export function Overview() {
  return (
    <section id="overview" className="scroll-mt-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          MenteE AI · Technical Report
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          mentee-embed research
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          Trilingual embedding models (Arabic, English, Urdu) trained entirely
          from scratch. Three versions: <strong>v1</strong> (baseline, ~810K
          triplets), <strong>v3</strong> (2.1M triplets, MS-MARCO, hard
          negatives), and <strong>v4</strong> (2.6M triplets, mMARCO Arabic,
          3-round distillation). Full benchmarks, training details, and honest
          evaluations below.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-8">
          <PublicationCard version="v4" />
        </div>
      </Reveal>
    </section>
  );
}
