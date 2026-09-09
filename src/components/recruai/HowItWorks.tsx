import { Reveal } from "@/components/Reveal";

const seekerSteps = [
  {
    step: "01",
    title: "Create Profile + Optimize CV",
    desc: "Sign up, upload your CV and let AI rewrite it for ATS, add Gulf-ready keywords, and boost your score.",
  },
  {
    step: "02",
    title: "Find Your Perfect Job",
    desc: "Get AI-matched jobs in Pakistan (Karachi, Lahore, Islamabad) and Gulf (Dubai, Riyadh, Doha, Kuwait).",
  },
  {
    step: "03",
    title: "Practice Interviews",
    desc: "Take unlimited AI mock interviews. Get real-time feedback and improve your scores with each attempt.",
  },
  {
    step: "04",
    title: "Apply & Get Invited",
    desc: "Apply with one click, track applications, and get direct invitations from top employers.",
  },
  {
    step: "05",
    title: "Hired & Onboarded",
    desc: "Get flagged as hired with details on who hired you and when — track milestones in one place.",
  },
];

const orgSteps = [
  {
    step: "01",
    title: "Post Jobs",
    desc: "Create and publish job listings to reach thousands of qualified candidates instantly.",
  },
  {
    step: "02",
    title: "Search Candidates",
    desc: "Browse profiles, filter by skills and experience to find perfect matches for your role.",
  },
  {
    step: "03",
    title: "Send Invitations",
    desc: "Invite candidates directly through the platform for initial screening and interviews.",
  },
  {
    step: "04",
    title: "AI Screening",
    desc: "Automated AI evaluation before first human interview — save time, reduce bias.",
  },
  {
    step: "05",
    title: "Hire & Onboard",
    desc: "Flag candidates as hired, track status, and manage onboarding with your team.",
  },
];

export function RecruAIHowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">How It Works</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            From <span className="text-neutral-400">practice</span> to <span className="text-neutral-400">hire</span> to{" "}
            <span className="text-neutral-400">onboard</span>
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-600">
            Whether you&apos;re practicing or hiring, RecruAI guides you every step of the way.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Seeker */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10">
            <h3 className="border-b border-neutral-100 pb-4 text-sm font-bold uppercase tracking-widest text-neutral-900">
              Job Seeker Journey — Pakistan to Gulf
            </h3>
            <div className="mt-8 space-y-7">
              {seekerSteps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Org */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10">
            <h3 className="border-b border-neutral-100 pb-4 text-sm font-bold uppercase tracking-widest text-neutral-900">
              Organization Journey
            </h3>
            <div className="mt-8 space-y-7">
              {orgSteps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-neutral-900 ring-1 ring-neutral-200">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
