import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PublicationCard } from "@/components/PublicationCard";
import { CodeTabs } from "@/components/CodeTabs";

export const metadata: Metadata = {
  title: "Embed Models — MenteE AI",
  description:
    "mentee-embed: multilingual text embeddings trained from scratch for Arabic, English, and Urdu. v1 and v3 model cards, usage, and source.",
};

/* ── data ────────────────────────────────────────────────── */

const badges = [
  { label: "Sentence Embeddings", color: "bg-purple-50 text-purple-700 border-purple-100" },
  { label: "English", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Arabic", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Urdu", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Apache 2.0", color: "bg-green-50 text-green-700 border-green-100" },
  { label: "41M params", color: "bg-neutral-100 text-neutral-700 border-neutral-200" },
];

const stats = [
  { n: "41M", l: "Parameters", sub: "Same across all versions" },
  { n: "384", l: "Embedding dim", sub: "Cosine similarity ready" },
  { n: "3", l: "Languages", sub: "EN · AR · UR" },
  { n: "2.1M", l: "Training triplets", sub: "v3 — with hard negatives" },
];

const versions = [
  {
    v: "v1",
    params: "41M",
    batch: "192",
    data: "~810K triplets",
    protA: "0.585",
    protC: "~0.20",
    hf: "MenteEAI/mentee-embed-v1",
    hfUrl: "https://huggingface.co/MenteEAI/mentee-embed-v1",
    note: "Baseline — NLI + XNLI + OPUS",
    recommended: false,
  },
  {
    v: "v3",
    params: "41M",
    batch: "512",
    data: "2.1M triplets",
    protA: "0.655",
    protC: "0.645",
    hf: "MenteEAI/mentee-embed-v3",
    hfUrl: "https://huggingface.co/MenteEAI/mentee-embed-v3",
    note: "+ MS-MARCO + hard negatives · transformers-compatible (trust_remote_code=True)",
    recommended: true,
  },
];

const codeTabs = [
  {
    label: "v3 — Quick start",
    code: `# Install
pip install torch transformers tokenizers huggingface_hub

from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v3", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v3",    trust_remote_code=True)

texts = [
    "Machine learning is a branch of artificial intelligence",
    "تعلم الآلة هو فرع من الذكاء الاصطناعي",   # AR
    "مشین لرننگ مصنوعی ذہانت کی ایک شاخ ہے",    # UR
]

embeddings = model.encode(texts, tokenizer=tok)
# embeddings: torch.Tensor of shape (3, 384), L2-normalised`,
  },
  {
    label: "v3 — Similarity search",
    code: `import torch
from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v3", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v3",    trust_remote_code=True)

query = model.encode(["What is machine learning?"],         tokenizer=tok)
docs  = model.encode(["ML is a subset of AI",
                       "The weather is sunny"],             tokenizer=tok)

scores = query @ docs.T
print(scores)  # tensor([[0.81, 0.60]])`,
  },
  {
    label: "v1 — Raw PyTorch",
    code: `import torch
from huggingface_hub import hf_hub_download
from tokenizers import Tokenizer

# Download weights
model_pt = hf_hub_download("MenteEAI/mentee-embed-v1", "model.pt")
tok_path = hf_hub_download("MenteEAI/mentee-embed-v1", "tokenizer.json")

# Requires cloning https://github.com/MenteE-s/mentee-embeddings
import sys
sys.path.insert(0, "path/to/mentee-embeddings")
from src.model import build_embedder

payload = torch.load(model_pt, map_location="cpu", weights_only=False)
model   = build_embedder(payload["encoder_config"], payload["vocab_size"])
model.load_state_dict(payload["state_dict"])
model.eval()
tok = Tokenizer.from_file(tok_path)

texts = [
    "How do I file a tax return?",
    "Steps to submit an annual tax filing",
]`,
  },
];

/* ── page ────────────────────────────────────────────────── */

export default function EmbedModelsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero / Model card header ─────────────────────── */}
        <section className="mx-auto max-w-3xl px-6 pb-10 pt-20 md:pt-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              MenteE AI · Embed Models
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              mentee-embed
            </h1>

            {/* Badge row */}
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${b.color}`}
                >
                  {b.label}
                </span>
              ))}
            </div>

            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              Multilingual text embedding models trained entirely from scratch
              for Arabic, English, and Urdu — no pretrained backbone. Two
              public versions:{" "}
              <strong className="text-neutral-900">v1</strong> (baseline) and{" "}
              <strong className="text-neutral-900">v3</strong> (MS-MARCO + hard
              negatives). Full benchmarks and training details on the{" "}
              <a href="/research" className="underline underline-offset-4 hover:text-neutral-900">
                research page
              </a>
              .
            </p>

            {/* Primary CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://huggingface.co/MenteEAI/mentee-embed-v3"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Use v3 on Hugging Face →
              </a>
              <a
                href="https://github.com/MenteE-s/mentee-embeddings"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
              >
                Source on GitHub
              </a>
              <a
                href="/research"
                className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
              >
                Full technical report
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── Anchor nav ───────────────────────────────────── */}
        <div className="sticky top-[57px] z-40 border-b border-neutral-100 bg-white/90 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-6 py-2">
            {[
              { href: "#overview", label: "Overview" },
              { href: "#versions", label: "Versions" },
              { href: "#quick-start", label: "Quick Start" },
              { href: "#cite", label: "Cite" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex-shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Overview ─────────────────────────────────────── */}
        <section id="overview" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-14">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Overview
            </h2>
            <p className="mt-3 text-neutral-600">
              Most multilingual embedding models rely on a pretrained backbone
              like mBERT or XLM-R. mentee-embed starts from random
              initialization — a custom 50K BPE tokenizer, MLM pretraining on
              1.1M trilingual sentences, then relational knowledge distillation
              from a teacher model.
            </p>
          </Reveal>

          {/* Stats grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.06}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                  <div className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                    {s.n}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                    {s.l}
                  </div>
                  <div className="mt-1 text-xs text-neutral-400">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Versions ─────────────────────────────────────── */}
        <section id="versions" className="scroll-mt-24 border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-14">
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                Versions
              </h2>
              <p className="mt-2 text-neutral-600">
                v3 keeps the same 41M architecture but adds MS-MARCO retrieval
                data, hard negatives, and batch size 512 — producing a{" "}
                <strong className="text-neutral-900">3× Protocol C improvement</strong>{" "}
                while model size stays the same.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-100 text-xs font-medium uppercase tracking-wide text-neutral-500">
                      <th className="px-5 py-3 text-left">Version</th>
                      <th className="px-5 py-3 text-left">Params</th>
                      <th className="px-5 py-3 text-left">Batch</th>
                      <th className="px-5 py-3 text-left">Data</th>
                      <th className="px-5 py-3 text-right">Prot-A</th>
                      <th className="px-5 py-3 text-right">Prot-C</th>
                      <th className="px-5 py-3 text-left">Weights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {versions.map((row) => (
                      <tr
                        key={row.v}
                        className={`border-b border-neutral-50 ${row.recommended ? "bg-neutral-50" : ""}`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                row.recommended
                                  ? "bg-neutral-900 text-white"
                                  : "bg-neutral-100 text-neutral-700"
                              }`}
                            >
                              {row.v}
                            </span>
                            {row.recommended && (
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-neutral-400">{row.note}</p>
                        </td>
                        <td className="px-5 py-4 text-neutral-700">{row.params}</td>
                        <td className="px-5 py-4 text-neutral-700">{row.batch}</td>
                        <td className="px-5 py-4 text-neutral-600">{row.data}</td>
                        <td className={`px-5 py-4 text-right tabular-nums font-medium ${row.recommended ? "text-neutral-900" : "text-neutral-700"}`}>
                          {row.protA}
                        </td>
                        <td className={`px-5 py-4 text-right tabular-nums font-medium ${row.recommended ? "text-neutral-900" : "text-neutral-700"}`}>
                          {row.protC}
                        </td>
                        <td className="px-5 py-4">
                          <a
                            href={row.hfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-neutral-500 underline underline-offset-4 hover:text-neutral-900"
                          >
                            {row.hf}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Quick Start ──────────────────────────────────── */}
        <section id="quick-start" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-14">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Quick Start
            </h2>
            <p className="mt-2 text-neutral-600">
              v3 loads via standard{" "}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">transformers</code>
              {" "}— no custom loader or extra library needed. v1 requires cloning the{" "}
              <a
                href="https://github.com/MenteE-s/mentee-embeddings"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-neutral-900"
              >
                mentee-embeddings
              </a>{" "}
              repo for the{" "}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">build_embedder</code>
              {" "}helper.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-7">
              <CodeTabs tabs={codeTabs} />
            </div>
          </Reveal>

          {/* trust_remote_code note */}
          <Reveal delay={0.10}>
            <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
              <span className="mt-0.5 flex-shrink-0 text-amber-500">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" fill="currentColor" opacity=".3"/>
                  <path d="M7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Zm.75 6.5a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z" fill="currentColor"/>
                </svg>
              </span>
              <p className="text-sm text-neutral-700">
                <strong className="text-neutral-900">Requires{" "}
                  <code className="rounded bg-amber-100 px-1 py-0.5 text-xs font-semibold">trust_remote_code=True</code>
                </strong>
                {" "}— this is standard for custom-architecture models on HuggingFace.
                The code runs <strong className="text-neutral-900">locally on your machine</strong>;
                nothing is sent to any server.
              </p>
            </div>
          </Reveal>

          {/* Cross-lingual note */}
          <Reveal delay={0.14}>
            <div className="mt-3 rounded-xl border-l-4 border-blue-300 bg-blue-50 px-4 py-3.5 text-sm text-neutral-700">
              <strong className="text-neutral-900">Cross-lingual retrieval</strong>{" "}
              works out of the box. Query in English, retrieve in Arabic or Urdu —
              no language-pair-specific fine-tuning required.
            </div>
          </Reveal>
        </section>

        {/* ── Links ────────────────────────────────────────── */}
        <section className="border-y border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-10">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Source</p>
                  <a
                    href="https://github.com/MenteE-s/mentee-embeddings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                  >
                    github.com/MenteE-s/mentee-embeddings
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Weights v1</p>
                  <a
                    href="https://huggingface.co/MenteEAI/mentee-embed-v1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                  >
                    huggingface.co/MenteEAI/mentee-embed-v1
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Weights v3</p>
                  <a
                    href="https://huggingface.co/MenteEAI/mentee-embed-v3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                  >
                    huggingface.co/MenteEAI/mentee-embed-v3
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">License</p>
                  <p className="mt-0.5 text-sm font-medium text-neutral-700">Apache 2.0</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Citation ─────────────────────────────────────── */}
        <section id="cite" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-14">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Cite this model
            </h2>
            <p className="mt-2 text-neutral-500">
              Published preprint — please cite if you use mentee-embed in your
              research.
            </p>
            <div className="mt-6">
              <PublicationCard version="v3" />
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
