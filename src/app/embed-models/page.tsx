import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Embed Models — MenteE AI",
  description:
    "mentee-embed: how we built it, how to use it, where the source lives, and the research it builds on.",
};

const stats = [
  { n: "41M", l: "Parameters" },
  { n: "384", l: "Embedding dim" },
  { n: "3", l: "Languages" },
  { n: "0.82", l: "Val acc@1" },
];

const specs = [
  { k: "Architecture", v: "Transformer encoder — 12 layers, hidden 384, 12 heads, FFN 1536" },
  { k: "Output", v: "384-dimensional L2-normalized embeddings, mean pooling" },
  { k: "Context", v: "Up to 128 tokens — longer documents should be chunked" },
  { k: "Parameters", v: "~41 million" },
  { k: "Tokenizer", v: "Custom ByteLevel BPE, 50K vocabulary, trained on our own corpus" },
  { k: "Training objective", v: "Stage A: masked LM → Stage B: relational knowledge distillation + InfoNCE" },
  { k: "Teacher", v: "intfloat/multilingual-e5-base (768-dim)" },
  { k: "Data", v: "~810K triplets ≈ 31.4M tokens" },
  { k: "Hardware", v: "Single consumer GPU, bf16" },
];

const strengths = [
  { t: "In-batch retrieval", d: "Beats all-MiniLM-L6-v2 on every in-batch metric (avg MRR@10 0.585 vs 0.396) — despite being trained from scratch on a single consumer GPU." },
  { t: "Cross-lingual transfer", d: "English↔Urdu acc@1 = 0.757 with no shared script — genuine multilingual transfer, not keyword matching." },
  { t: "Validation performance", d: "val acc@1 = 0.820, surpassing paraphrase-MiniLM-L12-v2 (0.795) on the validation set." },
  { t: "Tiny footprint", d: "41M parameters — ~7× smaller than mpnet-base (278M), ~3× smaller than MiniLM-L12 (118M). Runs on a phone." },
  { t: "Fully reproducible", d: "Every step — data to evaluation — is open and scripted. One command reproduces the full pipeline on a free Colab T4." },
];

const limitations = [
  { t: "Corpus-pool retrieval lags", d: "On open-domain ranking over 15K docs (Protocol B), MRR@10 ≈ 0.19 vs 0.94 for mpnet-base. Best used as a re-ranker, not a standalone billion-document search engine." },
  { t: "Training scope", d: "Trained on NLI + parallel translation data only. Domain-specific retrieval (legal, medical) will need fine-tuning." },
  { t: "Sequence length", d: "Capped at 128 tokens; longer documents should be chunked." },
  { t: "Format", d: "Current model.pt loads via src/model.py; a Sentence-Transformers-compatible export is planned." },
  { t: "Data scale", d: "~810K triplets (31.4M tokens) vs billions used by web-scale models. The gap to mpnet/MiniLM-L12 on MIRACL reflects ~1000× less training data." },
];

const citations = [
  { t: "all-NLI", d: "Source of the 557K English NLI triplets used in Stage-B fine-tuning." },
  { t: "XNLI", d: "Cross-lingual NLI corpus; premise / entailed / contradicted triplets derived for Arabic and Urdu." },
  { t: "MIRACL", d: "Multilingual retrieval corpus used to build clean, held-out evaluation triplets across all three languages." },
  { t: "BERT (Devlin et al., 2019)", d: "Masked language modeling objective used in Stage A." },
  { t: "SBERT (Reimers & Gurevych, 2019)", d: "Siamese / dual-encoder contrastive fine-tuning recipe adapted for from-scratch training." },
  { t: "InfoNCE (Oord et al., 2018)", d: "Contrastive loss with in-batch negatives and an explicit hard-negative column (temperature 0.07)." },
];

const usage = `from sentence_transformers import SentenceTransformer

model = SentenceTransformer("MenteEAI/mentee-embed-v1")

sentences = [
    "How do I file a tax return?",
    "Steps to submit an annual tax filing",
]

emb = model.encode(sentences)
# emb shape: (2, 384) — cosine similarity measures meaning closeness`;

export default function EmbedModelsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Embed Models
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              mentee-embed-v1
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              A compact, multilingual text embedding model trained from scratch
              for Arabic, English, and Urdu retrieval — distilled from a
              state-of-the-art teacher. This page is the model card: how it was
              built, how to use it, and an honest account of what it does well
              and where it falls short.
            </p>
          </Reveal>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-3xl px-6 pb-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.06}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                  <div className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                    {s.n}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                    {s.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How we built it */}
        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                How we built it
              </h2>
              <div className="mt-4 space-y-6 text-neutral-600">
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    Stage A — Masked Language Modeling
                  </h3>
                  <p className="mt-2">
                    The encoder first learns all three languages by reconstructing
                    masked tokens (15% masking, 80/10/10 scheme) over 6,000 steps —
                    no pretrained backbone involved. Validation loss fell steadily
                    across the run, confirming it absorbed the Arabic, English, and
                    Urdu scripts and vocabularies.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    Stage B — Relational Knowledge Distillation
                  </h3>
                  <p className="mt-2">
                    The MLM encoder is too weak to learn retrieval from sparse
                    labels alone, so we distill{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
                      intfloat/multilingual-e5-base
                    </code>{" "}
                    into it: the student learns to reproduce the teacher&apos;s full
                    batch similarity structure (MSE on cosine matrices), combined
                    with InfoNCE. The MLM bootstrap is what prevents representation
                    collapse — contrastive training from random weights collapses to
                    chance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    Fully reproducible
                  </h3>
                  <p className="mt-2">
                    Every step — data fetching, cleaning, deduplication,
                    tokenization, two-stage training, checkpointing, evaluation,
                    packaging — is open and scripted end to end.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* How to use it */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              How to use it
            </h2>
            <p className="mt-3 text-neutral-600">
              The snippet below is the target interface. Today the weights load
              via{" "}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
                src/model.py
              </code>{" "}
              in the repo — a Sentence-Transformers-compatible export is planned
              and tracked on GitHub.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-2xl bg-neutral-900 p-5 text-sm leading-relaxed text-neutral-100">
              <code>{usage}</code>
            </pre>
          </Reveal>
        </section>

        {/* Strengths */}
        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Strengths
              </h2>
              <p className="mt-3 text-neutral-500">
                What this model does well.
              </p>
            </Reveal>
            <div className="mt-6 space-y-4">
              {strengths.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.06}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                    <h3 className="font-semibold text-neutral-900">{s.t}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Limitations
            </h2>
            <p className="mt-3 text-neutral-500">
              What this model does not do well. We document these openly.
            </p>
          </Reveal>
          <div className="mt-6 space-y-4">
            {limitations.map((l, i) => (
              <Reveal key={l.t} delay={i * 0.06}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                  <h3 className="font-semibold text-neutral-900">{l.t}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{l.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Source & weights */}
        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Source &amp; weights
              </h2>
              <p className="mt-3 text-neutral-600">
                All code, training configs, and evaluation scripts are public.
                Model weights and the full model card will be released under
                Apache 2.0.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://github.com/MenteE-s/mentee-embeddings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
                >
                  Source on GitHub
                </a>
                <a
                  href="https://huggingface.co/MenteEAI/mentee-embed-v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                >
                  Hugging Face
                </a>
                <a
                  href="/research"
                  className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                >
                  Full technical report →
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technical specs */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Technical specifications
            </h2>
            <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
              {specs.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.04}>
                  <div className="grid gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                    <dt className="text-sm font-medium text-neutral-900">{s.k}</dt>
                    <dd className="text-sm text-neutral-600">{s.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Citations */}
        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Citations &amp; prior work
              </h2>
              <p className="mt-3 text-neutral-600">
                mentee-embed builds directly on the following open datasets and
                published methods. We credit them explicitly.
              </p>
              <ul className="mt-6 space-y-4">
                {citations.map((c, i) => (
                  <Reveal key={c.t} delay={i * 0.05}>
                    <li>
                      <h3 className="font-semibold text-neutral-900">{c.t}</h3>
                      <p className="mt-1 text-sm text-neutral-600">{c.d}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
