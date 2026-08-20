import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Products — MenteE",
  description:
    "AI-powered platforms built for production — designed for scale, reliability, and real-world use.",
};

const products = [
  {
    t: "MenteE Automate",
    d: "End-to-end workflow orchestration. Multi-step processes handled autonomously — from data intake to decision output — with self-healing pipelines and full auditability.",
  },
  {
    t: "MenteE Insight",
    d: "Real-time data intelligence. Raw, fragmented datasets transformed into structured, actionable insight — surfaced at the point of decision, not after.",
  },
  {
    t: "MenteE Assist",
    d: "Context-aware decision support. AI that understands your domain, reasons over your data, and surfaces recommendations where work happens.",
  },
  {
    t: "MenteE Process",
    d: "Document and knowledge processing at scale. Read, classify, extract, and route unstructured information — without manual triage.",
  },
];

const stats = [
  { k: "99.9%", v: "Uptime SLA" },
  { k: "<200ms", v: "Median response" },
  { k: "SOC 2", v: "Type II compliant" },
  { k: "ISO 27001", v: "Certified" },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Products
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Platforms built for production, not demos.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              Every MenteE platform is engineered for reliability at scale —
              designed to be used, not just shown.
            </p>
          </Reveal>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-12 md:grid-cols-2">
              {products.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.08}>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {p.t}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {p.d}
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
              Enterprise-grade by default
            </h2>
            <p className="mt-3 max-w-xl text-neutral-600">
              Security, uptime, and compliance are not afterthoughts — they are
              foundational requirements.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.v} delay={i * 0.06}>
                <div className="rounded-2xl border border-neutral-100 p-6">
                  <p className="text-2xl font-bold text-neutral-900">{s.k}</p>
                  <p className="mt-1 text-sm text-neutral-500">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Want to see our platforms in action?
              </h2>
              <div className="mt-6 flex justify-center">
                <a
                  href="/contact"
                  className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
