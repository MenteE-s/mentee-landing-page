import { Reveal } from "@/components/Reveal";

const seekerFeatures = [
  {
    title: "AI Job Matching",
    desc: "Find roles matched to your skills, industry, and preferred locations — Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman.",
  },
  {
    title: "CV Optimization",
    desc: "AI rewrites, ATS scoring, keyword suggestions, and a built-in resume builder that actually passes automated screening filters.",
  },
  {
    title: "Mock Interviews",
    desc: "Practice unlimited interviews with realistic AI-generated questions, get instant feedback, and track your progress over time.",
  },
  {
    title: "Application Dashboard",
    desc: "Track saved roles, applied positions, interview schedules, results, and analytics — everything in one view.",
  },
  {
    title: "Shareable Profile",
    desc: "Build a public profile with visit analytics that you can share with recruiters or embed in job applications.",
  },
];

const orgFeatures = [
  {
    title: "Unlimited Job Listings",
    desc: "Post as many roles as you need. No limits, no hidden tiers — just a clean, fast posting interface.",
  },
  {
    title: "Candidate Search & Filter",
    desc: "Search and filter candidates by skills and experience. Find the right people without scrolling through hundreds of profiles.",
  },
  {
    title: "Interview Invitations",
    desc: "Send interview invitations directly from the platform. Track responses, schedule sessions, and record outcomes.",
  },
  {
    title: "Hiring Pipeline",
    desc: "Visual pipeline: applied → screening → interview → offer → hired. Every candidate's progress is visible to the team.",
  },
  {
    title: "AI Screening Agents",
    desc: "Assign AI agents to review applications automatically. Get structured screening summaries before you spend time on unqualified candidates.",
  },
];

export function RecruAIFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Features</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">What RecruAI does</h2>
        <p className="mt-4 max-w-2xl text-neutral-600">Built for both sides of the hiring process — job seekers and organizations — without compromising either.</p>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">For job seekers</h3>
          <div className="mt-6 space-y-4">
            {seekerFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300">
                <h4 className="font-semibold text-neutral-900">{f.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-neutral-900">For organizations</h3>
          <div className="mt-6 space-y-4">
            {orgFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300">
                <h4 className="font-semibold text-neutral-900">{f.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
