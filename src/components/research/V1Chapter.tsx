"use client";

import { Reveal, Figure, SectionHeading, StatGrid, StrengthList, LimitationList, TableCard, ModelCell, NumCell } from "./shared";
import { v1Stats, inbatchRows, corpusRows, v1Succeeded, v1Limitations } from "./data";

export function V1Approach() {
  return (
    <section id="v1-approach" className="mt-10 scroll-mt-24">
      <SectionHeading
        title="The Approach"
        sub={
          <>
            Training a competitive embedding model from random initialization is
            hard. We solved this with a{" "}
            <strong className="text-neutral-900">two-stage recipe</strong>:
          </>
        }
      />

      <Reveal delay={0.08}>
        <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6">
          <h3 className="text-base font-semibold text-neutral-900">
            Stage A — Masked Language Modeling (from scratch)
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            1.1M trilingual sentences, 50K BPE vocabulary trained from scratch,
            6,000 steps. No pretrained backbone involved.
          </p>
          <Figure src="/mlm_loss_curve.svg" alt="MLM loss curve" width={820} height={420} />
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-6">
          <h3 className="text-base font-semibold text-neutral-900">
            Stage B — Relational Knowledge Distillation
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            The MLM encoder is too weak to learn retrieval from sparse labels,
            so we <strong>distill</strong>{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              intfloat/multilingual-e5-base
            </code>{" "}
            (768-dim) as teacher. The student learns to reproduce the
            teacher&apos;s full batch similarity structure.
          </p>
          <p className="mt-3 text-center text-sm text-neutral-500">
            loss = rel_weight · MSE(C<sub>student</sub>, C<sub>teacher</sub>) +
            ce_weight · InfoNCE(anchor, positive)
          </p>
        </div>
      </Reveal>

      <StatGrid stats={v1Stats} />
    </section>
  );
}

export function V1ProtocolA() {
  return (
    <section id="v1-protocol-a" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Protocol A: In-batch retrieval"
        sub={
          <>
            Each query ranked against ~97 candidates in its batch.{" "}
            <strong className="text-neutral-900">acc@1</strong> = correct doc
            ranked first; <strong className="text-neutral-900">MRR@10</strong> =
            mean reciprocal rank in top-10.
          </>
        }
      />

      <Reveal delay={0.08}>
        <Figure src="/inbatch_acc1.svg" alt="In-batch acc@1 by dataset and model" />
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-6">
          <TableCard title="In-batch retrieval results">
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
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-4 rounded-xl border-l-4 border-green-500 bg-green-50 p-4 text-sm text-neutral-700">
          Our model <strong>dominates MiniLM-L6-v2</strong> across all five
          slices and wins on the validation and cross-lingual splits.
        </div>
      </Reveal>
    </section>
  );
}

export function V1ProtocolB() {
  return (
    <section id="v1-protocol-b" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Protocol B: Corpus-pool retrieval"
        sub="Full open-domain ranking over 15K docs per language — the hard test."
      />

      <Reveal delay={0.08}>
        <Figure src="/corpus_mrr10.svg" alt="Corpus-pool MRR@10" />
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-6">
          <TableCard title="Corpus-pool retrieval results">
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
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-4 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-neutral-700">
          Still, <strong>R@100 ≈ 0.47</strong> means the correct document
          appears in the top-100 roughly half the time — directly usable as a{" "}
          <strong>re-ranker</strong>.
        </div>
      </Reveal>
    </section>
  );
}

export function V1Efficiency() {
  return (
    <section id="v1-efficiency" className="mt-16 scroll-mt-24">
      <SectionHeading title="Efficiency" />
      <Reveal delay={0.08}>
        <Figure src="/efficiency_scatter.svg" alt="Parameters vs average MRR@10" width={760} />
        <p className="mt-4 text-neutral-600">
          At <strong className="text-neutral-900">41M parameters</strong> ~7×
          smaller than mpnet-base (278M), yet competitive in-batch retrieval —
          trained on a single free GPU session.
        </p>
      </Reveal>
    </section>
  );
}

export function V1Strengths() {
  return (
    <section id="v1-strengths" className="mt-16 scroll-mt-24">
      <SectionHeading title="Strengths" />
      <StrengthList items={v1Succeeded} />
    </section>
  );
}

export function V1Limitations() {
  return (
    <section id="v1-limitations" className="mt-16 scroll-mt-24">
      <SectionHeading title="Limitations" sub="We document what does not work alongside what does." />
      <LimitationList items={v1Limitations} />
    </section>
  );
}
