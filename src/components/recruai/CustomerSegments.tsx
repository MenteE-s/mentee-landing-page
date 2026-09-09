import { Reveal } from "@/components/Reveal";

const segments = [
  {
    title: "Job Seekers",
    subtitle: "Students, Fresh Graduates & Professionals in Pakistan & Gulf",
    benefits: [
      "Find your perfect job with AI matching",
      "CV optimization with ATS score & rewrites",
      "Jobs across Pakistan, UAE, Saudi, Qatar & Gulf",
      "Unlimited AI mock interviews",
      "Real-time feedback & scoring",
      "One-click apply & invitations from organizations",
    ],
    pains: ["Expensive coaching services", "No structured practice", "Unclear interview performance"],
  },
  {
    title: "Organizations",
    subtitle: "Startups, SMEs & Enterprises",
    benefits: [
      "Post unlimited job listings",
      "Search & filter candidates",
      "Send interview invitations",
      "AI-powered initial screening",
      "Candidate pipeline management",
      "Hire & onboard tracking",
    ],
    pains: ["Manual resume screening", "Time-consuming interviews", "Hiring bias"],
  },
];

export function RecruAICustomerSegments() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Who It&apos;s For</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Built for <span className="text-neutral-400">everyone</span> in the hiring process
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-600">A complete ecosystem that serves both sides of the interview table.</p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {segments.map((s, idx) => (
          <Reveal key={s.title} delay={idx * 0.08}>
            <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-8 transition-all hover:border-neutral-900 hover:shadow-lg sm:p-10">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                  {idx === 0 ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="M16 5h4a2 2 0 0 1 2 2v2" />
                      <path d="M3 9V7a2 2 0 0 1 2-2h4V9" />
                    </svg>
                  )}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{s.title}</h3>
                  <p className="text-xs font-medium text-neutral-500">{s.subtitle}</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">What You Get</p>
                <ul className="mt-4 space-y-3">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-neutral-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-neutral-100 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Problems We Solve</p>
                <ul className="mt-4 space-y-3">
                  {s.pains.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-neutral-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
