import { Reveal } from "@/components/Reveal";

export function SWEHero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-12 pt-20 md:pt-28">
      <Reveal>
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 shadow-sm">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-amber-900">
              ⚠️ Currently Unstable — Dev Team Is Working on Recovery
            </p>
            <p className="mt-1 text-xs leading-relaxed text-amber-800">
              The current build may contain bugs or unexpected behavior. Our
              team is actively investigating and restoring stability. Please
              use with caution and report any issues on GitHub.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            MenteE SWE
          </p>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            Unstable
          </span>
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          The autonomous SWE agent that lives in your terminal.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          It interprets your task, searches code, calls tools, and delivers verified changes.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://github.com/MenteE-s/mentee-swe"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            View on GitHub
          </a>
          <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 font-mono text-xs text-neutral-600">
            npm i -g @menteeai/menteeswe
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-500">
          <span className="rounded-full border border-neutral-200 px-3 py-1">Go</span>
          <span className="rounded-full border border-neutral-200 px-3 py-1">Open-source</span>
          <span className="rounded-full border border-neutral-200 px-3 py-1">MIT</span>
          <span className="rounded-full border border-neutral-200 px-3 py-1">5 LLM providers</span>
        </div>
      </Reveal>
    </section>
  );
}
