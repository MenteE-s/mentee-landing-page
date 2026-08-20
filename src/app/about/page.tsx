import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — MenteE",
  description:
    "MenteE builds practical, production-ready AI that helps businesses automate complex work and make better use of their data.",
};

const values = [
  {
    t: "Practical by design",
    d: "We ship AI that earns its place in real workflows — measured by outcomes, not demos.",
  },
  {
    t: "Built to be trusted",
    d: "Reliability, security, and transparency come first in everything we create.",
  },
  {
    t: "Continuously improving",
    d: "Our systems learn from data and feedback, so they get better the more they're used.",
  },
  {
    t: "Accessible intelligence",
    d: "Advanced AI should be intuitive and usable — not locked behind complexity.",
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
              About MenteE
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Making advanced AI practical, reliable, and within reach.
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              MenteE is an AI-focused technology company. We build intelligent
              systems that help businesses and individuals automate complex
              workflows, improve productivity, and make better use of their data.
            </p>
            <p className="mt-4 text-lg text-neutral-600">
              Our vision is simple: advanced AI should be accessible through
              intuitive, dependable, production-ready technology. We focus on the
              work that matters — simplifying time-consuming processes,
              strengthening decision-making, and helping organizations operate
              more efficiently.
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
              Want to see what MenteE can do for you?
            </h2>
            <div className="mt-6 flex justify-center">
              <Link
                href="/contact"
                className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
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
