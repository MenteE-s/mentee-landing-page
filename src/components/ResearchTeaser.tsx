import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export function ResearchTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-neutral-50 px-8 py-14">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            MenteE AI Research
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900">
            mentee-embed
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-600">
            We are training compact, multilingual text embedding models from
            scratch — focused on Arabic, English, and Urdu retrieval. ~41M
            parameters, fully reproducible, built to study how far modern
            training recipes can be compressed.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/research"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              Read the research
            </Link>
            <a
              href="https://github.com/MenteE-s/mentee-embeddings"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
