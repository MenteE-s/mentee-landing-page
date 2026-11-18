/* ── Research page data ────────────────────────────────────
   All benchmark numbers sourced from:
   - v1/v3: Zenodo preprints (DOI 10.5281/zenodo.22087139 / 22117673)
   - v4: github.com/MenteE-s/mentee-embeddings v4-larger-dataset
     benchmarks/v4_report.md (generated 2026-08-28, RTX 5090)
   and the HF model cards (MenteEAI/mentee-embed-v1/v3/v4).     */

/* ── TOC ─────────────────────────────────────────────────── */

export type ModelId = "acp" | "v4" | "v3" | "v1";

export interface TocSection {
  id: string;
  label: string;
  group: string;
}

/** Dropdown order — latest first. */
export const modelsMeta: { id: ModelId; label: string; tag?: string }[] = [
  { id: "acp", label: "Think While You Speak", tag: "New" },
  { id: "v4", label: "mentee-embed-v4", tag: "Latest embed" },
  { id: "v3", label: "mentee-embed-v3" },
  { id: "v1", label: "mentee-embed-v1" },
];

export const sharedSections: TocSection[] = [
  { id: "overview",     label: "Overview",     group: "" },
  { id: "roadmap",      label: "Roadmap",      group: "Shared" },
  { id: "reproduction", label: "Reproduction", group: "Shared" },
];

export const modelSections: Record<ModelId, TocSection[]> = {
  acp: [
    { id: "acp-approach",    label: "The Architecture", group: "Think While You Speak" },
    { id: "acp-results",     label: "Results",          group: "Think While You Speak" },
    { id: "acp-routing",     label: "Routing Gradient", group: "Think While You Speak" },
    { id: "acp-ablation",    label: "Memory Ablation",  group: "Think While You Speak" },
    { id: "acp-strengths",   label: "Strengths",        group: "Think While You Speak" },
    { id: "acp-limitations", label: "Limitations",      group: "Think While You Speak" },
    { id: "acp-roadmap",     label: "Roadmap",          group: "Think While You Speak" },
    { id: "acp-reproduction", label: "Reproduction",    group: "Think While You Speak" },
  ],
  v4: [
    { id: "v4-approach",    label: "The Approach",       group: "mentee-embed-v4" },
    { id: "v4-benchmarks",  label: "Benchmarks",         group: "mentee-embed-v4" },
    { id: "v4-speed",       label: "Speed & Efficiency", group: "mentee-embed-v4" },
    { id: "v4-strengths",   label: "Strengths",          group: "mentee-embed-v4" },
    { id: "v4-limitations", label: "Limitations",        group: "mentee-embed-v4" },
  ],
  v3: [
    { id: "v3-approach",    label: "The Approach",    group: "mentee-embed-v3" },
    { id: "v3-benchmarks",  label: "Benchmarks",      group: "mentee-embed-v3" },
    { id: "v3-key-finding", label: "The Key Finding", group: "mentee-embed-v3" },
    { id: "v3-strengths",   label: "Strengths",       group: "mentee-embed-v3" },
    { id: "v3-limitations", label: "Limitations",     group: "mentee-embed-v3" },
  ],
  v1: [
    { id: "v1-approach",    label: "The Approach", group: "mentee-embed-v1" },
    { id: "v1-protocol-a",  label: "Protocol A",   group: "mentee-embed-v1" },
    { id: "v1-protocol-b",  label: "Protocol B",   group: "mentee-embed-v1" },
    { id: "v1-efficiency",  label: "Efficiency",   group: "mentee-embed-v1" },
    { id: "v1-strengths",   label: "Strengths",    group: "mentee-embed-v1" },
    { id: "v1-limitations", label: "Limitations",  group: "mentee-embed-v1" },
  ],
};

/* ── v1 ──────────────────────────────────────────────────── */

export const v1Stats = [
  { n: "41M", l: "Parameters" },
  { n: "384", l: "Embedding dim" },
  { n: "3", l: "Languages" },
  { n: "0.820", l: "Val acc@1" },
];

export const inbatchRows = [
  { name: "mentee-embed-v1", short: "mentee-v1 ★", val: "0.820", en: "0.345", ar: "0.222", ur: "0.183", xling: "0.757", mrr: "0.585", ours: true },
  { name: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", val: "0.821", en: "0.864", ar: "0.722", ur: "0.686", xling: "0.831", mrr: "0.867" },
  { name: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", val: "0.795", en: "0.854", ar: "0.696", ur: "0.621", xling: "0.782", mrr: "0.840" },
  { name: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", val: "0.484", en: "0.856", ar: "0.025", ur: "0.028", xling: "0.065", mrr: "0.449" },
];

export const corpusRows = [
  { name: "mentee-embed-v1", short: "mentee-v1 ★", en: "0.190", ar: "0.193", ur: "0.189", r100: "0.47", ours: true },
  { name: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", en: "0.938", ar: "0.678", ur: "0.580", r100: "0.92" },
  { name: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", en: "0.921", ar: "0.685", ur: "0.518", r100: "0.91" },
  { name: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", en: "0.920", ar: "0.100", ur: "0.100", r100: "0.34" },
];

export const v1Succeeded = [
  { t: "Relational distillation", d: "Converted a hopeless from-scratch contrastive problem into a dense, learnable regression target." },
  { t: "From-scratch tokenizer + MLM", d: "Gave a clean, language-aware initialization free of any pretrained backbone." },
  { t: "In-batch retrieval", d: "Genuinely strong — usable for query/document matching, deduplication, and cross-lingual English↔Urdu search." },
];

export const v1Limitations = [
  { t: "Open-domain corpus retrieval", d: "Protocol B lags web-scale models. Best used as a re-ranker, not a standalone billion-document search engine." },
  { t: "Training scope", d: "NLI + parallel translation data only. Domain-specific retrieval will need fine-tuning." },
  { t: "Sequence length", d: "Capped at 128 tokens; longer documents should be chunked." },
  { t: "Format", d: "Loads via src/model.py with model.pt. v3 adds a Sentence-Transformers-compatible export — use SentenceTransformer(\"MenteEAI/mentee-embed-v3\") for the simplest path." },
];

/* ── v3 ──────────────────────────────────────────────────── */

export const v3Stats = [
  { n: "41M", l: "Parameters" },
  { n: "384", l: "Embedding dim" },
  { n: "2.1M", l: "Training triplets" },
  { n: "0.655", l: "Prot-A avg MRR@10" },
];

export const v3VersionTable = [
  { v: "v1", params: "41M", batch: "192", protA: "0.585", protC: "~0.20" },
  { v: "v2", params: "125M", batch: "128", protA: "0.429 ↓", protC: "0.215" },
  { v: "v3", params: "41M", batch: "512", protA: "0.655", protC: "0.645", highlight: true },
  { v: "v4", params: "41M", batch: "512", protA: "0.916", protC: "0.706", highlight: true, isV4: true },
];

export const v3ProtocolA = [
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", val: "0.895", en: "0.931", ar: "0.839", ur: "0.806", xling: "0.880", msmarco: "0.830", avg: "0.864" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", val: "0.883", en: "0.924", ar: "0.819", ur: "0.753", xling: "0.841", msmarco: "0.796", avg: "0.836" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", val: "0.870", en: "0.766", ar: "0.475", ur: "0.443", xling: "0.848", msmarco: "0.742", avg: "0.691", ours: true },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", val: "0.627", en: "0.927", ar: "0.144", ur: "0.140", xling: "0.186", msmarco: "0.848", avg: "0.479" },
  { model: "mentee-embed-v1", short: "mentee-v1", init: "Rand", val: "—", en: "0.501", ar: "0.373", ur: "0.329", xling: "0.829", msmarco: "—", avg: "0.585" },
  { model: "mentee-embed-v2", short: "mentee-v2", init: "Rand", val: "—", en: "0.412", ar: "0.175", ur: "0.200", xling: "0.638", msmarco: "—", avg: "0.429" },
];

export const v3ProtocolB = [
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", en_mrr: "0.853", ar_mrr: "0.622", ur_mrr: "0.534", avg: "0.670" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", en_mrr: "0.840", ar_mrr: "0.591", ur_mrr: "0.469", avg: "0.633" },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", en_mrr: "0.867", ar_mrr: "0.100", ur_mrr: "0.106", avg: "0.358" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", en_mrr: "0.418", ar_mrr: "0.182", ur_mrr: "0.180", avg: "0.260", ours: true },
  { model: "mentee-embed-v1", short: "mentee-v1", init: "Rand", en_mrr: "0.190", ar_mrr: "0.193", ur_mrr: "0.189", avg: "0.190" },
  { model: "mentee-embed-v2", short: "mentee-v2", init: "Rand", en_mrr: "0.170", ar_mrr: "0.104", ur_mrr: "0.104", avg: "0.126" },
];

export const v3ProtocolC = [
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", mrr: "0.951", r5: "0.993", r10: "0.993", r100: "1.000" },
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", mrr: "0.882", r5: "0.970", r10: "0.973", r100: "0.993" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", mrr: "0.839", r5: "0.910", r10: "0.953", r100: "0.997" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", mrr: "0.645", r5: "0.760", r10: "0.810", r100: "0.957", ours: true },
  { model: "mentee-embed-v2", short: "mentee-v2", init: "Rand", mrr: "0.215", r5: "0.217", r10: "—", r100: "0.593" },
];

export const v3Sts = [
  { model: "paraphrase-multilingual-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", rho: "0.8682" },
  { model: "paraphrase-multilingual-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", rho: "0.8442" },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", rho: "0.8203" },
  { model: "mentee-embed-v3", short: "mentee-v3 ★", init: "Rand", rho: "0.6834", ours: true },
];

export const v3DataSources = [
  { src: "all-NLI (SNLI + MultiNLI)", lang: "English", type: "Triplet", n: "557,850" },
  { src: "XNLI", lang: "Arabic", type: "Triplet", n: "127,856" },
  { src: "XNLI", lang: "Urdu", type: "Triplet", n: "124,869" },
  { src: "OPUS-100", lang: "EN–UR", type: "Parallel", n: "300,000" },
  { src: "OPUS-100", lang: "AR–EN", type: "Parallel", n: "300,000" },
  { src: "MS-MARCO BM25", lang: "English", type: "Retrieval", n: "500,000" },
  { src: "MS-MARCO hard negs", lang: "English", type: "Retrieval", n: "200,000" },
  { src: "MIRACL", lang: "EN, AR, UR", type: "Retrieval", n: "~9,000" },
];

export const v3Strengths = [
  { t: "Cross-lingual AR/UR retrieval", d: "Functional at 41M from random init — genuine multilingual transfer." },
  { t: "EN↔UR transfer", d: "MRR@10 = 0.848, competitive with pretrained 117M models." },
  { t: "In-domain MS-MARCO", d: "0.645 MRR@10, R@100 = 0.957 — strong when training data matches the target domain." },
  { t: "STS-B generalization", d: "0.683 Spearman ρ despite no similarity supervision in training." },
  { t: "Fully reproducible", d: "One command reproduces the full pipeline on a single GPU with 24GB+ VRAM in under 4 hours." },
];

export const v3Limitations = [
  { t: "Wikipedia corpus (Protocol B)", d: "0.260 avg MRR@10 vs 0.633 for pretrained models. Zero Wikipedia passages in training data — an out-of-domain boundary." },
  { t: "STS-B gap", d: "0.683 vs 0.820–0.868. Training optimized for retrieval, not graded similarity — a deliberate trade-off." },
  { t: "Arabic/Urdu Protocol B", d: "0.182/0.180 MRR@10. English-heavy retrieval data (700K MS-MARCO vs ~127K AR/UR)." },
  { t: "Single seed", d: "All results from one training run; variance unquantified." },
  { t: "No MTEB full suite", d: "Only targeted retrieval + STS-B evaluated." },
];

/* ── v4 ──────────────────────────────────────────────────── */

export const v4Stats = [
  { n: "41M", l: "Parameters" },
  { n: "384", l: "Embedding dim" },
  { n: "2.6M", l: "Training triplets" },
  { n: "0.252", l: "Bench MRR@10" },
];

export const v4CustomBench = [
  { model: "paraphrase-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", params: "278M", en: "0.764", ar: "0.602", ur: "0.611", dialect: "0.445", roman: "0.661", all: "0.661", ndcg: "0.714" },
  { model: "paraphrase-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", params: "118M", en: "0.682", ar: "0.568", ur: "0.519", dialect: "0.385", roman: "0.480", all: "0.592", ndcg: "0.634" },
  { model: "multilingual-e5-base", short: "e5-base", init: "Pre", params: "278M", en: "0.667", ar: "0.352", ur: "0.413", dialect: "0.310", roman: "0.430", all: "0.481", ndcg: "0.470" },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", params: "23M", en: "0.873", ar: "0.087", ur: "0.289", dialect: "0.084", roman: "0.486", all: "0.425", ndcg: "0.299" },
  { model: "mentee-embed-v4", short: "mentee-v4 ★", init: "Rand", params: "41M", en: "0.369", ar: "0.120", ur: "0.261", dialect: "0.095", roman: "0.399", all: "0.252", ndcg: "0.238", ours: true },
  { model: "mentee-embed-v3", short: "mentee-v3", init: "Rand", params: "41M", en: "0.225", ar: "0.021", ur: "0.055", dialect: "0.000", roman: "0.079", all: "0.103", ndcg: "0.147" },
];

export const v4MIRACL = [
  { model: "multilingual-e5-base", short: "e5-base", init: "Pre", params: "278M", en: "0.980 / 0.990", ar: "0.940 / 0.958", ur: "0.960 / 0.970" },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", params: "23M", en: "0.980 / 0.990", ar: "0.005 / 0.027", ur: "0.015 / 0.031" },
  { model: "paraphrase-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", params: "278M", en: "0.965 / 0.982", ar: "0.860 / 0.898", ur: "0.755 / 0.824" },
  { model: "paraphrase-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", params: "118M", en: "0.965 / 0.979", ar: "0.815 / 0.868", ur: "0.720 / 0.785" },
  { model: "mentee-embed-v4", short: "mentee-v4 ★", init: "Rand", params: "41M", en: "0.870 / 0.916", ar: "0.825 / 0.874", ur: "0.475 / 0.572", ours: true },
];

export const v4MSCMARCO = [
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", init: "Pre", mrr: "0.877", r5: "0.992", r100: "0.992" },
  { model: "multilingual-e5-base", short: "e5-base", init: "Pre", mrr: "0.856", r5: "0.992", r100: "0.996" },
  { model: "paraphrase-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", mrr: "0.803", r5: "0.964", r100: "0.988" },
  { model: "mentee-embed-v4", short: "mentee-v4 ★", init: "Rand", mrr: "0.706", r5: "0.913", r100: "0.980", ours: true },
];

export const v4Sts = [
  { model: "paraphrase-mpnet-base-v2", short: "mpnet-base-v2", init: "Pre", rho: "0.868" },
  { model: "bge-small-en-v1.5", short: "bge-small-v1.5", init: "Pre", rho: "0.859" },
  { model: "paraphrase-MiniLM-L12-v2", short: "MiniLM-L12-v2", init: "Pre", rho: "0.844" },
  { model: "multilingual-e5-base", short: "e5-base", init: "Pre", rho: "0.842" },
  { model: "mentee-embed-v4", short: "mentee-v4 ★", init: "Rand", rho: "0.725", ours: true },
];

export const v4Speed = [
  { model: "mentee-embed-v4", short: "mentee-v4 ★", params: "41M", bs128: "18,115", lat: "5.15", vram: "175", cost: "$7.15", ours: true },
  { model: "all-MiniLM-L6-v2", short: "MiniLM-L6-v2", params: "23M", bs128: "12,445", lat: "4.71", vram: "103", cost: "$10.40" },
  { model: "multilingual-e5-small", short: "e5-small", params: "118M", bs128: "9,749", lat: "7.88", vram: "482", cost: "$13.28" },
  { model: "paraphrase-MiniLM-L12-v2", short: "MiniLM-L12-v2", params: "118M", bs128: "9,456", lat: "8.17", vram: "573", cost: "$13.69" },
  { model: "multilingual-e5-base", short: "e5-base", params: "278M", bs128: "5,379", lat: "8.07", vram: "1126", cost: "$24.07" },
  { model: "paraphrase-mpnet-base-v2", short: "mpnet-base-v2", params: "278M", bs128: "5,158", lat: "8.04", vram: "1126", cost: "$25.10" },
];

export const v4Efficiency = [
  { model: "mentee-embed-v4", short: "mentee-v4 ★", params: "41M", benchMrr: "0.525", sentsSec: "441.82", ours: true },
  { model: "paraphrase-MiniLM-L12-v2", short: "MiniLM-L12-v2", params: "118M", benchMrr: "0.452", sentsSec: "80.34" },
  { model: "paraphrase-mpnet-base-v2", short: "mpnet-base-v2", params: "278M", benchMrr: "0.224", sentsSec: "18.55" },
  { model: "multilingual-e5-base", short: "e5-base", params: "278M", benchMrr: "0.166", sentsSec: "19.35" },
];

export const v4DataSources = [
  { src: "all-NLI (sentence-transformers)", lang: "EN", type: "NLI triplets", n: "558K" },
  { src: "XNLI", lang: "AR", type: "NLI triplets", n: "128K" },
  { src: "XNLI", lang: "UR", type: "NLI triplets", n: "125K" },
  { src: "OPUS-100 EN-UR", lang: "EN/UR", type: "Parallel translation", n: "300K" },
  { src: "OPUS-100 AR-EN", lang: "AR/EN", type: "Parallel translation", n: "300K" },
  { src: "MS-MARCO BM25 triplets", lang: "EN", type: "Passage retrieval", n: "500K" },
  { src: "MS-MARCO hard negatives", lang: "EN", type: "Hard retrieval", n: "200K" },
  { src: "mMARCO Arabic", lang: "AR", type: "Passage retrieval", n: "500K" },
  { src: "MIRACL", lang: "EN/AR/UR", type: "Wikipedia retrieval", n: "~9K" },
];

export const v4Strengths = [
  { t: "Massive v3 improvement", d: "+146% bench MRR@10 (0.103 → 0.252), +96% MIRACL AR, +62% MIRACL UR — all from the same 41M architecture." },
  { t: "Fastest model tested", d: "18,115 sents/sec at batch 128 — 3.5x faster than mpnet-base, 45% faster than MiniLM-L12." },
  { t: "MIRACL AR/EN competitive", d: "0.874 MIRACL AR MRR@10 — close to pretrained mpnet-base (0.898) at 6.8x fewer parameters." },
  { t: "Lowest cost", d: "$7.15 per 1B sentences — cheapest of all models tested on RTX 5090." },
  { t: "Strong efficiency", d: "0.525 bench MRR per 1M params — highest efficiency ratio of any model in the comparison." },
];

export const v4Limitations = [
  { t: "Custom bench gap", d: "0.252 vs 0.661 for mpnet-base. The gap reflects 2.6M training pairs vs web-scale data." },
  { t: "English still dominates", d: "EN MRR@10 = 0.369 vs AR 0.120 on custom bench. MIRACL AR is strong (0.874) but the custom bench uses dialect Arabic." },
  { t: "Not on MTEB full suite", d: "Only targeted retrieval + STS-B evaluated. Full MTEB evaluation pending." },
  { t: "Single seed", d: "All results from one training run; variance unquantified." },
];

/* ── shared ──────────────────────────────────────────────── */

export const roadmap = [
  { t: "v1.5 completion", d: "Stage-B contrastive run on top of the successful MLM foundation." },
  { t: "Public leaderboard", d: "Head-to-head benchmarks on identical Arabic/English/Urdu retrieval sets." },
  { t: "Open release", d: "Model weights, custom tokenizer, and full model card under Apache 2.0." },
  { t: "Standardized evaluation", d: "MTEB-style benchmarks across multilingual retrieval and bitext-mining tasks." },
  { t: "Urdu-focused expansion", d: "Adding parallel-corpus alignment objectives for the scarcest retrieval ground truth." },
];

/* ── acp · Think While You Speak ─────────────────────────── */

export const acpStats = [
  { n: "93.5%", l: "Task accuracy · 10 seeds" },
  { n: "98.7%", l: "Routing accuracy" },
  { n: "67.2%", l: "Deliberation rate" },
  { n: "1.7e-9", l: "Max gradient error" },
];

export const acpMainResults = [
  { model: "ACP (this work)", short: "ACP ★", acc: "0.935 ± 0.012", route: "0.987 ± 0.002", delib: "0.672 ± 0.000", ours: true },
  { model: "Always Deliberate (MLP)", short: "Always Delib.", acc: "0.937 ± 0.006", route: "0.667 ± 0.000", delib: "1.000" },
  { model: "Fixed MLP (56 hidden units)", short: "Fixed MLP", acc: "0.947 ± 0.007", route: "0.667 ± 0.000", delib: "1.000" },
  { model: "Random Router (p = 0.5)", short: "Random Router", acc: "0.653 ± 0.043", route: "0.501 ± 0.008", delib: "0.499 ± 0.005" },
  { model: "Always Fast (linear)", short: "Always Fast", acc: "0.370 ± 0.081", route: "0.333 ± 0.000", delib: "0.000" },
];

export const acpDifficulty = [
  { model: "ACP (this work)", short: "ACP ★", easy: "0.977", med: "0.965", hard: "0.863", eDelib: "0.028", mDelib: "0.997", hDelib: "0.992", ours: true },
  { model: "Always Fast (linear)", short: "Always Fast", easy: "0.298", med: "0.549", hard: "0.264", eDelib: "0.000", mDelib: "0.000", hDelib: "0.000" },
  { model: "Always Deliberate (MLP)", short: "Always Delib.", easy: "0.987", med: "0.962", hard: "0.863", eDelib: "1.000", mDelib: "1.000", hDelib: "1.000" },
  { model: "Fixed MLP (56 hidden units)", short: "Fixed MLP", easy: "0.986", med: "0.968", hard: "0.886", eDelib: "1.000", mDelib: "1.000", hDelib: "1.000" },
  { model: "Random Router (p = 0.5)", short: "Random Router", easy: "0.638", med: "0.759", hard: "0.562", eDelib: "0.496", mDelib: "0.503", hDelib: "0.498" },
];

export const acpAblation = [
  { monitor: "x + episodic novelty (full model)", short: "x + novelty", acc: "0.943 ± 0.008", route: "0.987 ± 0.001", delib: "0.672 ± 0.000", ours: true },
  { monitor: "x only (novelty removed)", short: "x only", acc: "0.737 ± 0.088", route: "0.921 ± 0.003", delib: "0.662 ± 0.008" },
];

export const acpComponents = [
  { t: "Fast pathway", d: "A linear map, Wf·x + bf. Cheap by construction: a linear model cannot fit the quadratic or product-interaction targets, so the capability gap between the two paths is real rather than assumed." },
  { t: "Deliberate pathway", d: "A 48-unit MLP over the concatenation [x, fast_out]. It can fit every target the fast path cannot, at roughly 54x the multiply-accumulates." },
  { t: "Monitor", d: "p = σ(w·x + wn·novelty + b), a linear gate over the input plus one explicit episodic novelty scalar. The thresholded flag is the traceable routing decision." },
  { t: "Episodic memory", d: "30 fixed keys (15 from the familiar cluster, 15 random). Novelty = 1 − max cosine similarity. Familiar inputs answer fast; novel inputs escalate." },
];

export const acpStrengths = [
  { t: "The routing gradient is near-optimal", d: "Deliberation rises from 2.8% on easy inputs to 99.7% / 99.2% on medium and hard, matching the 66.7% base rate almost exactly, at 98.7% routing accuracy." },
  { t: "The capacity gap is real", d: "The linear fast path provably cannot fit the quadratic (Medium) or product-interaction (Hard) targets, so the routing measurement is meaningful rather than a memorization artifact." },
  { t: "Memory does measurable work", d: "Removing the novelty feature drops accuracy from 94.3% to 73.7%: the x-only gate deliberates at the same overall rate but sends 12% of hard inputs to the path that cannot fit them." },
  { t: "Reproducible without a GPU", d: "Pure NumPy on CPU, 10 seeds, and hand-derived gradients verified against finite differences (max relative error 1.7e-9)." },
];

export const acpLimitations = [
  { t: "Mechanism study, not language", d: "The task is synthetic 16-dimensional regression. Dialogue is the motivating application, not the experimental setting." },
  { t: "Routing is supervised", d: "The monitor trains on ground-truth route labels. A deployed system would not have those; label-free routing is the obvious next step." },
  { t: "The monitor is not free", d: "The 30-key memory scan costs ~496 MACs per input vs ~864 for the deliberate path, so at 67% deliberation there is no net FLOP saving yet. A few keys or a low-dimensional sketch would move the crossover." },
  { t: "Novelty detector, not episodic memory", d: "Keys are fixed and hand-filled, and the readout is a single scalar. Learned writes and content-based retrieval are future work." },
];

export const acpRoadmap = [
  { t: "Label-free routing", d: "Train the monitor from task loss plus a compute penalty, or from the fast path's own residual, so the system decides when to think without an answer key." },
  { t: "Content-addressable memory", d: "Store key-value episodes and feed a readout vector into the monitor, then test on tasks where the same input needs different compute depending on stored context." },
  { t: "A monitor worth paying for", d: "Shrink the memory to a handful of keys or a low-dimensional sketch so the routing policy turns into a real FLOP saving." },
  { t: "Language", d: "Move from synthetic vectors to a small language task: streaming dialogue where deliberation is visible between turns." },
];

export const acpReproCommands = [
  "pip install -r requirements.txt",
  "python test_gradients.py",
  "python evaluate.py",
  "python ablation_novelty.py",
  "python charts/make_results_table.py",
  "python charts/generate_charts.py",
];
