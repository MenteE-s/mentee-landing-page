import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Support — MenteE",
  description:
    "Get help from the MenteE team — documentation, direct support, and resources for our platforms.",
};

const channels = [
  {
    t: "Documentation",
    d: "Comprehensive guides, API references, and walkthroughs for every MenteE platform.",
    href: "#",
  },
  {
    t: "Technical Support",
    d: "Direct access to our engineering team for troubleshooting, integration help, and performance questions.",
    href: "/contact",
  },
  {
    t: "Status Page",
    d: "Real-time system status, incident history, and scheduled maintenance windows.",
    href: "#",
  },
  {
    t: "Community",
    d: "Connect with other MenteE users, share patterns, and learn from production use.",
    href: "#",
  },
];

const faqs = [
  {
    q: "What are your support hours?",
    a: "Enterprise customers receive 24/7 support with guaranteed response times. All other users have access to business-hours support with same-day response.",
  },
  {
    q: "How do I report an incident?",
    a: "Contact our technical support team directly or raise an issue through your account dashboard. Critical issues receive immediate escalation.",
  },
  {
    q: "Do you offer onboarding assistance?",
    a: "Yes. Every platform includes structured onboarding. Enterprise plans include dedicated technical account management.",
  },
  {
    q: "Where can I find API documentation?",
    a: "Full API references, SDKs, and integration guides are available in our documentation portal. Access is provided with your MenteE account.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Support
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              We stand behind what we build.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              Every MenteE platform is backed by direct access to our
              engineering team — not a ticket queue.
            </p>
          </Reveal>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-6 sm:grid-cols-2">
              {channels.map((c, i) => (
                <Reveal key={c.t} delay={i * 0.08}>
                  <a
                    href={c.href}
                    className="group block h-full rounded-2xl border border-neutral-100 bg-white p-8 transition-colors hover:border-neutral-300"
                  >
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {c.t}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">{c.d}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                      Go to {c.t.toLowerCase()} →
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="py-6">
                  <h3 className="font-medium text-neutral-900">{f.q}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Need help?
              </h2>
              <p className="mt-3 text-neutral-600">
                Reach our team directly — we respond within one business day.
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href="/contact"
                  className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  Contact support
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
