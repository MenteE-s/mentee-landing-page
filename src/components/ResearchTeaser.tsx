import { Reveal } from "@/components/Reveal";
import Link from "next/link";

export function ResearchTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          MenteE AI Research
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          We train embedding models from scratch
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-600">
          Our active research builds <strong className="text-neutral-900">mentee-embed</strong> — compact, multilingual text embedding models trained
          completely from scratch for Arabic, English, and Urdu retrieval. ~41M
          parameters, 384-dimensional outputs, fully reproducible, and built to
          study how far modern training recipes can be compressed when nothing is
          inherited from pretrained giants.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Reveal delay={0.05}>
          <div className="h-full rounded-2xl border border-neutral-100 p-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Two-stage, from zero
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Masked language modeling first, then contrastive fine-tuning — a
              cheap bootstrap that prevents representation collapse.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-neutral-100 p-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Honest by default
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Measured numbers instead of marketing. Failures documented
              alongside wins, every artifact on GitHub and Hugging Face.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="h-full rounded-2xl border border-neutral-100 p-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Low-resource first
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Urdu and Arabic treated as first-class languages — not afterthoughts
              bolted onto an English model.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/research"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Read the research
          </Link>
          <Link
            href="/embed-models"
            className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            Explore the models
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
      </Reveal>
    </section>
  );
}
