import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "1",
    t: "You describe a task",
    d: "Type a plain-English instruction in your terminal. MenteE builds a plan using your repo context.",
  },
  {
    n: "2",
    t: "MenteE plans, executes, and adapts",
    d: "It explores the repo, edits files, runs tests, and self-corrects on failure — choosing the right tools at each step.",
  },
  {
    n: "3",
    t: "You review and approve",
    d: "Every change is previewed before it's applied. You can approve, reject, or undo any action.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              MenteE is not a chatbot. It is an agent that plans, executes, and
              adapts — with safety guardrails you control.
            </p>
          </div>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                  {step.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {step.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SWEHowItWorks() {
  return <HowItWorks />;
}
