"use client";

import { Reveal, SectionHeading, StatGrid, StrengthList, LimitationList, TableCard, InitBadge, ModelCell, NumCell, PublicationCard } from "./shared";
import { VersionProgressionChart, ProtocolAChart } from "./Charts";
import { v3Stats, v3VersionTable, v3ProtocolA, v3ProtocolB, v3ProtocolC, v3Sts, v3DataSources, v3Strengths, v3Limitations } from "./data";

export function V3Approach() {
  return (
    <section id="v3-approach" className="mt-10 scroll-mt-24">
      <SectionHeading
        title="The Approach"
        sub={
          <>
            Same 41M architecture as v1. The difference: batch size 512 (vs
            192), 2.1M training triplets (vs ~810K), and a two-round
            distillation pipeline with hard negative mining.
          </>
        }
      />

      <Reveal delay={0.05}>
        <div className="mt-6">
          <PublicationCard version="v3" />
        </div>
      </Reveal>

      {/* Version progression */}
      <Reveal delay={0.08}>
        <div className="mt-8">
          <TableCard
            title="Version progression"
            sub="Three-version ablation — the core scientific contribution"
          >
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
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <VersionProgressionChart />
      </Reveal>

      <Reveal delay={0.14}>
        <ProtocolAChart />
      </Reveal>

      {/* Training pipeline */}
      <Reveal delay={0.12}>
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">A</span>
            <h3 className="font-semibold text-neutral-900">Stage A — MLM</h3>
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            8,000 steps, batch 32, lr 5×10⁻⁴, bf16. ~45 minutes on RTX 5090.
            Custom 50K BPE tokenizer trained from scratch.
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
            Teacher: intfloat/multilingual-e5-base (768-dim) — frozen, weights
            never transferred. Hard negatives mined via GPU-accelerated
            chunk-wise dot products between rounds.
          </p>
        </div>
      </Reveal>

      <StatGrid stats={v3Stats} />

      {/* Training data */}
      <Reveal delay={0.2}>
        <div className="mt-8">
          <TableCard
            title="Training data — 2,107,423 triplets"
            sub="v1 used ~810K · v3 adds MS-MARCO (700K) + OPUS-AR-EN (300K)"
          >
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
          </TableCard>
        </div>
      </Reveal>
    </section>
  );
}

export function V3Benchmarks() {
  return (
    <section id="v3-benchmarks" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Benchmarks"
        sub="All results on a single NVIDIA RTX 5090. Baselines use pretrained encoders — none trained from scratch."
      />

      {/* Protocol A */}
      <Reveal delay={0.06}>
        <div className="mt-8">
          <TableCard
            title="Protocol A — In-Batch Retrieval"
            sub="pool ≈ 97 candidates · MRR@10 shown · hover model name for full name"
            note={
              <>
                <strong className="text-neutral-900">Key:</strong> MiniLM-L6-v2
                scores 0.144 AR / 0.140 UR. mentee-v3 (random init) scores 0.475
                / 0.443 — only sub-50M model functional across all 3 languages.
                avg MRR@10 <strong>0.691</strong> beats MiniLM-L6-v2 (0.479).
              </>
            }
          >
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
          </TableCard>
        </div>
      </Reveal>

      {/* Protocol B */}
      <Reveal delay={0.1}>
        <div className="mt-4">
          <TableCard
            title="Protocol B — MIRACL Wikipedia Corpus"
            sub="up to 15,201 passages · out-of-domain by design"
            note={
              <>
                <strong className="text-neutral-900">Out-of-domain by design.</strong>{" "}
                Zero Wikipedia passages in training data — shows the domain
                boundary of from-scratch training.
              </>
            }
          >
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
          </TableCard>
        </div>
      </Reveal>

      {/* Protocol C + STS side-by-side */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Reveal delay={0.14}>
          <TableCard
            title="Protocol C — MS-MARCO Corpus"
            sub="10,296 passages · in-domain for v3"
            note={<><strong>3× jump</strong> v2→v3 while model size ↓ (125M→41M).</>}
          >
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
          </TableCard>
        </Reveal>

        <Reveal delay={0.18}>
          <TableCard
            title="STS-B — Semantic Similarity"
            sub="Spearman ρ · n=1,379 · zero-shot"
            note="Optimized for retrieval — 0.683 ρ with zero similarity supervision."
          >
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
          </TableCard>
        </Reveal>
      </div>
    </section>
  );
}

export function V3KeyFinding() {
  return (
    <section id="v3-key-finding" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="The Key Finding"
        sub={
          <>
            Under a fixed VRAM budget, choose a smaller model to enable a larger
            batch.{" "}
            <strong className="text-neutral-900">
              Batch size dominates over parameter count
            </strong>{" "}
            for from-scratch contrastive embedding training.
          </>
        }
      />

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
          <strong>Practical implication:</strong> Under a fixed VRAM budget,
          prefer a smaller model that enables larger batches. The VRAM required
          by 125M parameters forced batch size from 192 down to 128 — that
          single trade-off degraded all protocols. Returning to 41M with
          batch=512 and adding MS-MARCO produced a 3× Protocol C improvement
          while model size <em>decreased</em>.
        </div>
      </Reveal>
    </section>
  );
}

export function V3Strengths() {
  return (
    <section id="v3-strengths" className="mt-16 scroll-mt-24">
      <SectionHeading title="Strengths" />
      <StrengthList items={v3Strengths} />
    </section>
  );
}

export function V3Limitations() {
  return (
    <section id="v3-limitations" className="mt-16 scroll-mt-24">
      <SectionHeading title="Limitations" sub="We document what does not work alongside what does." />
      <LimitationList items={v3Limitations} />
    </section>
  );
}
