"use client";

import { Reveal, PublicationCard } from "./shared";
import type { ModelId } from "./data";

export function Overview({ model }: { model: ModelId }) {
  return (
    <section id="overview" className="scroll-mt-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          MenteE AI · Open Research
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Published research
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          Two open research lines, both with full benchmarks and honest
          limitations. <strong>Think While You Speak</strong>: a NumPy-only
          architecture where a memory-aware monitor decides when a model should
          think. <strong>mentee-embed</strong>: trilingual embedding models
          (Arabic, English, Urdu) trained entirely from scratch, v1 through v4.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-8">
          <PublicationCard version={model === "acp" ? "acp" : "v4"} />
        </div>
      </Reveal>
    </section>
  );
}
