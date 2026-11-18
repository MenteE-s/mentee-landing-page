import { Reveal } from "@/components/Reveal";
import Link from "next/link";

const highlights = [
  {
    n: "2.8% → 99.2%",
    l: "Routing gradient",
    d: "Deliberation rises from 2.8% of easy inputs to 99.7% of medium and 99.2% of hard, recovering the optimal policy at 98.7% routing accuracy.",
  },
  {
    n: "93.5% @ 67%",
    l: "Accuracy per compute",
    d: "Matches an always-deliberate model within 0.2 points while invoking the expensive pathway on only two-thirds of inputs.",
  },
  {
    n: "94.3% → 73.7%",
    l: "Memory ablation",
    d: "Remove the episodic novelty feature and accuracy collapses: without memory, the router sends hard inputs to the path that cannot fit them.",
  },
];

export function AcpTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
            New preprint
          </span>
          <span className="text-xs text-neutral-500">
            Zenodo · DOI 10.5281/zenodo.24353178 · Nov 2026
          </span>
        </div>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Think while you speak: a model that learns{" "}
          <span className="text-neutral-500">when</span> to think.
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-600">
          AI ships with a binary switch: reason on every input, or none. Our new
          preprint trains the switch instead. A fast linear path answers by
          default, a small episodic memory scores the input for novelty, and a
          deliberate pathway engages only when the answer needs a second look.
          Pure NumPy, CPU only, gradients verified by hand.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {highlights.map((h, i) => (
          <Reveal key={h.l} delay={0.06 + i * 0.06}>
            <div className="h-full rounded-2xl border border-neutral-100 p-6">
              <div className="text-2xl font-extrabold tracking-tight text-neutral-900">
                {h.n}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                {h.l}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{h.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/research?model=acp"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Read the research
          </Link>
          <a
            href="https://doi.org/10.5281/zenodo.24353178"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            Read the preprint
          </a>
          <a
            href="https://github.com/MenteE-s/adaptive-cognitive-processing"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            View on GitHub
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <Link
          href="/research?model=code3b"
          className="group mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm transition-colors hover:border-neutral-400"
        >
          <span className="rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
            Also new
          </span>
          <span className="font-medium text-neutral-900">MenteE Code 3B</span>
          <span className="text-neutral-500">
            · a coding model built from 53,567 execution-verified agent
            trajectories, trained for $0.13. HumanEval regression published on
            purpose, root cause and v2 fix included.
          </span>
          <span className="ml-auto font-medium text-neutral-900 underline-offset-4 group-hover:underline">
            Read the report →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
