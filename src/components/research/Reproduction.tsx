"use client";

import { Reveal, SectionHeading } from "./shared";

export function Reproduction() {
  return (
    <section id="reproduction" className="mt-16 scroll-mt-24">
      <SectionHeading
        title="Reproduction"
        sub="Everything is open: code on GitHub, models on Hugging Face."
      />

      <Reveal delay={0.08}>
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
            href="https://huggingface.co/MenteEAI/mentee-embed-v4"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            v4 on Hugging Face
          </a>
          <a
            href="https://huggingface.co/MenteEAI/mentee-embed-v3"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            v3 on Hugging Face
          </a>
          <a
            href="https://huggingface.co/MenteEAI/mentee-embed-v1"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
          >
            v1 on Hugging Face
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold text-neutral-900">Full benchmark report (v4)</h3>
            <p className="mt-2 text-sm text-neutral-600">
              All four v4 tables with every metric, per-domain results, and raw
              JSON — generated 2026-08-28 on RTX 5090.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://github.com/MenteE-s/mentee-embeddings/blob/v4-larger-dataset/benchmarks/v4_report.md"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black"
              >
                v4 report (markdown)
              </a>
              <a
                href="https://github.com/MenteE-s/mentee-embeddings/blob/v4-larger-dataset/benchmarks/v4_results.json"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black"
              >
                Raw results (JSON)
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold text-neutral-900">Quick start (v4)</h3>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs leading-relaxed text-neutral-100">
              <code>{`from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v4", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v4",   trust_remote_code=True)

embeddings = model.encode(["Hello world", "مرحبا بالعالم"], tokenizer=tok)
# torch.Size([2, 384])`}</code>
            </pre>
            <p className="mt-3 text-xs text-neutral-500">
              The full training pipeline reproduces on a single GPU with 24GB+
              VRAM. Benchmark scripts are in the repo under{" "}
              <code className="rounded bg-neutral-100 px-1 py-0.5">benchmarks/</code>.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
