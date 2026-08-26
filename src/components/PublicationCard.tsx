"use client";

import { useState } from "react";

const BIBTEX_V1 = `@software{shah2026menteeembedv1,
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

const BIBTEX_V3 = `@misc{mentee-embed-v3-2026,
  title   = {mentee-embed-v3: Trilingual Text Embeddings Trained from Scratch},
  author  = {Syed Syab Ahmad Shah and Team MenteE AI},
  year    = {2026},
  url     = {https://huggingface.co/MenteEAI/mentee-embed-v3},
  note    = {Apache-2.0 License. DOI: 10.5281/zenodo.22117673}
}`;

const models = {
  v1: {
    label: "mentee-embed-v1",
    version: "v1.0.0",
    date: "24 Aug 2026",
    doi: "10.5281/zenodo.22087139",
    doiUrl: "https://doi.org/10.5281/zenodo.22087139",
    pdfUrl:
      "https://zenodo.org/records/22087139/files/mentee_embed__Training_Competitive_Multilingual_Text_Embeddings_from_Scratch_for_Arabic__English__and_Urdu.pdf",
    authors:
      "Shah, Syed Syab Ahmad · Sania, Shakeel · Hamza, Rustam · Mahboob, Khan — MenteE AI",
    title:
      "mentee-embed: Training Competitive Multilingual Text Embeddings from Scratch for Arabic, English, and Urdu",
    description:
      "41M-parameter trilingual embedding model trained entirely from scratch with a custom 50K BPE tokenizer — MLM followed by relational distillation from multilingual-e5-base. Avg MRR@10 0.585, beating all-MiniLM-L6-v2 (0.449) while remaining functional on all three languages.",
    bibtex: BIBTEX_V1,
  },
  v3: {
    label: "mentee-embed-v3",
    version: "v2.0.0",
    date: "26 Aug 2026",
    doi: "10.5281/zenodo.22117673",
    doiUrl: "https://doi.org/10.5281/zenodo.22117673",
    pdfUrl:
      "https://zenodo.org/records/22117673/files/mentee_embed__Training_Competitive_Multilingual_Text_Embeddings_from_Scratch_for_Arabic__English__and_Urdu.pdf",
    authors:
      "Shah, Syed Syab Ahmad · Sania, Shakeel · Hamza, Rustam · Mahboob, Iqbal — MenteE AI",
    title:
      "How Far Can Multilingual Text Embeddings Be Trained From Scratch? A Compute-Efficient Study of Arabic, English, and Urdu",
    description:
      "Three controlled experiments (v1–v3) using a 41M-parameter Transformer encoder trained from scratch on Arabic, English, and Urdu. v3 achieves Protocol A MRR@10 0.655 and Protocol C 0.645 with batch size 512 and 2.1M triplets including MS-MARCO retrieval data.",
    bibtex: BIBTEX_V3,
  },
};

export function PublicationCard({
  compact = false,
  version = "v3",
}: {
  compact?: boolean;
  version?: "v1" | "v3";
}) {
  const [copied, setCopied] = useState(false);
  const m = models[version];
  const copy = async () => {
    await navigator.clipboard.writeText(m.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm">
        <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">
          Preprint
        </span>
        <span className="font-medium text-neutral-900">{m.label}</span>
        <span className="text-neutral-500">
          · Zenodo · {m.date} · CC BY 4.0
        </span>
        <span className="ml-auto flex gap-2">
          <a
            href={m.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium hover:border-neutral-900 hover:text-black"
          >
            DOI
          </a>
          <a
            href={m.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium hover:border-neutral-900 hover:text-black"
          >
            PDF
          </a>
        </span>
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-white">
          Preprint · {m.version}
        </span>
        <span className="text-neutral-500">
          Zenodo · {m.date} · DOI {m.doi} · CC BY 4.0
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug text-neutral-900">
        {m.title}
      </h3>
      <p className="mt-2 text-sm text-neutral-600">{m.authors}</p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        {m.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={m.doiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          View on Zenodo
        </a>
        <a
          href={m.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black"
        >
          Download PDF
        </a>
        <a
          href="https://github.com/MenteE-s/mentee-embeddings"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black"
        >
          Code
        </a>
        <button
          onClick={copy}
          className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-900 hover:text-black"
        >
          {copied ? "Copied!" : "Copy BibTeX"}
        </button>
      </div>
      {version === "v1" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3 text-xs text-neutral-500">
          <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold text-white">
            v3
          </span>
          <span>
            Newer version available —{" "}
            <a
              href="https://doi.org/10.5281/zenodo.22117673"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
            >
              DOI 10.5281/zenodo.22117673
            </a>
          </span>
        </div>
      )}
      <details className="mt-5 min-w-0">
        <summary className="cursor-pointer text-sm font-medium text-neutral-700">
          Show BibTeX
        </summary>
        <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-neutral-900 p-4 text-xs leading-relaxed text-neutral-100">
          <code className="break-words">{m.bibtex}</code>
        </pre>
      </details>
    </div>
  );
}
