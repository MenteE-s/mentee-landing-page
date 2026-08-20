"use client";

import { Reveal } from "./Reveal";

const steps = [
  {
    t: "Understand",
    d: "We start with your workflows, goals, and the decisions that matter — mapping where intelligence creates real leverage.",
  },
  {
    t: "Automate",
    d: "We design reliable, production-ready AI systems that take over repetitive, complex, and time-sensitive work.",
  },
  {
    t: "Adapt & scale",
    d: "Solutions learn from your data and evolve with your needs, so performance improves as you grow.",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Our approach
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
            How MenteE approaches AI-powered automation
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            We treat AI as infrastructure for getting work done — engineered for
            reliability first, then layered with intelligence where it counts.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.12}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-medium text-neutral-900">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
