import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "MenteE is an AI research and innovation company with a vision to make artificial intelligence useful for humanity.",
};

const values = [
  {
    t: "Reproducibility over polish",
    d: "Every result ships with the method that produced it. If it cannot be rerun somewhere else, it is not a result — it is an anecdote.",
  },
  {
    t: "Measurements before claims",
    d: "Parameters, benchmarks, hardware and throughput are stated plainly. Adjectives do not substitute for numbers, and here they never will.",
  },
  {
    t: "Failures published",
    d: "The runs that collapsed are documented beside the ones that worked. A lab that only ever reports wins is not doing research.",
  },
  {
    t: "Low-resource first",
    d: "Arabic and Urdu are trained as first-class languages rather than translated as an afterthought. Roughly a billion people are the point, not the edge case.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              About MenteE AI
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              AI research and innovation, useful for humanity.
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              MenteE is an AI research and innovation company with a vision to
              make artificial intelligence useful for humanity. We explore,
              develop, and apply AI to solve real-world problems across
              different fields of knowledge and human progress.
            </p>
            <p className="mt-4 text-lg text-neutral-600">
              MenteE is building toward a future where AI is more accessible,
              capable, and beneficial to everyone. We welcome investment,
              research collaboration, and strategic partnerships to help turn
              this vision into reality.
            </p>
          </Reveal>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
                What we value
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-neutral-900">
                      {v.t}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              See what we have built
            </h2>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/products"
                className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Our work
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
