import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Solutions — MenteE",
  description:
    "MenteE delivers targeted AI solutions across industries — engineered to solve specific operational challenges at enterprise scale.",
};

const solutions = [
  {
    t: "Financial Services",
    d: "Automate compliance workflows, surface risk signals in real time, and process high-volume document pipelines — reducing manual review from days to seconds.",
    tags: ["Risk", "Compliance", "Document AI"],
  },
  {
    t: "Healthcare & Life Sciences",
    d: "Accelerate clinical data processing, automate prior authorization, and build intelligent research pipelines — while maintaining strict data governance.",
    tags: ["Clinical Data", "Research", "Governance"],
  },
  {
    t: "Enterprise Operations",
    d: "Streamline procurement, HR onboarding, and internal knowledge management — eliminating bottlenecks that slow teams down.",
    tags: ["Procurement", "HR", "Knowledge"],
  },
  {
    t: "Technology & SaaS",
    d: "Embed AI capabilities into your product, automate support workflows, and build intelligent data pipelines — without rebuilding your stack.",
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
              AI that understands your industry.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              MenteE builds solutions tailored to the operational realities of
              your sector &mdash; not generic tools retrofitted to your workflows.
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
              Don&apos;t see your industry?
            </h2>
            <p className="mt-3 text-neutral-600">
              We work across sectors. Tell us what you need — we will scope a
              solution that fits.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="/contact"
                className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Talk to our team
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
