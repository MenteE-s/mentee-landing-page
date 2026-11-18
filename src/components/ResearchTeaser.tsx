import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import { PublicationCard } from "./PublicationCard";

export function ResearchTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Research · mentee-embed
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          41M parameters, one consumer GPU, and a pretrained baseline beaten on
          trilingual retrieval.
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-600">
          The uncomfortable question behind{" "}
          <strong className="text-neutral-900">mentee-embed</strong> is how much
          of modern NLP&apos;s advantage is inherited weights rather than earned
          capability. So we trained from random initialization — no BERT, no
          XLM-R, no pretrained backbone — for Arabic, English and Urdu
          retrieval. v4 reaches{" "}
          <strong className="text-neutral-900">0.874 MIRACL-AR</strong> and{" "}
          <strong className="text-neutral-900">+146% over v3</strong> on our
          benchmark, at ~41M parameters and 384 dimensions, fully reproducible.
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

      <Reveal delay={0.18}>
        <div className="mt-10">
          <PublicationCard compact />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap gap-4">
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
