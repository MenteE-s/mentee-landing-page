"use client";

import { Reveal, SectionHeading, StatGrid, StrengthList, LimitationList, TableCard, InitBadge, ModelCell, NumCell, PublicationCard } from "./shared";
import { CustomBenchChart, EfficiencyScatterChart, TrainingDataChart, SpeedBarsChart } from "./Charts";
import { v4Stats, v4CustomBench, v4MIRACL, v4MSCMARCO, v4Sts, v4Speed, v4Efficiency, v4DataSources, v4Strengths, v4Limitations } from "./data";

export function V4Approach() {
  return (
    <section id="v4-approach" className="mt-10 scroll-mt-24">
      <SectionHeading
        title="The Approach"
        sub={
          <>
            v4 retains the same 41M architecture and 384-dim output from v3 but
            expands the training data to{" "}
            <strong className="text-neutral-900">2.6M triplets</strong> with
            mMARCO Arabic retrieval data (500K) and adds a{" "}
            <strong className="text-neutral-900">third distillation round</strong>{" "}
            with re-mined hard negatives, using multilingual-e5-base as teacher.
          </>
        }
      />

      <Reveal delay={0.05}>
        <div className="mt-6">
          <PublicationCard version="v4" />
        </div>
      </Reveal>

      <StatGrid stats={v4Stats} />

      {/* Pipeline */}
      <Reveal delay={0.12}>
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="font-semibold text-neutral-900">Training pipeline</h3>
          <ol className="mt-4 space-y-3">
            {[
              { s: "1", t: "MLM pretraining — 50K steps", d: "Random init → masked language modeling on trilingual corpus, batch 64, vocab 50K BPE. 6× more pretraining than v3." },
              { s: "2", t: "Teacher encoding", d: "multilingual-e5-base (768-dim) encodes all 2.6M triplets to soft labels." },
              { s: "3", t: "Distillation round 1", d: "InfoNCE + relational distillation, 4,000 steps, batch 512, temp 0.05." },
              { s: "4", t: "Hard negative mining round 1", d: "GPU-accelerated top-5 mining across the full 2.6M corpus." },
              { s: "5", t: "Distillation round 2", d: "Same objective + mined hard negatives, 10,000 steps." },
              { s: "6", t: "Hard negative mining round 2", d: "Re-mine with the improved round-2 model." },
              { s: "7", t: "Distillation round 3 — final polish", d: "Train on round-2 mined negatives, 15,000 cumulative steps." },
            ].map((step) => (
              <li key={step.s} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
                  {step.s}
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{step.t}</p>
                  <p className="text-xs text-neutral-500">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Training data */}
      <Reveal delay={0.16}>
        <div className="mt-4">
          <TableCard
            title="Training data — ~2.6M triplets"
            sub="v3 used 2.1M · v4 adds mMARCO Arabic (500K)"
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
                {v4DataSources.map((d) => (
                  <tr key={d.src + d.lang} className="border-b border-neutral-50">
                    <td className="px-3 py-1.5 text-xs text-neutral-700">{d.src}</td>
                    <td className="px-3 py-1.5 text-xs text-neutral-500">{d.lang}</td>
                    <td className="px-3 py-1.5 text-xs text-neutral-500">{d.type}</td>
                    <td className="px-3 py-1.5 text-right tabular-nums text-xs font-medium text-neutral-900">{d.n}</td>
                  </tr>
                ))}
                <tr className="bg-neutral-50">
                  <td className="px-3 py-2 text-xs font-semibold text-neutral-900" colSpan={3}>Total</td>
                  <td className="px-3 py-2 text-right tabular-nums text-xs font-bold text-neutral-900">~2.6M</td>
                </tr>
              </tbody>
            </table>
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <TrainingDataChart />
      </Reveal>
    </section>
  );
}

export function V4Benchmarks() {
  return (
    <section id="v4-benchmarks" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Benchmarks"
        sub="All results on a single NVIDIA RTX 5090. Baselines use pretrained encoders — none trained from scratch."
      />

      {/* Custom Bench */}
      <Reveal delay={0.06}>
        <div className="mt-8">
          <TableCard
            title="MenteE Embed Bench — Custom EN/AR/UR"
            sub="121 queries · 18 domains · dialect Arabic · Roman Urdu · hard negatives · MRR@10"
            note={
              <>
                <strong className="text-neutral-900">Key:</strong> mentee-v4
                (0.252 All) closes the gap vs v3 (0.103) by +146%. MiniLM-L6-v2
                (0.425) scores high on EN (0.873) but collapses on dialect
                Arabic (0.084).
              </>
            }
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                  <th className="px-3 py-2 text-left">Model</th>
                  <th className="px-2 py-2 text-center">Init</th>
                  <th className="px-2 py-2 text-right">Params</th>
                  <th className="px-2 py-2 text-right">EN</th>
                  <th className="px-2 py-2 text-right">AR</th>
                  <th className="px-2 py-2 text-right">UR</th>
                  <th className="px-2 py-2 text-right">Dialect AR</th>
                  <th className="px-2 py-2 text-right">Roman UR</th>
                  <th className="px-2 py-2 text-right font-bold text-neutral-700">All</th>
                  <th className="px-2 py-2 text-right">NDCG@10</th>
                </tr>
              </thead>
              <tbody>
                {v4CustomBench.map((r) => (
                  <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                    <ModelCell short={r.short} full={r.model} ours={r.ours} />
                    <td className="px-2 py-2 text-center"><InitBadge init={r.init} /></td>
                    <NumCell v={r.params} />
                    <NumCell v={r.en} />
                    <NumCell v={r.ar} />
                    <NumCell v={r.ur} />
                    <NumCell v={r.dialect} />
                    <NumCell v={r.roman} />
                    <NumCell v={r.all} bold />
                    <NumCell v={r.ndcg} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <CustomBenchChart />
      </Reveal>

      {/* MIRACL */}
      <Reveal delay={0.1}>
        <div className="mt-4">
          <TableCard
            title="Protocol A — In-batch Retrieval (MIRACL)"
            sub="acc@1 / MRR@10 per language"
            note={
              <>
                <strong className="text-neutral-900">AR is strong.</strong>{" "}
                mentee-v4 scores 0.825/0.874 on AR — close to pretrained
                mpnet-base (0.860/0.898) at 6.8× fewer parameters.
              </>
            }
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                  <th className="px-3 py-2 text-left">Model</th>
                  <th className="px-2 py-2 text-center">Init</th>
                  <th className="px-2 py-2 text-right">MIRACL-EN</th>
                  <th className="px-2 py-2 text-right">MIRACL-AR</th>
                  <th className="px-2 py-2 text-right">MIRACL-UR</th>
                </tr>
              </thead>
              <tbody>
                {v4MIRACL.map((r) => (
                  <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                    <ModelCell short={r.short} full={r.model} ours={r.ours} />
                    <td className="px-2 py-2 text-center"><InitBadge init={r.init} /></td>
                    <NumCell v={r.en} bold={r.ours} />
                    <NumCell v={r.ar} bold={r.ours} />
                    <NumCell v={r.ur} bold={r.ours} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      </Reveal>

      {/* MS-MARCO + STS side-by-side */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Reveal delay={0.14}>
          <TableCard
            title="Protocol C — MS-MARCO Corpus Retrieval"
            sub="10K passages · MRR@10 · R@5 · R@100"
            note={<><strong>0.706 MRR@10</strong> — up from v3&apos;s 0.592-era result, +19%.</>}
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
                {v4MSCMARCO.map((r) => (
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
            sub="Spearman ρ · zero-shot"
            note="0.725 ρ — improved over v3 (0.683) with retrieval-focused training."
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
                {v4Sts.map((r) => (
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

export function V4Speed() {
  return (
    <section id="v4-speed" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Speed & Efficiency"
        sub="Throughput and cost on RTX 5090 at batch size 128."
      />

      <Reveal delay={0.06}>
        <div className="mt-8">
          <TableCard
            title="Throughput & Cost"
            sub="sents/sec · latency (ms) · VRAM (MB) · cost per 1B sentences"
            note={
              <>
                <strong className="text-neutral-900">Fastest and cheapest.</strong>{" "}
                mentee-v4 at 18,115 sents/sec — 3.5× faster than mpnet-base
                (5,158) and $7.15 per 1B sentences.
              </>
            }
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                  <th className="px-3 py-2 text-left">Model</th>
                  <th className="px-2 py-2 text-right">Params</th>
                  <th className="px-2 py-2 text-right">sents/sec</th>
                  <th className="px-2 py-2 text-right">lat (ms)</th>
                  <th className="px-2 py-2 text-right">VRAM</th>
                  <th className="px-2 py-2 text-right">Cost</th>
                </tr>
              </thead>
              <tbody>
                {v4Speed.map((r) => (
                  <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                    <ModelCell short={r.short} full={r.model} ours={r.ours} />
                    <NumCell v={r.params} />
                    <NumCell v={r.bs128} bold={r.ours} />
                    <NumCell v={r.lat} />
                    <NumCell v={r.vram} />
                    <NumCell v={r.cost} bold={r.ours} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.07}>
        <SpeedBarsChart />
      </Reveal>

      <Reveal delay={0.08}>
        <EfficiencyScatterChart />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-4">
          <TableCard
            title="Efficiency Ratio"
            sub="Bench MRR@10 per 1M params · sents/sec per 1M params"
            note={
              <>
                <strong className="text-neutral-900">Best efficiency.</strong>{" "}
                0.525 bench MRR per 1M params — highest of any model. 441.82
                sents/sec throughput per 1M params.
              </>
            }
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                  <th className="px-3 py-2 text-left">Model</th>
                  <th className="px-2 py-2 text-right">Params</th>
                  <th className="px-2 py-2 text-right">Bench MRR/1M</th>
                  <th className="px-2 py-2 text-right">Sents/sec/1M</th>
                </tr>
              </thead>
              <tbody>
                {v4Efficiency.map((r) => (
                  <tr key={r.model} className={`border-b border-neutral-50 ${r.ours ? "bg-neutral-50/80" : ""}`}>
                    <ModelCell short={r.short} full={r.model} ours={r.ours} />
                    <NumCell v={r.params} />
                    <NumCell v={r.benchMrr} bold={r.ours} />
                    <NumCell v={r.sentsSec} bold={r.ours} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      </Reveal>
    </section>
  );
}

export function V4Strengths() {
  return (
    <section id="v4-strengths" className="mt-16 scroll-mt-24">
      <SectionHeading title="Strengths" />
      <StrengthList items={v4Strengths} />
    </section>
  );
}

export function V4Limitations() {
  return (
    <section id="v4-limitations" className="mt-16 scroll-mt-24">
      <SectionHeading title="Limitations" sub="We document what does not work alongside what does." />
      <LimitationList items={v4Limitations} />
    </section>
  );
}
