import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    t: "Model-agnostic",
    d: "Bring your own API key. Switch between Kimi, GLM, Z.ai, and more — the agent runtime stays the same.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    t: "Autonomous loop",
    d: "Tool-calling loop with iteration caps, smart failure recovery, and rate-limit resilience. Describes a task, explores, edits, verifies.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    t: "Safe by design",
    d: "No silent deletions, no unbounded reads, no destructive commands without approval. Scoped to your workspace.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    t: "Persistent memory",
    d: "Remembers prior conversations and project knowledge across restarts. Every task saved to disk and re-injected as context.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    t: "Complete tool suite",
    d: "Filesystem, search, git, execution, testing, diagnostics, memory, and web — all available to the agent.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    t: "Live terminal UI",
    d: "Real-time status, category-colored tool calls, typing animation, per-task stats. Keyboard-driven control.",
  },
];

export function SWEFeatures() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Key features
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.06}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
                {f.icon}
              </div>
              <h3 className="mt-4 font-semibold text-neutral-900">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
