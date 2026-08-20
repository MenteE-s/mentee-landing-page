import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Solutions — MenteE",
  description:
    "MenteE deploys AI-powered platforms across industries — built for real-world use at scale.",
};

const solutions = [
  {
    t: "Financial Services",
    d: "Platforms that automate compliance workflows, surface risk signals in real time, and process high-volume document pipelines.",
    tags: ["Risk", "Compliance", "Document AI"],
  },
  {
    t: "Healthcare & Life Sciences",
    d: "Systems built to accelerate clinical data processing, automate administrative workflows, and support research — with strict data governance.",
    tags: ["Clinical Data", "Research", "Governance"],
  },
  {
    t: "Enterprise Operations",
    d: "Platforms that streamline procurement, HR workflows, and internal knowledge management — eliminating operational bottlenecks.",
    tags: ["Procurement", "HR", "Knowledge"],
  },
  {
    t: "Technology & SaaS",
    d: "AI-powered capabilities designed to integrate into existing products — automate support, process data, and enhance user experiences.",
    tags: ["Product AI", "Support", "Data Pipelines"],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Solutions
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Platforms built for every industry.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              MenteE deploys AI-powered platforms across sectors — each one
              engineered for the operational realities of the industry it serves.
            </p>
          </Reveal>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-8 md:grid-cols-2">
              {solutions.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-neutral-100 bg-white p-8">
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {s.t}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {s.d}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Building for your sector?
            </h2>
            <p className="mt-3 text-neutral-600">
              Our platforms are designed to adapt. Get in touch to see if MenteE
              fits your use case.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="/contact"
                className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
