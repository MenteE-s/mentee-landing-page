import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Research — MenteE",
  description:
    "MenteE researches practical AI — building systems that work reliably in production, not just in labs.",
};

const focus = [
  {
    t: "Reliable Agentic Systems",
    d: "How do you build AI agents that operate reliably in high-stakes, real-world environments? We research failure modes, recovery patterns, and trust mechanisms for production-grade autonomy.",
  },
  {
    t: "Scalable Data Intelligence",
    d: "Turning massive, heterogeneous data into structured insight — at the speed and accuracy enterprises demand.",
  },
  {
    t: "Human-AI Collaboration",
    d: "Designing interfaces and workflows where AI augments human judgment rather than replacing it — keeping people in the loop where it matters.",
  },
  {
    t: "Responsible Deployment",
    d: "Building frameworks for safe, auditable, and equitable AI systems — ensuring our technology earns the trust it requires.",
  },
];

const principles = [
  "We publish findings that advance the field, not just our products.",
  "We test in production-like environments, not just benchmarks.",
  "We prioritize reliability over novelty.",
  "We build systems we would trust with our own data.",
];

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Research
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              AI research that ships.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              Our research is driven by production constraints — not academic
              curiosity alone. Every hypothesis is tested against real-world
              reliability, scale, and operational impact.
            </p>
          </Reveal>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Research focus areas
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {focus.map((f, i) => (
                <Reveal key={f.t} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-neutral-100 bg-white p-8">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {f.t}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {f.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              How we work
            </h2>
          </Reveal>
          <div className="mt-8 max-w-2xl space-y-4">
            {principles.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-medium text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm text-neutral-700">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
