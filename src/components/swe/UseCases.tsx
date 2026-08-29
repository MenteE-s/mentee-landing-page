import { Reveal } from "@/components/Reveal";

const useCases = [
  { t: "Fix failing tests", d: "\"fix the failing auth tests and make sure they pass\"" },
  { t: "Add a feature", d: "\"add a /health endpoint that returns 200\"" },
  { t: "Debug regressions", d: "\"why did the build start failing after the last PR?\"" },
  { t: "Refactors", d: "\"rename the User service to Account across the API layer\"" },
  { t: "Onboarding", d: "\"explain how this repo is structured and where auth lives\"" },
  { t: "CI / automation", d: "Headless mode for scripted tasks in pipelines" },
];

export function SWEUseCases() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Use cases
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((u, i) => (
          <Reveal key={u.t} delay={i * 0.06}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-neutral-900">{u.t}</h3>
              <p className="mt-2 text-sm text-neutral-500 font-mono">{u.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
