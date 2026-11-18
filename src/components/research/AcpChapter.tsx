"use client";

import Image from "next/image";
import { Reveal, SectionHeading, StatGrid, StrengthList, LimitationList, TableCard, ModelCell, NumCell, PublicationCard } from "./shared";
import {
  acpStats,
  acpMainResults,
  acpDifficulty,
  acpAblation,
  acpComponents,
  acpStrengths,
  acpLimitations,
  acpRoadmap,
  acpReproCommands,
} from "./data";

export function AcpApproach() {
  return (
    <section id="acp-approach" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="The Architecture"
        sub={
          <>
            Two pathways and a monitor. The fast path answers by default; a
            small episodic memory decides when the answer deserves a second
            look. Implemented in pure NumPy, CPU only.
          </>
        }
      />

      <Reveal delay={0.08}>
        <div className="mt-8">
          <PublicationCard version="acp" />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-neutral-900">The four components</h3>
          </div>
          <div className="divide-y divide-neutral-100">
            {acpComponents.map((c) => (
              <div key={c.t} className="px-4 py-4">
                <h4 className="text-sm font-semibold text-neutral-900">{c.t}</h4>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-neutral-900">Training objective</h3>
          </div>
          <div className="px-4 py-4">
            <code className="block rounded-xl bg-neutral-900 px-4 py-3 text-xs leading-relaxed text-neutral-100">
              L = (y − y*)² + α · [−r log p − (1 − r) log(1 − p)] + λ · p · Cd
            </code>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Task loss plus routed cross-entropy plus a compute penalty. The
              routing term teaches the monitor which inputs need the deliberate
              path; the penalty keeps always-deliberate from being free. Gradients
              are hand-derived and checked against finite differences.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function AcpResults() {
  return (
    <section id="acp-results" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Results"
        sub="5,000 synthetic examples, three difficulty levels, 10 seeds. Task accuracy = |error| < 0.5. The hero summary below is generated straight from the evaluation JSON."
      />

      <Reveal delay={0.06}>
        <div className="mt-6">
          <StatGrid stats={acpStats} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <TableCard
            title="Main comparison — 10 seeds, mean ± std"
            note="Deliberation rate is the fraction of inputs routed to the expensive path. The ground-truth base rate is 66.7% (Medium + Hard)."
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 text-left">
                  <th className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">Model</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Accuracy</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Routing Acc.</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Delib. Rate</th>
                </tr>
              </thead>
              <tbody>
                {acpMainResults.map((r) => (
                  <tr key={r.short} className="border-b border-neutral-50 last:border-0">
                    <ModelCell short={r.short} full={r.model} ours={r.ours} />
                    <NumCell v={r.acc} bold={r.ours} />
                    <NumCell v={r.route} bold={r.ours} />
                    <NumCell v={r.delib} bold={r.ours} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-8">
          <Figure
            src="/research/acp-hero.png"
            alt="ACP summary: routing gradient, accuracy vs deliberation rate, memory ablation, and the capacity gap on hard inputs"
            width={1937}
            height={1515}
          />
        </div>
      </Reveal>
    </section>
  );
}

export function AcpRouting() {
  return (
    <section id="acp-routing" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Routing Gradient"
        sub="Per-difficulty accuracy and deliberation. The point of the architecture is this column split: almost never deliberate on Easy, almost always on Medium and Hard."
      />

      <Reveal delay={0.1}>
        <div className="mt-6">
          <TableCard
            title="Accuracy and deliberation by difficulty — mean across 10 seeds"
            note="The ground-truth policy deliberates on exactly 66.7% of inputs (Medium + Hard). ACP's 67.2% means it recovers the optimal policy almost exactly."
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 text-left">
                  <th className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">Model</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Easy Acc</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Med Acc</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Hard Acc</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Easy Delib</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Med Delib</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Hard Delib</th>
                </tr>
              </thead>
              <tbody>
                {acpDifficulty.map((r) => (
                  <tr key={r.short} className="border-b border-neutral-50 last:border-0">
                    <ModelCell short={r.short} full={r.model} ours={r.ours} />
                    <NumCell v={r.easy} bold={r.ours} />
                    <NumCell v={r.med} bold={r.ours} />
                    <NumCell v={r.hard} bold={r.ours} />
                    <NumCell v={r.eDelib} />
                    <NumCell v={r.mDelib} />
                    <NumCell v={r.hDelib} />
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

export function AcpAblation() {
  return (
    <section id="acp-ablation" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Memory Ablation"
        sub="Retrain the model with the novelty term removed, so the monitor sees only the raw input. This isolates what the episodic memory contributes."
      />

      <Reveal delay={0.1}>
        <div className="mt-6">
          <TableCard
            title="Routing ablation — 3 seeds, mean ± std"
            note="Without the novelty feature the monitor still deliberates on 66.2% of inputs overall, but sends 11.2% of Easy inputs and only 87.9% of Hard inputs to the deliberate path."
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 text-left">
                  <th className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">Monitor</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Accuracy</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Routing Acc.</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Delib. Rate</th>
                </tr>
              </thead>
              <tbody>
                {acpAblation.map((r) => (
                  <tr key={r.short} className="border-b border-neutral-50 last:border-0">
                    <ModelCell short={r.short} full={r.monitor} ours={r.ours} />
                    <NumCell v={r.acc} bold={r.ours} />
                    <NumCell v={r.route} bold={r.ours} />
                    <NumCell v={r.delib} bold={r.ours} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-8">
          <Figure
            src="/research/acp-ablation.png"
            alt="Ablation: accuracy with and without memory, and deliberation allocation by difficulty"
            width={1789}
            height={753}
          />
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="rounded-2xl border-l-4 border-green-400 bg-green-50/60 p-5">
          <h3 className="font-semibold text-neutral-900">The memory is not decorative</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            The x-only monitor routes at a similar overall rate but misallocates
            deliberation, and the misroutes land exactly where they cost the most:
            12% of Hard inputs go to a linear path that cannot fit them. That is a
            20.6-point accuracy collapse from one removed feature.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function AcpStrengths() {
  return (
    <section id="acp-strengths" className="mt-16 scroll-mt-24">
      <SectionHeading title="Strengths" />
      <StrengthList items={acpStrengths} />
    </section>
  );
}

export function AcpLimitations() {
  return (
    <section id="acp-limitations" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Limitations"
        sub="Stated in the preprint itself. These are the boundaries of the claim."
      />
      <LimitationList items={acpLimitations} />
    </section>
  );
}

export function AcpRoadmap() {
  return (
    <section id="acp-roadmap" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Roadmap"
        sub="Ordered by how much each step strengthens the central claim."
      />
      <StrengthList items={acpRoadmap} />
    </section>
  );
}

export function AcpReproduction() {
  return (
    <section id="acp-reproduction" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Reproduction"
        sub="Pure NumPy on CPU. No GPU, no training script longer than a hundred lines."
      />

      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://github.com/MenteE-s/adaptive-cognitive-processing"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Source on GitHub
          </a>
          <a
            href="https://doi.org/10.5281/zenodo.24353178"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            Preprint on Zenodo
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-neutral-900">Full pipeline</h3>
          </div>
          <div className="px-4 py-4">
            <pre className="overflow-x-auto rounded-xl bg-neutral-900 px-4 py-3 text-xs leading-relaxed text-neutral-100">
              {acpReproCommands.join("\n")}
            </pre>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">test_gradients.py</code>{" "}
              verifies every hand-derived gradient against finite differences
              before anything else runs. Every table on this page is generated
              from <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">evaluation_results.json</code>{" "}
              and <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">ablation_novelty.json</code>.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Figure({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
    </div>
  );
}
