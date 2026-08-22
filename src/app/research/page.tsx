import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Research — MenteE AI",
  description:
    "mentee-embed: compact, multilingual text embedding models trained from scratch for Arabic, English, and Urdu retrieval.",
};

const specs = [
  { k: "Architecture", v: "Transformer encoder — 12 layers, hidden 384, 12 heads, FFN 1536" },
  { k: "Output", v: "384-dimensional L2-normalized embeddings, mean pooling" },
  { k: "Context", v: "Up to 512 tokens" },
  { k: "Parameters", v: "~41 million" },
  { k: "Tokenizer", v: "Custom ByteLevel BPE, 50K vocabulary, trained on our own corpus — handles all three scripts natively" },
  { k: "Training objective", v: "Stage A: masked LM (15% masking, 80/10/10) → Stage B: symmetric InfoNCE" },
  { k: "Data", v: "~810K triplets ≈ 31.4M tokens: 557K English NLI (all-NLI), 128K Arabic + 125K Urdu derived from XNLI" },
  { k: "Held-out evaluation", v: "Clean MIRACL-derived retrieval triplets in all three languages, excluded from training" },
  { k: "Hardware", v: "Single consumer GPU, bf16" },
];

const findings = [
  "Full reproducible pipeline — data to evaluation to packaging, fully open-sourced",
  "Stage-A language acquisition demonstrated (MLM validation loss 10.5 → 3.85)",
  "Diagnosed and documented representation collapse in from-scratch contrastive training",
  "Identified the catastrophic-forgetting threshold in two-stage transfer (fine-tune LR must drop ~10× below pretraining LR)",
  "Sustained training throughput up to 500K tokens/sec on consumer hardware",
  "Automatic overfitting detection with early stopping and crash-safe checkpoint resume",
];

const roadmap = [
  { t: "v1.5 completion", d: "Stage-B contrastive run on top of the successful MLM foundation, with the corrected fine-tuning recipe." },
  { t: "Public leaderboard", d: "Benchmarked head-to-head against paraphrase-multilingual-MiniLM, all-MiniLM-L6-v2, and multilingual-e5-small on identical Arabic/English/Urdu retrieval sets (MRR@10, Recall@5)." },
  { t: "Open release", d: "Model weights, custom tokenizer, and full model card published under Apache 2.0." },
  { t: "Full training report", d: "Architecture, exact data composition, loss curves, and failures — all published." },
  { t: "Standardized evaluation", d: "MTEB-style benchmarks across multilingual retrieval and bitext-mining tasks." },
  { t: "Urdu-focused expansion", d: "Adding parallel-corpus alignment objectives, since Urdu retrieval ground truth is the scarcest resource in the field." },
];

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pb-12 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              MenteE AI Research
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Current research: embeddings
            </h1>
            <p className="mt-3 text-sm font-medium text-neutral-400">
              Active line of research — mentee-embed
            </p>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              A family of compact, multilingual text embedding models trained
              completely from scratch — focused on Arabic, English, and Urdu
              retrieval. Built to study how far modern training recipes can be
              compressed when nothing is inherited from pretrained giants. This is
              our current active research; future lines will be added here as they
              begin.
            </p>
          </Reveal>
        </section>

        {/* The problem */}
        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                The problem
              </h2>
              <div className="mt-4 space-y-4 text-neutral-600">
                <p>
                  Modern search and Retrieval-Augmented Generation (RAG) systems
                  depend on embedding models — networks that turn sentences into
                  vectors where similar meaning becomes nearby vectors. Nearly
                  all strong embedding models share two problems:
                </p>
                <p>
                  <strong className="text-neutral-900">
                    They ignore low-resource languages.
                  </strong>{" "}
                  Urdu has roughly 230 million speakers, yet almost no
                  competitive open embedding model treats it as a first-class
                  language. Arabic coverage exists but remains thin in the
                  small-model tier.
                </p>
                <p>
                  <strong className="text-neutral-900">
                    They are opaque and expensive.
                  </strong>{" "}
                  Frontier embedding models are trained by large labs on
                  undocumented data. Nobody can reproduce them, audit them, or
                  train their own.
                </p>
                <p>
                  Our research asks a question the industry rarely takes
                  seriously: what is the best embedding model achievable when
                  every constraint is extreme — tiny parameter count, compact
                  dataset, and three languages trained jointly from absolute
                  zero?
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Approach */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Our approach: two-stage training, from scratch
            </h2>
            <div className="mt-4 space-y-6 text-neutral-600">
              <div>
                <h3 className="font-semibold text-neutral-900">
                  Stage A — Masked Language Modeling
                </h3>
                <p className="mt-2">
                  Before any retrieval training, the encoder learns Arabic,
                  English, and Urdu as languages through masked language
                  modeling (the BERT objective): we hide 15% of words and force
                  the network to reconstruct them. In our Stage-A run,
                  validation loss fell from 10.5 to 3.85 — proof the encoder
                  absorbed all three scripts and vocabularies.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">
                  Stage B — Contrastive fine-tuning
                </h3>
                <p className="mt-2">
                  The language-aware encoder is then fine-tuned so a query
                  embeds close to its relevant passage and far from a hard
                  negative, using symmetric InfoNCE loss with in-batch
                  negatives plus an explicit hard-negative column (temperature
                  0.07). The classic SBERT-style recipe — applied to weights we
                  built ourselves.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">
                  Why this matters scientifically
                </h3>
                <p className="mt-2">
                  Our early experiments produced an instructive failure:
                  contrastive training alone, from random weights, collapsed to
                  statistical chance (accuracy ≈ 1/97) regardless of learning
                  rate. This confirmed that representation collapse — not
                  hyperparameters — is the fundamental barrier for from-scratch
                  embedding training at small data scale, and that a cheap MLM
                  bootstrap breaks it. We publish this negative-and-recovery
                  result openly, because it is exactly the kind of finding that
                  gets left out of polished papers.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Technical specs */}
        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Technical specifications
              </h2>
              <p className="mt-3 text-neutral-500">
                Current model: mentee-embed-41m-v15
              </p>
              <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
                {specs.map((s, i) => (
                  <Reveal key={s.k} delay={i * 0.04}>
                    <div className="grid gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                      <dt className="text-sm font-medium text-neutral-900">
                        {s.k}
                      </dt>
                      <dd className="text-sm text-neutral-600">{s.v}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Findings */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              What we have achieved
            </h2>
            <ul className="mt-6 space-y-3">
              {findings.map((f, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex items-start gap-3 text-neutral-600">
                    <span className="mt-1 text-neutral-900">✓</span>
                    <span className="text-sm">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Roadmap */}
        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Roadmap
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              {roadmap.map((r, i) => (
                <Reveal key={r.t} delay={i * 0.06}>
                  <div className="border-l-2 border-neutral-200 pl-4">
                    <h3 className="font-semibold text-neutral-900">{r.t}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{r.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why follow */}
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Why follow this research
            </h2>
            <p className="mt-4 text-neutral-600">
              Because it is real, small, honest, and open: measured numbers
              instead of marketing claims, failures documented alongside wins,
              and every artifact on GitHub and Hugging Face. If you have ever
              wanted to see the entire life-cycle of a language model — data to
              leaderboard — with nothing hidden, this is it.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://github.com/MenteE-s/mentee-embeddings"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                View on GitHub
              </a>
              <a
                href="/contact"
                className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
