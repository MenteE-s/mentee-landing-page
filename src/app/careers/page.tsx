import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Careers — MenteE",
  description:
    "Join MenteE. We are hiring across engineering, marketing, and advisory roles — all remote, all startup pace.",
};

const openRoles = [
  {
    t: "Digital Marketer",
    slug: "digital-marketer",
    loc: "Remote",
    type: "Full-time",
    d: "Own MenteE's growth engine. Build and execute digital strategies across channels — SEO, paid, content, social — from zero to scale.",
  },
  {
    t: "Full Stack AI Engineer",
    slug: "full-stack-ai-engineer",
    loc: "Remote",
    type: "Full-time",
    d: "Design and ship end-to-end AI products — from model integration to frontend interfaces. Own the full loop.",
  },
  {
    t: "Legal Adviser",
    slug: "legal-adviser",
    loc: "Remote",
    type: "Contract",
    d: "Advise MenteE on legal, compliance, and regulatory matters as we scale — IP, contracts, data privacy, and corporate structure.",
  },
];

const values = [
  {
    t: "Startup pace, real equity",
    d: "We are early-stage. You will not be a cog — you will shape the company.",
  },
  {
    t: "Remote-first, always",
    d: "No office mandate. Work from wherever you do your best thinking.",
  },
  {
    t: "Small team, big ownership",
    d: "Every role is foundational. You will own outcomes, not tasks.",
  },
  {
    t: "Build with AI daily",
    d: "We use what we build. AI is not our product pitch — it is our workflow.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Careers
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Build MenteE with us.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">
              We are a small, early-stage team building production AI systems.
              Every hire shapes the company. All roles are remote.
            </p>
          </Reveal>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                How we work
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08}>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{v.t}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Open roles
            </h2>
            <p className="mt-3 text-neutral-600">
              We are hiring. These are the first seats.
            </p>
          </Reveal>
          <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
            {openRoles.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06}>
                <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <a
                      href={`/careers/${r.slug}`}
                      className="text-lg font-semibold text-neutral-900 underline underline-offset-4 hover:no-underline"
                    >
                      {r.t}
                    </a>
                    <p className="mt-1 text-sm text-neutral-500">{r.d}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-sm text-neutral-500">
                    <span className="rounded-full border border-neutral-200 px-2.5 py-0.5">
                      {r.type}
                    </span>
                    <span>{r.loc}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-8 text-sm text-neutral-500">
              Don&apos;t see a role that fits?{" "}
              <a
                href="mailto:hr@menteeai.org"
                className="font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
              >
                Send us your profile
              </a>{" "}
              — we are always open to exceptional people.
            </p>
          </Reveal>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Ready to join?
              </h2>
              <div className="mt-6 flex justify-center">
                <a
                  href="mailto:hr@menteeai.org"
                  className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  Apply now
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
