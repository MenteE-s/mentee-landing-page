"use client";

import { useState } from "react";

const BIBTEX = `@software{shah2026menteeembed,
  title = {mentee-embed: Training Competitive
    Multilingual Text Embeddings from Scratch
    for Arabic, English, and Urdu},
  author = {Shah, Syed Syab Ahmad and
    Sania, Shakeel and Hamza, Rustam and
    Mahboob, Khan},
  year = {2026},
  publisher = {Zenodo},
  version = {v1.0.0},
  doi = {10.5281/zenodo.22087139},
  url = {https://doi.org/10.5281/zenodo.22087139}
}`;

export function PublicationCard({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(BIBTEX);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm">
        <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">Preprint</span>
        <span className="font-medium text-neutral-900">mentee-embed-v1</span>
        <span className="text-neutral-500">· Zenodo · 24 Aug 2026 · CC BY 4.0</span>
        <span className="ml-auto flex gap-2">
          <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium hover:border-neutral-900 hover:text-black">DOI</a>
          <a href="https://zenodo.org/records/22087139/files/mentee_embed__Training_Competitive_Multilingual_Text_Embeddings_from_Scratch_for_Arabic__English__and_Urdu.pdf" target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium hover:border-neutral-900 hover:text-black">PDF</a>
        </span>
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-white">Preprint · v1.0.0</span>
        <span className="text-neutral-500">Zenodo · 24 Aug 2026 · DOI 10.5281/zenodo.22087139 · CC BY 4.0</span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug text-neutral-900">
        mentee-embed: Training Competitive Multilingual Text Embeddings from Scratch for Arabic, English, and Urdu
      </h3>
      <p className="mt-2 text-sm text-neutral-600">
        Shah, Syed Syab Ahmad · Sania, Shakeel · Hamza, Rustam · Mahboob, Khan — MenteE AI
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        41M-parameter trilingual embedding model trained entirely from scratch with a custom 50K BPE tokenizer — MLM followed by relational distillation from multilingual-e5-base. Avg MRR@10 0.585, beating all-MiniLM-L6-v2 (0.396) while remaining functional on all three languages.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener noreferrer" className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white">View on Zenodo</a>
        <a href="https://zenodo.org/records/22087139/files/mentee_embed__Training_Competitive_Multilingual_Text_Embeddings_from_Scratch_for_Arabic__English__and_Urdu.pdf" target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black">Download PDF</a>
        <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black">Code</a>
        <button onClick={copy} className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black">
          {copied ? "Copied!" : "Copy BibTeX"}
        </button>
      </div>
      <details className="mt-5 min-w-0">
        <summary className="cursor-pointer text-sm font-medium text-neutral-700">Show BibTeX</summary>
        <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-neutral-900 p-4 text-xs leading-relaxed text-neutral-100"><code className="break-words">{BIBTEX}</code></pre>
      </details>
    </div>
  );
}
