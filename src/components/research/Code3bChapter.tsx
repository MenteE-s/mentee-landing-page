"use client";

import Image from "next/image";
import { Reveal, SectionHeading, StatGrid, StrengthList, LimitationList, TableCard, ModelCell, NumCell, PublicationCard } from "./shared";
import {
  code3bStats,
  code3bTraining,
  code3bDataSources,
  code3bEval,
  code3bStrengths,
  code3bLimitations,
  code3bRoadmap,
} from "./data";

export function Code3bThesis() {
  return (
    <section id="code3b-thesis" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="The Thesis"
        sub={
          <>
            The moat behind MenteE Code is not the base model. Everyone can
            rent the same open weights. The moat is our own
            execution-verified agent trajectory dataset, and the model is the
            proof that the flywheel runs end to end.
          </>
        }
      />

      <Reveal delay={0.08}>
        <div className="mt-8">
          <PublicationCard version="code3b" />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-neutral-600">
          <p>
            <strong className="text-neutral-900">MenteE Code 3B v1</strong> is a
            LoRA fine-tune of Qwen2.5-Coder-3B-Instruct (Apache-2.0), merged
            into a standalone model and trained to behave as MenteE Code
            inside a terminal agent: investigate, edit, run tests, recover,
            report honestly.
          </p>
          <p>
            This chapter is a <strong className="text-neutral-900">technical report</strong>{" "}
            on a measured run, not a peer-reviewed paper. We publish the
            training numbers, the benchmark, and the regression — including
            the root cause we found and the fix we defined for v2.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function Code3bData() {
  return (
    <section id="code3b-data" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="The Data"
        sub="53,567 schema-validated agent trajectories, deduplicated from 78,212 collected runs. The append-only collector validates every row against a canonical JSON Schema before it lands."
      />

      <Reveal delay={0.1}>
        <div className="mt-6">
          <TableCard
            title="Trajectory sources"
            note="External subsets are filtered and schema-validated; the MenteE collector adds execution-verified runs of our own."
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 text-left">
                  <th className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">Source</th>
                  <th className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">Language</th>
                  <th className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">Type</th>
                </tr>
              </thead>
              <tbody>
                {code3bDataSources.map((r) => (
                  <tr key={r.src} className="border-b border-neutral-50 last:border-0">
                    <ModelCell short={r.src} full={r.src} ours={r.src === "MenteE collector"} />
                    <NumCell v={r.lang} />
                    <NumCell v={r.type} />
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

export function Code3bTraining() {
  return (
    <section id="code3b-training" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Training"
        sub="One consumer GPU, one evening, thirteen cents. Every number below comes from the logged run."
      />

      <Reveal delay={0.06}>
        <div className="mt-6">
          <StatGrid stats={code3bStats} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-neutral-900">Run configuration — all measured</h3>
          </div>
          <div className="divide-y divide-neutral-100">
            {code3bTraining.map((r) => (
              <div key={r.k} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                <div className="text-xs font-medium uppercase tracking-wide text-neutral-400">{r.k}</div>
                <div className="text-sm text-neutral-700">{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-8">
          <Figure
            src="/research/code3b-loss.png"
            alt="Training loss curve for MenteE Code 3B v1, falling from 1.62 to 0.317 over 1,250 steps"
            width={1200}
            height={750}
          />
        </div>
      </Reveal>
    </section>
  );
}

export function Code3bEval() {
  return (
    <section id="code3b-eval" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Evaluation"
        sub="HumanEval pass@1, greedy decoding, 50 problems. Both models on identical hardware with an identical harness, generated code executed against the official unit tests."
      />

      <Reveal delay={0.1}>
        <div className="mt-6">
          <TableCard
            title="HumanEval pass@1 — base vs MenteE Code v1"
            note="50-problem subset, ~±14 pt margin. Directional, not leaderboard-grade. We publish this gap on purpose."
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 text-left">
                  <th className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-400">Model</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">Passed</th>
                  <th className="px-2 py-2 text-right text-xs font-medium uppercase tracking-wide text-neutral-400">pass@1</th>
                </tr>
              </thead>
              <tbody>
                {code3bEval.map((r) => (
                  <tr key={r.short} className="border-b border-neutral-50 last:border-0">
                    <ModelCell short={r.short} full={r.model} ours={r.ours} />
                    <NumCell v={r.passed} bold={r.ours} />
                    <NumCell v={r.pass1} bold={r.ours} />
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
            src="/research/code3b-humaneval.png"
            alt="HumanEval pass@1 comparison: base Qwen2.5-Coder-3B-Instruct at 94% vs MenteE Code 3B v1 at 50%"
            width={1050}
            height={750}
          />
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/60 p-5">
          <h3 className="font-semibold text-neutral-900">We publish this gap on purpose</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            24 of the 25 v1 failures share one artifact: systematically doubled
            closing brackets. The cause is the v1 loss recipe — loss applied to
            all trajectory roles, including noisy tool outputs — so the model
            learned to imitate tool noise, not just assistant code. It is a
            data-recipe issue, not a capability ceiling, and the v2 recipe
            (assistant-only loss, identity oversampling, LoRA r=16) targets it
            directly.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function Code3bStrengths() {
  return (
    <section id="code3b-strengths" className="mt-16 scroll-mt-24">
      <SectionHeading title="Strengths" />
      <StrengthList items={code3bStrengths} />
    </section>
  );
}

export function Code3bLimitations() {
  return (
    <section id="code3b-limitations" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Limitations"
        sub="Stated here because a model page without its regression is marketing, not research."
      />
      <LimitationList items={code3bLimitations} />
    </section>
  );
}

export function Code3bRoadmap() {
  return (
    <section id="code3b-roadmap" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Roadmap"
        sub="The v2 recipe is defined, measured, and cheap: the same run costs about thirteen cents."
      />
      <StrengthList items={code3bRoadmap} />
    </section>
  );
}

export function Code3bWeights() {
  return (
    <section id="code3b-weights" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Weights & Usage"
        sub="Merged standalone weights, Apache-2.0, served over an OpenAI-compatible API or run locally."
      />

      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://huggingface.co/MenteEAI/MenteE-Code-3B"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Model on Hugging Face
          </a>
          <a
            href="https://huggingface.co/MenteEAI/MenteE-Code-3B-GGUF"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            GGUF builds
          </a>
          <a
            href="https://github.com/MenteE-s/MenteE-Code-3b"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            Source on GitHub
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-neutral-900">Quick start — transformers</h3>
          </div>
          <div className="px-4 py-4">
            <pre className="overflow-x-auto rounded-xl bg-neutral-900 px-4 py-3 text-xs leading-relaxed text-neutral-100">
              {`from transformers import AutoModelForCausalLM, AutoTokenizer

t = AutoTokenizer.from_pretrained("MenteEAI/MenteE-Code-3B")
m = AutoModelForCausalLM.from_pretrained("MenteEAI/MenteE-Code-3B", device_map="auto")
msgs = [{"role": "user", "content": "Write a Python function to reverse a linked list."}]
prompt = t.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True)
enc = t(prompt, return_tensors="pt").to(m.device)
out = m.generate(**enc, max_new_tokens=512)
print(t.decode(out[0][enc["input_ids"].shape[1]:], skip_special_tokens=True))`}
            </pre>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              GGUF builds run in Ollama and llama.cpp. The chat template injects
              the MenteE identity by default, so every client presents the model
              correctly.
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
