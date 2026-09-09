import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function RecruAITeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white">
          {/* top dark banner */}
          <div className="bg-neutral-900 px-8 py-10 sm:px-12 sm:py-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live Product
              </span>
              <span className="text-xs font-medium text-neutral-400">by MenteE</span>
            </div>
            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                  RecruAI — AI Hiring
                  <br />
                  <span className="text-neutral-400">and Interview Platform</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300">
                  World&apos;s best AI job portal — built for Pakistan, expanding across the Gulf (UAE,
                  Saudi Arabia, Qatar, Kuwait, Oman, Bahrain). AI-matched jobs, ATS-optimized CVs,
                  unlimited mock interviews, and pipeline automation for organizations.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/products/recruai"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-transform hover:scale-105"
                  >
                    Explore RecruAI
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="https://recruai.menteeai.org/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    Schedule Demo
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "AI Matching", v: "Find roles tailored to your skills, not keywords" },
                  { k: "ATS 91", v: "CV rewrites that pass screening" },
                  { k: "Mock Interviews", v: "Unlimited practice + instant feedback" },
                  { k: "Pipeline", v: "Applied → Hired, fully tracked" },
                ].map((f) => (
                  <div key={f.k} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                    <div className="text-sm font-bold text-white">{f.k}</div>
                    <div className="mt-1 text-xs leading-relaxed text-neutral-400">{f.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom white section */}
          <div className="grid gap-8 px-8 py-8 sm:px-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2">
                {["Pakistan", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"].map((c) => (
                  <span key={c} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-widest text-neutral-400">
                Built for Pakistan — Expanding across the Gulf &amp; Asia • English live, العربية &amp; اردو coming soon — more languages for every new country
              </p>

              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-neutral-100 pt-6">
                <div>
                  <div className="text-xl font-black tracking-tight text-neutral-900">For Job Seekers</div>
                  <div className="mt-1 text-xs text-neutral-500">Find jobs, optimize CVs, practice interviews, get hired faster.</div>
                </div>
                <div>
                  <div className="text-xl font-black tracking-tight text-neutral-900">For Organizations</div>
                  <div className="mt-1 text-xs text-neutral-500">Post jobs, screen with AI, manage pipelines.</div>
                </div>
                <div>
                  <div className="text-xl font-black tracking-tight text-neutral-900">Hybrid AI Stack</div>
                  <div className="mt-1 text-xs text-neutral-500">PostgreSQL, Kafka, Redis, Flask — production-ready.</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-100">
              <p className="text-sm font-semibold text-neutral-900">Live today</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                RecruAI is live as a MenteE product. Explore the full platform — features, how it works,
                pricing, and testimonials — on the dedicated product page.
              </p>
              <Link
                href="/products/recruai"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:no-underline"
              >
                Go to product page
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
