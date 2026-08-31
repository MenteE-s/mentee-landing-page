import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Autonomous loop",
    description:
      "MenteE plans the steps, invokes the tools, reads the output, and decides what to do next — until your task is done or your iteration budget runs out.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Safe by design",
    description:
      "Dangerous commands are blocked by default. Destructive operations always require explicit approval. Every action is logged to an audit trail.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17l6-6-6-6" />
        <path d="M12 19h8" />
      </svg>
    ),
    title: "6 built-in tools",
    description:
      "run_command, read_files, apply_patch, search_code, list_files, finish_task — the complete toolbox for autonomous software engineering.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Guardrails & budgets",
    description:
      "Hard limits on iterations, tool calls, tokens, and wall-clock time. Configurable per task, with optional webhook alerts when thresholds are crossed.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Interactive TUI",
    description:
      "See every decision as it happens in a terminal UI powered by Ink. Watch tool calls, token usage, and the agent's reasoning live.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    title: "Model-agnostic",
    description:
      "OpenAI, Anthropic, Google, Mistral, OpenRouter, DeepSeek, Groq. Switch providers with one config change. No lock-in.",
  },
];

export function SWEFeatures() {
  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Built for real-world engineering
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              MenteE is not a chatbot. It is an agent that plans, executes, and
              adapts — with safety guardrails you control.
            </p>
          </div>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
