import { Reveal } from "@/components/Reveal";

const useCases = [
  { t: "Fix failing tests", d: "\"fix the failing auth tests and make sure they pass — investigate the auth module, identify the issue, apply a patch, and re-run the test suite to verify.\"" },
  { t: "Add a feature", d: "\"add a /health endpoint that returns 200 — add the route to the API router, implement the handler, write tests, and verify the build passes.\"" },
  { t: "Debug regressions", d: "\"why did the build start failing after the last PR? — analyze the diff, trace the error to the changed code, propose and test a fix.\"" },
  { t: "Refactors", d: "\"rename the User service to Account across the API layer — find all references, update imports and usages, run tests to confirm no breakage.\"" },
  { t: "Onboarding", d: "\"explain how this repo is structured and where auth lives — read the directory structure, identify auth-related files, and summarize the architecture.\"" },
  { t: "CI / automation", d: "Headless mode for scripted tasks in pipelines — run menteeswe non-interactively for automated fixes, deployments, and maintenance jobs." },
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
