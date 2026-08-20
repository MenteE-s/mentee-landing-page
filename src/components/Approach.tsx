"use client";

import { Reveal } from "./Reveal";

const steps = [
  {
    num: "01",
    t: "Build",
    d: "We design and engineer production-grade platforms from the ground up — built for scale, reliability, and real-world use from day one.",
    points: [
      "Full-stack platform development",
      "Production-grade architecture",
      "Built-in observability and monitoring",
    ],
  },
  {
    num: "02",
    t: "Deploy",
    d: "Every platform ships with the infrastructure, security, and operational tooling needed to run at scale — not a demo, not a prototype.",
    points: [
      "Cloud-native deployment",
      "Automated CI/CD pipelines",
      "Security and compliance baked in",
    ],
  },
  {
    num: "03",
    t: "Scale & improve",
    d: "We iterate based on how people actually use the product — shipping improvements, expanding capabilities, and optimizing performance continuously.",
    points: [
      "Data-driven iteration",
      "Continuous performance tuning",
      "Feature expansion based on user needs",
    ],
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-20 border-y border-neutral-100 bg-neutral-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            How we work
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            From concept to production — we ship, not consult
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-600">
            MenteE builds and deploys AI-powered platforms. We do not take
            briefs — we build products that people use.
          </p>
        </Reveal>

        <div className="mt-16 space-y-0">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div className="group grid gap-6 border-t border-neutral-200 py-10 md:grid-cols-[4rem_1fr_1fr] md:gap-10">
                <span className="text-sm font-semibold text-neutral-300">
                  {s.num}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {s.d}
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-neutral-500">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
