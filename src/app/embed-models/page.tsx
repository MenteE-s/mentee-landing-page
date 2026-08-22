import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Embed Models — MenteE AI",
  description:
    "mentee-embed: how we built it, how to use it, where the source lives, and the research it builds on.",
};

const specs = [
  { k: "Architecture", v: "Transformer encoder — 12 layers, hidden 384, 12 heads, FFN 1536" },
  { k: "Output", v: "384-dimensional L2-normalized embeddings, mean pooling" },
  { k: "Context", v: "Up to 512 tokens" },
  { k: "Parameters", v: "~41 million" },
  { k: "Tokenizer", v: "Custom ByteLevel BPE, 50K vocabulary, trained on our own corpus" },
  { k: "Training objective", v: "Stage A: masked LM → Stage B: symmetric InfoNCE" },
  { k: "Data", v: "~810K triplets ≈ 31.4M tokens" },
  { k: "Hardware", v: "Single consumer GPU, bf16" },
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

model = SentenceTransformer("MenteE/mentee-embed-41m-v15")

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
        <section className="mx-auto max-w-3xl px-6 pb-12 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Embed Models
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              mentee-embed
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Compact, multilingual text embedding models trained from scratch
              for Arabic, English, and Urdu retrieval. Below: how we built it,
              how to use it, where the source lives, and the research it stands
              on.
            </p>
          </Reveal>
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
                    masked tokens (15% masking, 80/10/10 scheme). Validation loss
                    fell from 10.5 to 3.85 — confirming it absorbed the Arabic,
                    English, and Urdu scripts and vocabularies.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    Stage B — Contrastive fine-tuning
                  </h3>
                  <p className="mt-2">
                    The language-aware encoder is fine-tuned with symmetric
                    InfoNCE loss so a query embeds near its relevant passage and
                    far from a hard negative. A cheap MLM bootstrap is what
                    prevents representation collapse — contrastive training alone,
                    from random weights, collapses to chance.
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
              Load the model with Sentence-Transformers and encode text. Outputs
              are 384-dimensional, L2-normalized vectors — cosine similarity
              measures meaning closeness.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-2xl bg-neutral-900 p-5 text-sm leading-relaxed text-neutral-100">
              <code>{usage}</code>
            </pre>
          </Reveal>
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
                  href="https://huggingface.co/MenteE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                >
                  Hugging Face
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
