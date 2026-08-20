import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — MenteE",
  description:
    "MenteE is a product company building AI-powered platforms for real-world use at scale.",
};

const values = [
  {
    t: "We ship products, not proposals",
    d: "Every thing we build is designed to be deployed and used — not presented in a pitch deck.",
  },
  {
    t: "Reliability is non-negotiable",
    d: "Our platforms are engineered for uptime, observability, and failure recovery from the start.",
  },
  {
    t: "Scale from day one",
    d: "We architect for the scale we expect, not the scale we have — so growth is a feature, not a migration.",
  },
  {
    t: "User-first, always",
    d: "If it is not intuitive, it does not ship. Complexity stays on our side.",
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
              We build platforms. People use them. That is the whole point.
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              MenteE is a product company. We design, build, and deploy
              AI-powered platforms — not for show, but for real-world use at
              scale.
            </p>
            <p className="mt-4 text-lg text-neutral-600">
              We do not take client briefs or build custom solutions to order.
              We build what we believe should exist, ship it, and let the
              product speak for itself.
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
                Our products
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
