import { Reveal } from "@/components/Reveal";

const forJobSeekers = [
  {
    title: "Find Your Perfect Job",
    description:
      "AI-matched jobs across Pakistan, UAE, Saudi Arabia, Qatar & the Gulf. Tell us your skills — we find roles you'll love.",
  },
  {
    title: "CV Optimization with AI",
    description:
      "Upload your CV and get instant AI rewrites, ATS scores, keywords for Pakistan & Gulf employers, and one-click improvements.",
  },
  {
    title: "Build Strong Profile",
    description:
      "Showcase your experience, skills, education, and achievements. Let organizations find you with a public shareable profile.",
  },
  {
    title: "Practice Mock Interviews",
    description:
      "Take unlimited AI-powered mock interviews. Get real-time feedback on your answers, body language, and confidence.",
  },
  {
    title: "Track Interview Results",
    description:
      "View detailed analytics from past interviews. See your scores, strengths, and areas to improve in one dashboard.",
  },
  {
    title: "Hired Flag & Status",
    description:
      "Get flagged as ‘Hired’ with details on who hired you and when. Track your career milestones and share progress.",
  },
  {
    title: "Job Alerts & Invitations",
    description:
      "Receive alerts for matching jobs. Get invited directly by organizations for interviews — never miss an opportunity.",
  },
];

const forOrganizations = [
  {
    title: "Post Jobs",
    description: "Create and publish job listings. Reach thousands of qualified candidates instantly across Pakistan and the Gulf.",
  },
  {
    title: "Search Candidates",
    description: "Browse profiles, filter by skills and experience. Find the perfect match for your role in seconds.",
  },
  {
    title: "Send Invitations",
    description: "Invite candidates directly through the platform. Schedule and manage interviews effortlessly.",
  },
  {
    title: "AI Screening",
    description: "Automated initial screening with AI. Evaluate candidates before the first human interview and save hours.",
  },
  {
    title: "Manage Pipeline",
    description: "Track candidates from screening to onboarding. Collaborate with your hiring team in one visual pipeline.",
  },
  {
    title: "Flag Hired Candidates",
    description: "Mark candidates as hired with timestamps. Build your talent pool for future roles and onboarding.",
  },
];

export function RecruAIFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Platform Features</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          World&apos;s best job portal for <span className="text-neutral-400">job seekers</span> &amp;{" "}
          <span className="text-neutral-400">organizations</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          From CV optimization to perfect job matching to AI interviews — built for Pakistan, the Gulf &amp; beyond.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {/* For Job Seekers */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <h3 className="text-xl font-bold tracking-tight text-neutral-900">For Job Seekers</h3>
            </div>
          </Reveal>
          <div className="mt-6 space-y-4">
            {forJobSeekers.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md">
                  <h4 className="font-semibold text-neutral-900">{f.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* For Organizations */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-neutral-900 ring-1 ring-neutral-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V7a2 2 0 0 1 2-2h4V9" />
                  <path d="M15 5h4a2 2 0 0 1 2 2v2" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                </svg>
              </span>
              <h3 className="text-xl font-bold tracking-tight text-neutral-900">For Organizations</h3>
            </div>
          </Reveal>
          <div className="mt-6 space-y-4">
            {forOrganizations.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="group rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all hover:border-neutral-900 hover:bg-white hover:shadow-md">
                  <h4 className="font-semibold text-neutral-900">{f.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
