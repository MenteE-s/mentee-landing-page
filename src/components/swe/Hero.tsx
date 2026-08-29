import { Reveal } from "@/components/Reveal";

export function SWEHero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-12 pt-20 md:pt-28">
      <Reveal>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            MenteE SWE
          </p>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            Beta
          </span>
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          The autonomous SWE agent that lives in your terminal.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          MenteE SWE investigates your repository, plans the change, edits files
          with surgical precision, verifies with your own tests, and reports back
          with evidence — never claiming success without proof.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://www.npmjs.com/package/@menteeai/menteeswe"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            View on npm
          </a>
          <a
            href="https://github.com/MenteE-s/mentee-swe"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
