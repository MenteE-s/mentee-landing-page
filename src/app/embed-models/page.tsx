import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PublicationCard } from "@/components/PublicationCard";
import { CodeTabs } from "@/components/CodeTabs";

/* ── chart colours ───────────────────────────────────────── */
const FONT = `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
const GRID = "#f5f5f5";
const BASE = "#e5e7eb";
const TEXT = "#737373";
const DARK = "#171717";

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
  { n: "2.6M", l: "Training triplets", sub: "v4 — with mMARCO Arabic" },
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
    note: "+ MS-MARCO + hard negatives",
    recommended: false,
  },
  {
    v: "v4",
    params: "41M",
    batch: "512",
    data: "2.6M triplets",
    protA: "0.916",
    protC: "0.706",
    hf: "MenteEAI/mentee-embed-v4",
    hfUrl: "https://huggingface.co/MenteEAI/mentee-embed-v4",
    note: "+ mMARCO Arabic + 3-round distillation · 18K sents/sec",
    recommended: true,
  },
];

const codeTabs = [
  {
    label: "v4 — Quick start",
    code: `# Install
pip install torch transformers tokenizers huggingface_hub

from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v4", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v4",    trust_remote_code=True)

texts = [
    "Machine learning is a branch of artificial intelligence",
    "تعلم الآلة هو فرع من الذكاء الاصطناعي",   # AR
    "مشین لرننگ مصنوعی ذہانت کی ایک شاخ ہے",    # UR
]

embeddings = model.encode(texts, tokenizer=tok)
# embeddings: torch.Tensor of shape (3, 384), L2-normalised`,
  },
  {
    label: "v4 — Similarity search",
    code: `import torch
from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v4", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v4",    trust_remote_code=True)

query = model.encode(["What is machine learning?"],         tokenizer=tok)
docs  = model.encode(["ML is a subset of AI",
                       "The weather is sunny"],             tokenizer=tok)

scores = query @ docs.T
print(scores)  # tensor([[0.81, 0.60]])`,
  },
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

/* ── 1. Version Progression ───────────────────────────────── */

function VersionProgression() {
  const data = [
    { v: "v1", a: 0.585, c: 0.2 },
    { v: "v3", a: 0.655, c: 0.645 },
    { v: "v4", a: 0.916, c: 0.706, highlight: true },
  ];
  const W = 760, H = 300, L = 44, R = 24, T = 28, B = 44;
  const plotW = W - L - R, plotH = H - T - B, barW = 22, groupGap = 60;

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Model Evolution — Prot-A &amp; Prot-C MRR@10
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Version progression">
        {[1, 0.75, 0.5, 0.25, 0].map((v) => (
          <g key={v}>
            <line x1={L} y1={T + (1 - v) * plotH} x2={W - R} y2={T + (1 - v) * plotH} stroke={GRID} strokeWidth={1} />
            <text x={L - 6} y={T + (1 - v) * plotH + 3} textAnchor="end" fontSize={9} fill={TEXT} fontFamily={FONT}>{v.toFixed(2)}</text>
          </g>
        ))}
        <line x1={L} y1={T + plotH} x2={W - R} y2={T + plotH} stroke={BASE} strokeWidth={1} />

        {data.map((d, i) => {
          const cx = L + groupGap + i * (barW * 2 + groupGap);
          const hA = (d.a / 1) * plotH, hC = (d.c / 1) * plotH;
          const colA = d.highlight ? "#171717" : "#a3a3a3";
          const colC = d.highlight ? "#636363" : "#d4d4d4";
          return (
            <g key={d.v}>
              <rect x={cx} y={T + plotH - hA} width={barW} height={hA} fill={colA} rx={3} />
              <text x={cx + barW / 2} y={T + plotH - hA - 5} textAnchor="middle" fontSize={9} fill={DARK} fontWeight={600} fontFamily={FONT}>{d.a.toFixed(3)}</text>
              <rect x={cx + barW + 2} y={T + plotH - hC} width={barW} height={hC} fill={colC} rx={3} />
              <text x={cx + barW + 2 + barW / 2} y={T + plotH - hC - 5} textAnchor="middle" fontSize={9} fill={TEXT} fontWeight={500} fontFamily={FONT}>{d.c.toFixed(3)}</text>
              <text x={cx + barW + 1} y={T + plotH + 16} textAnchor="middle" fontSize={11} fontWeight={600} fill={d.highlight ? DARK : TEXT} fontFamily={FONT}>{d.v}</text>
            </g>
          );
        })}

        <g transform={`translate(${W - R - 80}, ${T + 4})`}>
          <rect width={10} height={10} fill="#404040" rx={2} />
          <text x={14} y={9} fontSize={9} fill={TEXT} fontFamily={FONT}>Prot-A</text>
          <rect y={16} width={10} height={10} fill="#a3a3a3" rx={2} />
          <text x={14} y={25} fontSize={9} fill={TEXT} fontFamily={FONT}>Prot-C</text>
        </g>
      </svg>
    </div>
  );
}

/* ── 2. Speed Ranking ─────────────────────────────────────── */

function SpeedRanking() {
  const data = [
    { m: "mentee-v4 ★", v: 18115, ours: true },
    { m: "MiniLM-L6", v: 12445 },
    { m: "e5-small", v: 9749 },
    { m: "MiniLM-L12", v: 9456 },
    { m: "e5-base", v: 5379 },
    { m: "mpnet-base", v: 5158 },
  ];
  const W = 760, H = 310, L = 80, R = 60, T = 16, B = 20;
  const plotW = W - L - R, plotH = H - T - B, maxVal = 21000;
  const rowH = plotH / data.length, barH = 18;

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Throughput — sents/sec (RTX 5090, batch 128)
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Speed comparison">
        <defs>
          <linearGradient id="em-spd" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#171717" />
            <stop offset="100%" stopColor="#404040" />
          </linearGradient>
        </defs>
        {[0, 5000, 10000, 15000, 20000].map((v) => (
          <g key={v}>
            <line x1={L + (v / maxVal) * plotW} y1={T} x2={L + (v / maxVal) * plotW} y2={T + plotH} stroke={GRID} strokeWidth={1} />
            <text x={L + (v / maxVal) * plotW} y={T + plotH + 14} textAnchor="middle" fontSize={8} fill={TEXT} fontFamily={FONT}>{(v / 1000).toFixed(0)}k</text>
          </g>
        ))}
        <line x1={L} y1={T + plotH} x2={L + plotW} y2={T + plotH} stroke={BASE} strokeWidth={1} />
        {data.map((d, i) => {
          const cy = T + i * rowH + rowH / 2;
          const w = (d.v / maxVal) * plotW;
          return (
            <g key={d.m}>
              <text x={L - 6} y={cy + 3.5} textAnchor="end" fontSize={9} fontWeight={d.ours ? 600 : 400} fill={d.ours ? DARK : TEXT} fontFamily={FONT}>{d.m}</text>
              <rect x={L} y={cy - barH / 2} width={w} height={barH} fill={d.ours ? "url(#em-spd)" : "#d4d4d4"} rx={4} />
              <text x={L + w + 6} y={cy + 3.5} fontSize={9} fontWeight={600} fill={d.ours ? DARK : TEXT} fontFamily={FONT}>{d.v.toLocaleString()}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── 3. MIRACL Multilingual ────────────────────────────────── */

function MiraclChart() {
  const rows = [
    { m: "mentee-v4 ★", en: 0.916, ar: 0.874, ur: 0.572, ours: true },
    { m: "mpnet-base",  en: 0.982, ar: 0.898, ur: 0.824 },
    { m: "MiniLM-L12",  en: 0.979, ar: 0.868, ur: 0.785 },
    { m: "e5-base",     en: 0.990, ar: 0.958, ur: 0.970 },
    { m: "MiniLM-L6",   en: 0.990, ar: 0.027, ur: 0.031 },
  ];
  const LC = { en: "#2563eb", ar: "#16a34a", ur: "#d97706" };
  const W = 760, H = 320, L = 80, R = 24, T = 12, B = 20;
  const plotW = W - L - R, plotH = H - T - B, maxVal = 1;
  const rowH = plotH / rows.length, barH = 7;

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        MIRACL — MRR@10 by Language
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="MIRACL language chart">
        {[1, 0.75, 0.5, 0.25, 0].map((v) => (
          <g key={v}>
            <line x1={L} y1={T + (1 - v) * plotH} x2={W - R} y2={T + (1 - v) * plotH} stroke={GRID} strokeWidth={1} />
            <text x={L - 6} y={T + (1 - v) * plotH + 3} textAnchor="end" fontSize={8} fill={TEXT} fontFamily={FONT}>{v.toFixed(2)}</text>
          </g>
        ))}
        <line x1={L} y1={T} x2={L} y2={T + plotH} stroke={BASE} strokeWidth={1} />
        {rows.map((row, ri) => {
          const cy = T + ri * rowH + rowH / 2;
          const langs: [number, string][] = [[row.en, LC.en], [row.ar, LC.ar], [row.ur, LC.ur]];
          return (
            <g key={row.m}>
              <text x={L - 6} y={cy + 3.5} textAnchor="end" fontSize={9} fontWeight={row.ours ? 600 : 400} fill={row.ours ? DARK : TEXT} fontFamily={FONT}>{row.m}</text>
              {langs.map(([val, col], li) => (
                <g key={li}>
                  <rect x={L} y={cy - (barH * 3 + 4) / 2 + li * (barH + 2)} width={(val / maxVal) * plotW} height={barH} fill={col} rx={2} />
                  {val >= 0.1 && (
                    <text x={L + (val / maxVal) * plotW + 4} y={cy - (barH * 3 + 4) / 2 + li * (barH + 2) + barH - 1.5} fontSize={7.5} fill={col} fontWeight={500} fontFamily={FONT}>{val.toFixed(3)}</text>
                  )}
                </g>
              ))}
            </g>
          );
        })}
        <g transform={`translate(${L + 4}, ${T + 4})`}>
          {[["English", LC.en], ["Arabic", LC.ar], ["Urdu", LC.ur]].map(([l, c], i) => (
            <g key={l as string} transform={`translate(${i * 60}, 0)`}>
              <rect width={8} height={8} fill={c} rx={2} />
              <text x={12} y={8} fontSize={8} fill={TEXT} fontFamily={FONT}>{l}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

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
              for Arabic, English, and Urdu — no pretrained backbone.{" "}
              <strong className="text-neutral-900">v4</strong> is the latest
              version: 2.6M triplets, 3-round distillation, 18K sents/sec.
              Three public versions:{" "}
              <strong className="text-neutral-900">v1</strong> (baseline),{" "}
              <strong className="text-neutral-900">v3</strong> (MS-MARCO + hard
              negatives), and{" "}
              <strong className="text-neutral-900">v4</strong> (mMARCO Arabic +
              full pipeline). Full benchmarks on the{" "}
              <a href="/research" className="underline underline-offset-4 hover:text-neutral-900">
                research page
              </a>
              .
            </p>

            {/* Primary CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://huggingface.co/MenteEAI/mentee-embed-v4"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Use v4 on Hugging Face →
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
                v4 adds mMARCO Arabic retrieval data (500K triplets) and a third
                distillation round with hard negatives — producing a{" "}
                <strong className="text-neutral-900">+146% bench MRR improvement</strong>{" "}
                over v3 while remaining the same 41M architecture.
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

            {/* Visual charts */}
            <Reveal delay={0.12}>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <VersionProgression />
                <SpeedRanking />
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6">
                <MiraclChart />
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
              v4 and v3 load via standard{" "}
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
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Weights v4</p>
                  <a
                    href="https://huggingface.co/MenteEAI/mentee-embed-v4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                  >
                    huggingface.co/MenteEAI/mentee-embed-v4
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
              <PublicationCard version="v4" />
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
