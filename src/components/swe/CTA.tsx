import { Reveal } from "@/components/Reveal";

export function SWECTA() {
  return (
    <section className="border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Ready to try MenteE SWE?
          </h2>
          <p className="mt-3 text-neutral-600">
            Install globally, configure a provider, and start tasks in your
            terminal.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://www.npmjs.com/package/@menteeai/menteeswe"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              npm i -g @menteeai/menteeswe
            </a>
            <a
              href="https://github.com/MenteE-s/mentee-swe"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
            >
              View on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
