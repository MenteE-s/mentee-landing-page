import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "1",
    t: "You describe a task",
    d: "Type a plain-English description in the terminal — \"fix the failing auth tests\" or \"add a /health endpoint\".",
  },
  {
    n: "2",
    t: "MenteE loads context",
    d: "Prior conversations, project memory, and a snapshot of your project tree are loaded as context.",
  },
  {
    n: "3",
    t: "Explores and edits",
    d: "The agent explores only what's needed (bounded reads), reasons about the change, and edits files.",
  },
  {
    n: "4",
    t: "Verifies with your tests",
    d: "Runs your project's own tests, build, and typecheck to confirm the change works.",
  },
  {
    n: "5",
    t: "Reports with evidence",
    d: "Returns a 1–3 sentence answer backed by the command that proved it. Saves the exchange to memory.",
  },
];

export function SWEHowItWorks() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          How it works
        </h2>
        <p className="mt-2 max-w-xl text-neutral-600">
          Five steps from task description to verified result.
        </p>
      </Reveal>
      <div className="mt-10 space-y-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                {s.n}
              </span>
              <div>
                <h3 className="font-semibold text-neutral-900">{s.t}</h3>
                <p className="mt-1 text-sm text-neutral-600">{s.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
