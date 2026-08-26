"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PublicationCard } from "@/components/PublicationCard";
import { ResearchTOC } from "@/components/ResearchTOC";
import { ReadingProgress } from "@/components/ReadingProgress";
import { motion, AnimatePresence } from "framer-motion";

/* ── v1 data ─────────────────────────────────────────────── */

const v1Stats = [
  { n: "41M", l: "Parameters" },
  { n: "384", l: "Embedding dim" },
  { n: "3", l: "Languages" },
  { n: "0.820", l: "Val acc@1" },
];

const inbatchRows = [
  { name: "mentee-embed-v1", short: "mentee-v1 ★", val: "0.820", en: "0.345", ar: "0.222", ur: "0.183", xling: "0.757", mrr: "0.585", ours: true },
  { name: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", val: "0.821", en: "0.864", ar: "0.722", ur: "0.686", xling: "0.831", mrr: "0.867" },
  { name: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", val: "0.795", en: "0.854", ar: "0.696", ur: "0.621", xling: "0.782", mrr: "0.840" },
  { name: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", val: "0.484", en: "0.856", ar: "0.025", ur: "0.028", xling: "0.065", mrr: "0.449" },
];

const corpusRows = [
  { name: "mentee-embed-v1", short: "mentee-v1 ★", en: "0.190", ar: "0.193", ur: "0.189", r100: "0.47", ours: true },
  { name: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", en: "0.938", ar: "0.678", ur: "0.580", r100: "0.92" },
  { name: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", en: "0.921", ar: "0.685", ur: "0.518", r100: "0.91" },
  { name: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", en: "0.920", ar: "0.100", ur: "0.100", r100: "0.34" },
];

const v1Succeeded = [
  { t: "Relational distillation", d: "Converted a hopeless from-scratch contrastive problem into a dense, learnable regression target." },
  { t: "From-scratch tokenizer + MLM", d: "Gave a clean, language-aware initialization free of any pretrained backbone." },
  { t: "In-batch retrieval", d: "Genuinely strong — usable for query/document matching, deduplication, and cross-lingual English↔Urdu search." },
];

const v1Limitations = [
  { t: "Open-domain corpus retrieval", d: "Protocol B lags web-scale models. Best used as a re-ranker, not a standalone billion-document search engine." },
  { t: "Training scope", d: "NLI + parallel translation data only. Domain-specific retrieval will need fine-tuning." },
  { t: "Sequence length", d: "Capped at 128 tokens; longer documents should be chunked." },
  { t: "Format", d: "Loads via src/model.py with model.pt. v3 adds a Sentence-Transformers-compatible export — use SentenceTransformer(\"MenteEAI/mentee-embed-v3\") for the simplest path." },
];

/* ── v3 data ─────────────────────────────────────────────── */

const v3Stats = [
  { n: "41M", l: "Parameters" },
  { n: "384", l: "Embedding dim" },
  { n: "2.1M", l: "Training triplets" },
  { n: "0.655", l: "Prot-A avg MRR@10" },
];

const v3VersionTable = [
  { v: "v1", params: "41M", batch: "192", protA: "0.585", protC: "~0.20" },
  { v: "v2", params: "125M", batch: "128", protA: "0.429 ↓", protC: "0.215" },
  { v: "v3", params: "41M", batch: "512", protA: "0.655", protC: "0.645", highlight: true },
];

const v3ProtocolA = [
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", val: "0.895", en: "0.931", ar: "0.839", ur: "0.806", xling: "0.880", msmarco: "0.830", avg: "0.864" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", val: "0.883", en: "0.924", ar: "0.819", ur: "0.753", xling: "0.841", msmarco: "0.796", avg: "0.836" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", val: "0.870", en: "0.766", ar: "0.475", ur: "0.443", xling: "0.848", msmarco: "0.742", avg: "0.691", ours: true },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", val: "0.627", en: "0.927", ar: "0.144", ur: "0.140", xling: "0.186", msmarco: "0.848", avg: "0.479" },
  { model: "mentee-embed-v1", short: "mentee-v1", init: "Rand", val: "—", en: "0.501", ar: "0.373", ur: "0.329", xling: "0.829", msmarco: "—", avg: "0.585" },
  { model: "mentee-embed-v2", short: "mentee-v2", init: "Rand", val: "—", en: "0.412", ar: "0.175", ur: "0.200", xling: "0.638", msmarco: "—", avg: "0.429" },
];

const v3ProtocolB = [
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", en_mrr: "0.853", ar_mrr: "0.622", ur_mrr: "0.534", avg: "0.670" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", en_mrr: "0.840", ar_mrr: "0.591", ur_mrr: "0.469", avg: "0.633" },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", en_mrr: "0.867", ar_mrr: "0.100", ur_mrr: "0.106", avg: "0.358" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", en_mrr: "0.418", ar_mrr: "0.182", ur_mrr: "0.180", avg: "0.260", ours: true },
  { model: "mentee-embed-v1", short: "mentee-v1", init: "Rand", en_mrr: "0.190", ar_mrr: "0.193", ur_mrr: "0.189", avg: "0.190" },
  { model: "mentee-embed-v2", short: "mentee-v2", init: "Rand", en_mrr: "0.170", ar_mrr: "0.104", ur_mrr: "0.104", avg: "0.126" },
];

const v3ProtocolC = [
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", mrr: "0.951", r5: "0.993", r10: "0.993", r100: "1.000" },
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", mrr: "0.882", r5: "0.970", r10: "0.973", r100: "0.993" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", mrr: "0.839", r5: "0.910", r10: "0.953", r100: "0.997" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", mrr: "0.645", r5: "0.760", r10: "0.810", r100: "0.957", ours: true },
  { model: "mentee-embed-v2", short: "mentee-v2", init: "Rand", mrr: "0.215", r5: "0.217", r10: "—", r100: "0.593" },
];

const v3Sts = [
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", rho: "0.8682" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", rho: "0.8442" },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", rho: "0.8203" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", rho: "0.6834", ours: true },
];

const v3DataSources = [
  { src: "all-NLI (SNLI + MultiNLI)", lang: "English", type: "Triplet", n: "557,850" },
  { src: "XNLI", lang: "Arabic", type: "Triplet", n: "127,856" },
  { src: "XNLI", lang: "Urdu", type: "Triplet", n: "124,869" },
  { src: "OPUS-100", lang: "EN–UR", type: "Parallel", n: "300,000" },
  { src: "OPUS-100", lang: "AR–EN", type: "Parallel", n: "300,000" },
  { src: "MS-MARCO BM25", lang: "English", type: "Retrieval", n: "500,000" },
  { src: "MS-MARCO hard negs", lang: "English", type: "Retrieval", n: "200,000" },
  { src: "MIRACL", lang: "EN, AR, UR", type: "Retrieval", n: "~9,000" },
];

const v3Strengths = [
  { t: "Cross-lingual AR/UR retrieval", d: "Functional at 41M from random init — genuine multilingual transfer." },
  { t: "EN↔UR transfer", d: "MRR@10 = 0.848, competitive with pretrained 117M models." },
  { t: "In-domain MS-MARCO", d: "0.645 MRR@10, R@100 = 0.957 — strong when training data matches the target domain." },
  { t: "STS-B generalization", d: "0.683 Spearman ρ despite no similarity supervision in training." },
  { t: "Fully reproducible", d: "One command reproduces the full pipeline on a single GPU with 24GB+ VRAM in under 4 hours." },
];

const v3Limitations = [
  { t: "Wikipedia corpus (Protocol B)", d: "0.260 avg MRR@10 vs 0.633 for pretrained models. Zero Wikipedia passages in training data — an out-of-domain boundary." },
  { t: "STS-B gap", d: "0.683 vs 0.820–0.868. Training optimized for retrieval, not graded similarity — a deliberate trade-off." },
  { t: "Arabic/Urdu Protocol B", d: "0.182/0.180 MRR@10. English-heavy retrieval data (700K MS-MARCO vs ~127K AR/UR)." },
  { t: "Single seed", d: "All results from one training run; variance unquantified." },
  { t: "No MTEB full suite", d: "Only targeted retrieval + STS-B evaluated." },
];

const roadmap = [
  { t: "v1.5 completion", d: "Stage-B contrastive run on top of the successful MLM foundation." },
  { t: "Public leaderboard", d: "Head-to-head benchmarks on identical Arabic/English/Urdu retrieval sets." },
  { t: "Open release", d: "Model weights, custom tokenizer, and full model card under Apache 2.0." },
  { t: "Standardized evaluation", d: "MTEB-style benchmarks across multilingual retrieval and bitext-mining tasks." },
  { t: "Urdu-focused expansion", d: "Adding parallel-corpus alignment objectives for the scarcest retrieval ground truth." },
];

/* ── TOC definition ──────────────────────────────────────── */

const tocSections = [
  { id: "overview",        label: "Overview",       group: "" },
  { id: "v1-approach",     label: "The Approach",   group: "mentee-embed-v1" },
  { id: "v1-protocol-a",   label: "Protocol A",     group: "mentee-embed-v1" },
  { id: "v1-protocol-b",   label: "Protocol B",     group: "mentee-embed-v1" },
  { id: "v1-efficiency",   label: "Efficiency",     group: "mentee-embed-v1" },
  { id: "v1-strengths",    label: "Strengths",      group: "mentee-embed-v1" },
  { id: "v1-limitations",  label: "Limitations",    group: "mentee-embed-v1" },
  { id: "v3-approach",     label: "The Approach",   group: "mentee-embed-v3" },
  { id: "v3-benchmarks",   label: "Benchmarks",     group: "mentee-embed-v3" },
  { id: "v3-key-finding",  label: "The Key Finding",group: "mentee-embed-v3" },
  { id: "v3-strengths",    label: "Strengths",      group: "mentee-embed-v3" },
  { id: "v3-limitations",  label: "Limitations",    group: "mentee-embed-v3" },
  { id: "roadmap",         label: "Roadmap",        group: "Shared" },
  { id: "reproduction",    label: "Reproduction",   group: "Shared" },
];

/* ── helpers ─────────────────────────────────────────────── */

function InitBadge({ init }: { init: string }) {
  const isPre = init === "Pre" || init === "Pretrained";
  return (
    <span
      className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
        isPre ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-700"
      }`}
    >
      {isPre ? "Pre" : "Rand"}
    </span>
  );
}

function OursDot() {
  return <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-900 align-middle" />;
}

/** Compact table cell — short name shown, full name in tooltip */
function ModelCell({ short, full, ours }: { short: string; full: string; ours?: boolean }) {
  return (
    <td
      title={full}
      className={`px-2 py-2 text-xs ${ours ? "font-semibold text-neutral-900" : "text-neutral-600"}`}
    >
      {ours && <OursDot />}{short}
    </td>
  );
}

function NumCell({ v, bold }: { v: string; bold?: boolean }) {
  return (
    <td className={`px-2 py-2 text-right tabular-nums text-xs ${bold ? "font-semibold text-neutral-900" : "text-neutral-600"}`}>
      {v}
    </td>
  );
}

function ChapterBanner({ version, label }: { version: string; label: string }) {
  const isV3 = version === "v3";
  return (
    <div
      className={`mb-8 rounded-2xl px-6 py-5 ${
        isV3 ? "bg-neutral-900 text-white" : "border border-neutral-200 bg-neutral-50"
      }`}
    >
      <span
        className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
          isV3 ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
        }`}
      >
        {version}
      </span>
      <h2
        className={`mt-2 text-xl font-bold tracking-tight ${
          isV3 ? "text-white" : "text-neutral-900"
        }`}
      >
        {label}
      </h2>
    </div>
  );
}

/* ── section group lookup ────────────────────────────────── */

const sectionGroup: Record<string, string> = Object.fromEntries(
  tocSections.map((s) => [s.id, s.group])
);

/* ── nav bar component ───────────────────────────────────── */

function SectionNav({
  current,
  sections,
  onSelect,
}: {
  current: string;
  sections: typeof tocSections;
  onSelect: (id: string) => void;
}) {
  const idx = sections.findIndex((s) => s.id === current);
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;

  return (
    <div className="mt-10 flex items-stretch justify-between gap-4 border-t border-neutral-100 pt-6">
      {prev ? (
        <button
          onClick={() => onSelect(prev.id)}
          className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-neutral-200 px-4 py-3 text-left transition-all duration-150 ease-out hover:border-neutral-400 hover:shadow-sm"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 text-sm transition-all duration-150 group-hover:border-neutral-400">
            ←
          </span>
          <span className="min-w-0">
            {sectionGroup[prev.id] && (
              <span className="block text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                {sectionGroup[prev.id]}
              </span>
            )}
            <span className="block truncate text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
              {prev.label}
            </span>
          </span>
        </button>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <button
          onClick={() => onSelect(next.id)}
          className="group flex min-w-0 flex-1 items-center justify-end gap-3 rounded-2xl border border-neutral-200 px-4 py-3 text-right transition-all duration-150 ease-out hover:border-neutral-400 hover:shadow-sm"
        >
          <span className="min-w-0">
            {sectionGroup[next.id] && (
              <span className="block text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                {sectionGroup[next.id]}
              </span>
            )}
            <span className="block truncate text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
              {next.label}
            </span>
          </span>
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 text-sm transition-all duration-150 group-hover:border-neutral-400">
            →
          </span>
        </button>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

/* ── page ────────────────────────────────────────────────── */

export default function ResearchPage() {
  // Default to overview
  const [selectedId, setSelectedId] = useState("overview");

  const currentSection = tocSections.find((s) => s.id === selectedId)!;
  const currentGroup = currentSection.group;

  function navigate(id: string) {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <main className="flex-1">

        {/* Full-page dashboard — two columns fill the viewport */}
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 md:pt-28">
          <div className="flex gap-8">
            <ResearchTOC
              sections={tocSections}
              activeId={selectedId}
              onSelect={navigate}
            />

            <div className="min-w-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >

              {/* Chapter banner — only for versioned sections */}
              {(selectedId.startsWith("v1-") || selectedId.startsWith("v3-")) && (
                <ChapterBanner
                  version={currentGroup === "mentee-embed-v1" ? "v1" : "v3"}
                  label={currentGroup}
                />
              )}

              {/* Overview */}
              {selectedId === "overview" && (
                <section id="overview">
                  <Reveal>
                    <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                      MenteE AI · Technical Report
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                      mentee-embed research
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
                      Trilingual embedding models (Arabic, English, Urdu) trained
                      entirely from scratch. Two versions:{" "}
                      <strong>v1</strong> (baseline, ~810K triplets) and{" "}
                      <strong>v3</strong> (2.1M triplets, MS-MARCO, hard negatives).
                      Full benchmarks, training details, and honest evaluations below.
                    </p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <div className="mt-8">
                      <PublicationCard />
                    </div>
                  </Reveal>
                </section>
              )}

              {selectedId === "v1-approach" && <section id="v1-approach">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    The Approach
                  </h2>
                  <p className="mt-4 text-neutral-600">
                    Training a competitive embedding model from random
                    initialization is hard. We solved this with a{" "}
                    <strong className="text-neutral-900">two-stage recipe</strong>:
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6">
                    <h3 className="text-base font-semibold text-neutral-900">
                      Stage A — Masked Language Modeling (from scratch)
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      1.1M trilingual sentences, 50K BPE vocabulary trained from
                      scratch, 6,000 steps. No pretrained backbone involved.
                    </p>
                    <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100">
                      <Image
                        src="/mlm_loss_curve.svg"
                        alt="MLM loss curve"
                        width={820}
                        height={420}
                        className="w-full"
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-6">
                    <h3 className="text-base font-semibold text-neutral-900">
                      Stage B — Relational Knowledge Distillation
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      The MLM encoder is too weak to learn retrieval from sparse
                      labels, so we{" "}
                      <strong>distill</strong>{" "}
                      <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
                        intfloat/multilingual-e5-base
                      </code>{" "}
                      (768-dim) as teacher. The student learns to reproduce the
                      teacher&apos;s full batch similarity structure.
                    </p>
                    <p className="mt-3 text-center text-sm text-neutral-500">
                      loss = rel_weight · MSE(C<sub>student</sub>, C<sub>teacher</sub>)
                      + ce_weight · InfoNCE(anchor, positive)
                    </p>
                  </div>
                </Reveal>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {v1Stats.map((s, i) => (
                    <Reveal key={s.l} delay={i * 0.06}>
                      <div className="rounded-2xl border border-neutral-100 bg-white p-4">
                        <div className="text-2xl font-extrabold tracking-tight text-neutral-900">
                          {s.n}
                        </div>
                        <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                          {s.l}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>}

              {selectedId === "v1-protocol-a" && <section id="v1-protocol-a">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Protocol A: In-batch retrieval
                  </h2>
                  <p className="mt-3 text-neutral-600">
                    Each query ranked against ~97 candidates in its batch.{" "}
                    <strong className="text-neutral-900">acc@1</strong> = correct
                    doc ranked first;{" "}
                    <strong className="text-neutral-900">MRR@10</strong> = mean
                    reciprocal rank in top-10.
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-6 overflow-hidden rounded-xl border border-neutral-100">
                    <Image
                      src="/inbatch_acc1.svg"
                      alt="In-batch acc@1 by dataset and model"
                      width={840}
                      height={460}
                      className="w-full"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-6 rounded-2xl border border-neutral-100 bg-white">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                          <th className="px-2 py-2 text-left">Model</th>
                          <th className="px-2 py-2 text-right">val</th>
                          <th className="px-2 py-2 text-right">EN</th>
                          <th className="px-2 py-2 text-right">AR</th>
                          <th className="px-2 py-2 text-right">UR</th>
                          <th className="px-2 py-2 text-right">xling</th>
                          <th className="px-2 py-2 text-right">MRR@10</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inbatchRows.map((r) => (
                          <tr key={r.name} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50" : ""}`}>
                            <ModelCell short={r.short} full={r.name} ours={r.ours} />
                            <NumCell v={r.val} />
                            <NumCell v={r.en} />
                            <NumCell v={r.ar} />
                            <NumCell v={r.ur} />
                            <NumCell v={r.xling} />
                            <NumCell v={r.mrr} bold={r.ours} />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="mt-4 rounded-xl border-l-4 border-green-500 bg-green-50 p-4 text-sm text-neutral-700">
                    Our model <strong>dominates MiniLM-L6-v2</strong> across all
                    five slices and wins on the validation and cross-lingual splits.
                  </div>
                </Reveal>
              </section>}

              {selectedId === "v1-protocol-b" && <section id="v1-protocol-b">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Protocol B: Corpus-pool retrieval
                  </h2>
                  <p className="mt-3 text-neutral-600">
                    Full open-domain ranking over 15K docs per language — the hard test.
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-6 overflow-hidden rounded-xl border border-neutral-100">
                    <Image
                      src="/corpus_mrr10.svg"
                      alt="Corpus-pool MRR@10"
                      width={840}
                      height={460}
                      className="w-full"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-6 rounded-2xl border border-neutral-100 bg-white">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                          <th className="px-2 py-2 text-left">Model</th>
                          <th className="px-2 py-2 text-right">EN</th>
                          <th className="px-2 py-2 text-right">AR</th>
                          <th className="px-2 py-2 text-right">UR</th>
                          <th className="px-2 py-2 text-right">R@100</th>
                        </tr>
                      </thead>
                      <tbody>
                        {corpusRows.map((r) => (
                          <tr key={r.name} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50" : ""}`}>
                            <ModelCell short={r.short} full={r.name} ours={r.ours} />
                            <NumCell v={r.en} />
                            <NumCell v={r.ar} />
                            <NumCell v={r.ur} />
                            <NumCell v={r.r100} bold={r.ours} />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="mt-4 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-neutral-700">
                    Still,{" "}
                    <strong>R@100 ≈ 0.47</strong> means the correct document
                    appears in the top-100 roughly half the time — directly usable
                    as a <strong>re-ranker</strong>.
                  </div>
                </Reveal>
              </section>}

              {selectedId === "v1-efficiency" && <section id="v1-efficiency">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Efficiency
                  </h2>
                  <div className="mt-6 overflow-hidden rounded-xl border border-neutral-100">
                    <Image
                      src="/efficiency_scatter.svg"
                      alt="Parameters vs average MRR@10"
                      width={760}
                      height={460}
                      className="w-full"
                    />
                  </div>
                  <p className="mt-4 text-neutral-600">
                    At{" "}
                    <strong className="text-neutral-900">41M parameters</strong>{" "}
                    ~7× smaller than mpnet-base (278M), yet competitive in-batch
                    retrieval — trained on a single free GPU session.
                  </p>
                </Reveal>
              </section>}

              {selectedId === "v1-strengths" && <section id="v1-strengths">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Strengths
                  </h2>
                </Reveal>
                <div className="mt-6 space-y-4">
                  {v1Succeeded.map((s, i) => (
                    <Reveal key={s.t} delay={i * 0.07}>
                      <div className="rounded-2xl border-l-4 border-green-400 bg-green-50/60 p-5">
                        <h3 className="font-semibold text-neutral-900">{s.t}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>}

              {selectedId === "v1-limitations" && <section id="v1-limitations">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Limitations
                  </h2>
                  <p className="mt-2 text-neutral-500">
                    We document what does not work alongside what does.
                  </p>
                </Reveal>
                <div className="mt-6 space-y-4">
                  {v1Limitations.map((l, i) => (
                    <Reveal key={l.t} delay={i * 0.07}>
                      <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/60 p-5">
                        <h3 className="font-semibold text-neutral-900">{l.t}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{l.d}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>}

              {selectedId === "v3-approach" && <section id="v3-approach">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    The Approach
                  </h2>
                  <p className="mt-4 text-neutral-600">
                    Same 41M architecture as v1. The difference: batch size 512
                    (vs 192), 2.1M training triplets (vs ~810K), and a two-round
                    distillation pipeline with hard negative mining.
                  </p>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="mt-6">
                    <PublicationCard version="v3" />
                  </div>
                </Reveal>

                {/* Version progression */}
                <Reveal delay={0.08}>
                  <div className="mt-8 rounded-2xl border border-neutral-200 bg-white">
                    <div className="border-b border-neutral-100 px-4 py-3">
                      <h3 className="text-sm font-semibold text-neutral-900">Version progression</h3>
                      <p className="mt-0.5 text-xs text-neutral-500">Three-version ablation — the core scientific contribution</p>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                          <th className="px-3 py-2 text-left">Ver</th>
                          <th className="px-3 py-2 text-right">Params</th>
                          <th className="px-3 py-2 text-right">Batch</th>
                          <th className="px-3 py-2 text-right">Prot-A</th>
                          <th className="px-3 py-2 text-right">Prot-C</th>
                        </tr>
                      </thead>
                      <tbody>
                        {v3VersionTable.map((r) => (
                          <tr key={r.v} className={`border-b border-neutral-50 ${r.highlight ? "bg-neutral-50" : ""}`}>
                            <td className="px-3 py-2">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${r.highlight ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"}`}>{r.v}</span>
                            </td>
                            <NumCell v={r.params} bold={r.highlight} />
                            <NumCell v={r.batch} bold={r.highlight} />
                            <NumCell v={r.protA} bold={r.highlight} />
                            <NumCell v={r.protC} bold={r.highlight} />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>

                {/* Training pipeline */}
                <Reveal delay={0.12}>
                  <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">A</span>
                      <h3 className="font-semibold text-neutral-900">Stage A — MLM</h3>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600">
                      8,000 steps, batch 32, lr 5×10⁻⁴, bf16. ~45 minutes on
                      RTX 5090. Custom 50K BPE tokenizer trained from scratch.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">B</span>
                      <h3 className="font-semibold text-neutral-900">Stage B — Distillation (2 rounds)</h3>
                    </div>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Round 1</p>
                        <p className="mt-1 text-sm text-neutral-600">4K steps, batch 512, temp 0.05, no hard negatives</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Round 2</p>
                        <p className="mt-1 text-sm text-neutral-600">10K steps, batch 512, temp 0.05, top-5 hard negatives</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-neutral-500">
                      Teacher: intfloat/multilingual-e5-base (768-dim) — frozen,
                      weights never transferred. Hard negatives mined via
                      GPU-accelerated chunk-wise dot products between rounds.
                    </p>
                  </div>
                </Reveal>

                {/* v3 stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {v3Stats.map((s, i) => (
                    <Reveal key={s.l} delay={i * 0.06}>
                      <div className="rounded-2xl border border-neutral-100 bg-white p-4">
                        <div className="text-2xl font-extrabold tracking-tight text-neutral-900">
                          {s.n}
                        </div>
                        <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                          {s.l}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* Training data */}
                <Reveal delay={0.2}>
                  <div className="mt-8 rounded-2xl border border-neutral-100 bg-white">
                    <div className="border-b border-neutral-100 px-4 py-3">
                      <h3 className="text-sm font-semibold text-neutral-900">Training data — 2,107,423 triplets</h3>
                      <p className="mt-0.5 text-xs text-neutral-500">v1 used ~810K · v3 adds MS-MARCO (700K) + OPUS-AR-EN (300K)</p>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                          <th className="px-3 py-2 text-left">Source</th>
                          <th className="px-3 py-2 text-left">Lang</th>
                          <th className="px-3 py-2 text-left">Type</th>
                          <th className="px-3 py-2 text-right">Triplets</th>
                        </tr>
                      </thead>
                      <tbody>
                        {v3DataSources.map((d) => (
                          <tr key={d.src + d.lang} className="border-b border-neutral-50">
                            <td className="px-3 py-1.5 text-xs text-neutral-700">{d.src}</td>
                            <td className="px-3 py-1.5 text-xs text-neutral-500">{d.lang}</td>
                            <td className="px-3 py-1.5 text-xs text-neutral-500">{d.type}</td>
                            <td className="px-3 py-1.5 text-right tabular-nums text-xs font-medium text-neutral-900">{d.n}</td>
                          </tr>
                        ))}
                        <tr className="bg-neutral-50">
                          <td className="px-3 py-2 text-xs font-semibold text-neutral-900" colSpan={3}>Total</td>
                          <td className="px-3 py-2 text-right tabular-nums text-xs font-bold text-neutral-900">2,107,423</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Reveal>
              </section>}

              {selectedId === "v3-benchmarks" && <section id="v3-benchmarks">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Benchmarks
                  </h2>
                  <p className="mt-3 text-neutral-600">
                    All results on a single NVIDIA RTX 5090. Baselines use
                    pretrained encoders — none trained from scratch.
                  </p>
                </Reveal>

                {/* Protocol A */}
                <Reveal delay={0.06}>
                  <div className="mt-8 rounded-2xl border border-neutral-200 bg-white">
                    <div className="border-b border-neutral-100 px-4 py-3">
                      <h3 className="text-sm font-semibold text-neutral-900">Protocol A — In-Batch Retrieval</h3>
                      <p className="mt-0.5 text-xs text-neutral-500">pool ≈ 97 candidates · MRR@10 shown · hover model name for full name</p>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                          <th className="px-3 py-2 text-left">Model</th>
                          <th className="px-2 py-2 text-center">Init</th>
                          <th className="px-2 py-2 text-right">val</th>
                          <th className="px-2 py-2 text-right">EN</th>
                          <th className="px-2 py-2 text-right">AR</th>
                          <th className="px-2 py-2 text-right">UR</th>
                          <th className="px-2 py-2 text-right">xling</th>
                          <th className="px-2 py-2 text-right">MSMARCO</th>
                          <th className="px-2 py-2 text-right font-bold text-neutral-700">avg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {v3ProtocolA.map((r) => (
                          <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                            <ModelCell short={r.short} full={r.model} ours={r.ours} />
                            <td className="px-2 py-2 text-center"><InitBadge init={r.init} /></td>
                            <NumCell v={r.val} />
                            <NumCell v={r.en} />
                            <NumCell v={r.ar} />
                            <NumCell v={r.ur} />
                            <NumCell v={r.xling} />
                            <NumCell v={r.msmarco} />
                            <NumCell v={r.avg} bold />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="border-t border-neutral-100 px-4 py-2.5">
                      <p className="text-xs text-neutral-600">
                        <strong className="text-neutral-900">Key:</strong>{" "}
                        MiniLM-L6-v2 scores 0.144 AR / 0.140 UR. mentee-v3 (random init) scores 0.475 / 0.443 —
                        only sub-50M model functional across all 3 languages. avg MRR@10 <strong>0.691</strong> beats MiniLM-L6-v2 (0.479).
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Protocol B */}
                <Reveal delay={0.1}>
                  <div className="mt-4 rounded-2xl border border-neutral-200 bg-white">
                    <div className="border-b border-neutral-100 px-4 py-3">
                      <h3 className="text-sm font-semibold text-neutral-900">Protocol B — MIRACL Wikipedia Corpus</h3>
                      <p className="mt-0.5 text-xs text-neutral-500">up to 15,201 passages · out-of-domain by design</p>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                          <th className="px-3 py-2 text-left">Model</th>
                          <th className="px-2 py-2 text-center">Init</th>
                          <th className="px-2 py-2 text-right">EN</th>
                          <th className="px-2 py-2 text-right">AR</th>
                          <th className="px-2 py-2 text-right">UR</th>
                          <th className="px-2 py-2 text-right font-bold text-neutral-700">avg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {v3ProtocolB.map((r) => (
                          <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                            <ModelCell short={r.short} full={r.model} ours={r.ours} />
                            <td className="px-2 py-2 text-center"><InitBadge init={r.init} /></td>
                            <NumCell v={r.en_mrr} />
                            <NumCell v={r.ar_mrr} />
                            <NumCell v={r.ur_mrr} />
                            <NumCell v={r.avg} bold />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="border-t border-neutral-100 px-4 py-2.5">
                      <p className="text-xs text-neutral-600">
                        <strong className="text-neutral-900">Out-of-domain by design.</strong>{" "}
                        Zero Wikipedia passages in training data — shows the domain boundary of from-scratch training.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Protocol C + STS side-by-side */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Reveal delay={0.14}>
                    <div className="rounded-2xl border border-neutral-200 bg-white">
                      <div className="border-b border-neutral-100 px-4 py-3">
                        <h3 className="text-sm font-semibold text-neutral-900">Protocol C — MS-MARCO Corpus</h3>
                        <p className="mt-0.5 text-xs text-neutral-500">10,296 passages · in-domain for v3</p>
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                            <th className="px-3 py-2 text-left">Model</th>
                            <th className="px-2 py-2 text-right">MRR</th>
                            <th className="px-2 py-2 text-right">R@5</th>
                            <th className="px-2 py-2 text-right">R@100</th>
                          </tr>
                        </thead>
                        <tbody>
                          {v3ProtocolC.map((r) => (
                            <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                              <ModelCell short={r.short} full={r.model} ours={r.ours} />
                              <NumCell v={r.mrr} bold={r.ours} />
                              <NumCell v={r.r5} />
                              <NumCell v={r.r100} />
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="border-t border-neutral-100 px-4 py-2.5">
                        <p className="text-xs text-neutral-600"><strong>3× jump</strong> v2→v3 while model size ↓ (125M→41M).</p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.18}>
                    <div className="rounded-2xl border border-neutral-200 bg-white">
                      <div className="border-b border-neutral-100 px-4 py-3">
                        <h3 className="text-sm font-semibold text-neutral-900">STS-B — Semantic Similarity</h3>
                        <p className="mt-0.5 text-xs text-neutral-500">Spearman ρ · n=1,379 · zero-shot</p>
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                            <th className="px-3 py-2 text-left">Model</th>
                            <th className="px-2 py-2 text-center">Init</th>
                            <th className="px-2 py-2 text-right">ρ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {v3Sts.map((r) => (
                            <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                              <ModelCell short={r.short} full={r.model} ours={r.ours} />
                              <td className="px-2 py-2 text-center"><InitBadge init={r.init} /></td>
                              <NumCell v={r.rho} bold={r.ours} />
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="border-t border-neutral-100 px-4 py-2.5">
                        <p className="text-xs text-neutral-600">Optimized for retrieval — 0.683 ρ with zero similarity supervision.</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>}

              {selectedId === "v3-key-finding" && <section id="v3-key-finding">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    The Key Finding
                  </h2>
                  <p className="mt-4 text-neutral-600">
                    Under a fixed VRAM budget, choose a smaller model to enable a
                    larger batch.{" "}
                    <strong className="text-neutral-900">
                      Batch size dominates over parameter count
                    </strong>{" "}
                    for from-scratch contrastive embedding training.
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center">
                      <div className="text-3xl font-extrabold text-neutral-900">3×</div>
                      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Protocol C improvement</div>
                      <div className="mt-1 text-xs text-neutral-400">0.215 → 0.645</div>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center">
                      <div className="text-3xl font-extrabold text-neutral-900">41M</div>
                      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Smaller is better</div>
                      <div className="mt-1 text-xs text-neutral-400">125M → 41M recovered quality</div>
                    </div>
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center">
                      <div className="text-3xl font-extrabold text-neutral-900">512</div>
                      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Batch size matters</div>
                      <div className="mt-1 text-xs text-neutral-400">192 → 512 unlocked gains</div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-6 rounded-xl border-l-4 border-green-500 bg-green-50 p-5 text-sm text-neutral-700">
                    <strong>Practical implication:</strong> Under a fixed VRAM
                    budget, prefer a smaller model that enables larger batches. The
                    VRAM required by 125M parameters forced batch size from 192 down
                    to 128 — that single trade-off degraded all protocols. Returning
                    to 41M with batch=512 and adding MS-MARCO produced a 3× Protocol
                    C improvement while model size <em>decreased</em>.
                  </div>
                </Reveal>
              </section>}

              {selectedId === "v3-strengths" && <section id="v3-strengths">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Strengths
                  </h2>
                </Reveal>
                <div className="mt-6 space-y-4">
                  {v3Strengths.map((s, i) => (
                    <Reveal key={s.t} delay={i * 0.06}>
                      <div className="rounded-2xl border-l-4 border-green-400 bg-green-50/60 p-5">
                        <h3 className="font-semibold text-neutral-900">{s.t}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>}

              {selectedId === "v3-limitations" && <section id="v3-limitations">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Limitations
                  </h2>
                  <p className="mt-2 text-neutral-500">
                    We document what does not work alongside what does.
                  </p>
                </Reveal>
                <div className="mt-6 space-y-4">
                  {v3Limitations.map((l, i) => (
                    <Reveal key={l.t} delay={i * 0.06}>
                      <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/60 p-5">
                        <h3 className="font-semibold text-neutral-900">{l.t}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{l.d}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>}

              {selectedId === "roadmap" && <section id="roadmap">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Roadmap
                  </h2>
                </Reveal>
                <ol className="mt-8 space-y-0">
                  {roadmap.map((r, i) => (
                    <Reveal key={r.t} delay={i * 0.06}>
                      <li className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-xs font-bold text-neutral-600">
                            {i + 1}
                          </span>
                          {i < roadmap.length - 1 && (
                            <span className="mt-1 h-full w-px flex-1 bg-neutral-200" />
                          )}
                        </div>
                        <div className="pb-7">
                          <h3 className="font-semibold text-neutral-900">{r.t}</h3>
                          <p className="mt-1 text-sm text-neutral-600">{r.d}</p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </section>}

              {selectedId === "reproduction" && <section id="reproduction">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Reproduction
                  </h2>
                  <p className="mt-3 text-neutral-600">
                    Everything is open: code on GitHub, models on Hugging Face.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://github.com/MenteE-s/mentee-embeddings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
                    >
                      Source on GitHub
                    </a>
                    <a
                      href="https://huggingface.co/menteeai/mentee-embed-v1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                    >
                      v1 on Hugging Face
                    </a>
                    <a
                      href="https://huggingface.co/menteeai/mentee-embed-v3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                    >
                      v3 on Hugging Face
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
                    <h3 className="font-semibold text-neutral-900">Quick start (v3)</h3>
                    <pre className="mt-4 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs leading-relaxed text-neutral-100">
                      <code>{`# Clone and install
git clone https://github.com/MenteE-s/mentee-embeddings
cd mentee-embeddings
git checkout v2-hard-negatives
pip install -r requirements.txt

# Download training data
HF_HUB_DISABLE_XET=1 python scripts/fetch_datasets.py

# Run full v3 pipeline
HF_HUB_DISABLE_XET=1 PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True \\
    python kaggle_run_v3.py

# Benchmark
HF_HUB_DISABLE_XET=1 python scripts/benchmark_v3.py`}</code>
                    </pre>
                    <p className="mt-3 text-xs text-neutral-500">
                      Full pipeline runs on a single GPU with 24GB+ VRAM in under 4 hours.
                    </p>
                  </div>
                </Reveal>
              </section>}

              {/* Prev / Next navigation */}
              <SectionNav
                current={selectedId}
                sections={tocSections}
                onSelect={navigate}
              />

              </motion.div>
              </AnimatePresence>
            </div>{/* /content column */}
          </div>{/* /two-col flex */}
        </div>{/* /max-w-7xl */}

        {/* Footer note */}
        <div className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <p className="text-xs text-neutral-400">
              MenteE AI · Trilingual embeddings trained from scratch · Arabic ·
              English · Urdu · v1: MLM → distillation · v3: + MS-MARCO + hard
              negatives + batch 512.
            </p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
