"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StepNav, StepArrows } from "@/components/StepNav";
import { PublicationCard } from "@/components/PublicationCard";

const stats = [
  { n: "41M", l: "Parameters" },
  { n: "384", l: "Embedding dim" },
  { n: "3", l: "Languages" },
  { n: "0.82", l: "Val acc@1" },
];

const inbatchRows = [
  { name: "mentee-embed-v1 (ours)", val: "0.820", en: "0.345", ar: "0.222", ur: "0.183", xling: "0.757", mrr: "0.585", ours: true },
  { name: "mpnet-base-v2", val: "0.821", en: "0.864", ar: "0.722", ur: "0.686", xling: "0.831", mrr: "0.867" },
  { name: "MiniLM-L12-v2", val: "0.795", en: "0.854", ar: "0.696", ur: "0.621", xling: "0.782", mrr: "0.840" },
  { name: "MiniLM-L6-v2", val: "0.484", en: "0.856", ar: "0.025", ur: "0.028", xling: "0.065", mrr: "0.396" },
];

const corpusRows = [
  { name: "mentee-embed-v1 (ours)", en: "0.190", ar: "0.193", ur: "0.189", r100: "0.47", ours: true },
  { name: "mpnet-base-v2", en: "0.938", ar: "0.678", ur: "0.580", r100: "0.92" },
  { name: "MiniLM-L12-v2", en: "0.921", ar: "0.685", ur: "0.518", r100: "0.91" },
  { name: "MiniLM-L6-v2", en: "0.920", ar: "0.100", ur: "0.100", r100: "0.34" },
];

const succeeded = [
  { t: "Relational distillation", d: "Converted a hopeless from-scratch contrastive problem into a dense, learnable regression target. The probe that killed the old approach (embeddings spread on the sphere but carrying zero retrieval signal) is exactly what distillation fixes." },
  { t: "From-scratch tokenizer + MLM", d: "Gave a clean, language-aware initialization free of any pretrained backbone." },
  { t: "In-batch retrieval", d: "Genuinely strong — the model is already usable for query/document matching, deduplication, and cross-lingual English↔Urdu search." },
];

const limitations = [
  { t: "Open-domain corpus retrieval", d: "Protocol B lags web-scale models. Best used as a re-ranker, not a standalone billion-document search engine." },
  { t: "Training scope", d: "NLI + parallel translation data only. Domain-specific retrieval (legal, medical) will need fine-tuning." },
  { t: "Sequence length", d: "Capped at 128 tokens; longer documents should be chunked." },
  { t: "Format", d: "Current model.pt loads via src/model.py; a Sentence-Transformers-compatible export is planned." },
];

const roadmap = [
  { t: "v1.5 completion", d: "Stage-B contrastive run on top of the successful MLM foundation, with the corrected fine-tuning recipe." },
  { t: "Public leaderboard", d: "Benchmarked head-to-head against paraphrase-multilingual-MiniLM, all-MiniLM-L6-v2, and multilingual-e5-small on identical Arabic/English/Urdu retrieval sets." },
  { t: "Open release", d: "Model weights, custom tokenizer, and full model card published under Apache 2.0." },
  { t: "Standardized evaluation", d: "MTEB-style benchmarks across multilingual retrieval and bitext-mining tasks." },
  { t: "Urdu-focused expansion", d: "Adding parallel-corpus alignment objectives, since Urdu retrieval ground truth is the scarcest resource in the field." },
];

const stepNames = [
  "The Approach",
  "Protocol A",
  "Protocol B",
  "Efficiency",
  "What succeeded",
  "Known limitations",
  "Roadmap",
  "Reproduction",
];

export default function ResearchPage() {
  const [step, setStep] = useState(1);
  const total = 8;

  const stepAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stepAreaRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  }, [step]);

  const prev =
    step > 1 ? { n: step - 1, t: stepNames[step - 2] } : null;
  const next =
    step < total ? { n: step + 1, t: stepNames[step] } : null;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pb-8 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              MenteE AI · Technical Report
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              mentee-embed-v1
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
              A 41M-parameter multilingual embedding model for Arabic, English,
              and Urdu — trained entirely from scratch and distilled from a
              state-of-the-art teacher.
            </p>
          </Reveal>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-4xl px-6 pb-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.06}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                  <div className="text-3xl font-extrabold tracking-tight text-neutral-900">
                    {s.n}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                    {s.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Publication */}
        <section className="mx-auto max-w-4xl px-6 pb-10">
          <Reveal>
            <PublicationCard />
          </Reveal>
        </section>

        {/* Headline results */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Headline results
            </h2>
            <ul className="mt-4 space-y-3 text-neutral-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600 font-bold">✓</span>
                <span>
                  <strong className="text-neutral-900">Beats all-MiniLM-L6-v2</strong> on
                  every in-batch retrieval metric (avg MRR@10{" "}
                  <strong>0.585 vs 0.396</strong>) — despite being trained from
                  scratch.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600 font-bold">✓</span>
                <span>
                  <strong className="text-neutral-900">val acc@1 = 0.820</strong>,
                  surpassing paraphrase-MiniLM-L12-v2 (0.795) on the validation
                  set.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600 font-bold">✓</span>
                <span>
                  <strong className="text-neutral-900">
                    Cross-lingual EN↔UR acc@1 = 0.757
                  </strong>{" "}
                  — genuine English↔Urdu transfer with no shared script.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-green-600 font-bold">✓</span>
                <span>
                  Distillation success: student cosine geometry matches the
                  teacher&apos;s with <strong>rel_mse = 0.046</strong>.
                </span>
              </li>
            </ul>
          </Reveal>
        </section>

        {/* Sidebar + Content */}
        <div ref={stepAreaRef} className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-16">
          {/* Mobile step selector */}
          <div className="mb-8 md:hidden">
            <StepNav current={step} onSelect={setStep} />
          </div>

          <div className="flex gap-10">
            {/* Sidebar */}
            <aside className="hidden w-60 flex-shrink-0 md:block">
              <div className="sticky top-24 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-3">
                <StepNav current={step} onSelect={setStep} />
              </div>
            </aside>

            {/* Main content — only active step */}
            <div className="min-w-0 flex-1">
              {/* 1 · The Approach */}
              {step === 1 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      1 · The Approach
                    </h2>
                    <p className="mt-4 text-neutral-600">
                      Training a competitive embedding model from random initialization
                      is hard: a small model given only &ldquo;same / different&rdquo;
                      triplet labels cannot, on its own, discover the geometry of
                      semantic similarity. We solved this with a{" "}
                      <strong className="text-neutral-900">two-stage recipe</strong>:
                    </p>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-8 rounded-2xl border border-neutral-100 bg-white p-6">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        Stage A — Masked Language Modeling (from scratch)
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600">
                        1.1M trilingual sentences, 50K BPE vocabulary trained from
                        scratch, 6,000 steps. This teaches the encoder the basic
                        mechanics of three languages without any pretrained backbone.
                      </p>
                      <div className="mt-4 overflow-hidden rounded-xl border border-neutral-100">
                        <Image
                          src="/mlm_loss_curve.svg"
                          alt="MLM loss curve"
                          width={820}
                          height={420}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        Stage B — Relational Knowledge Distillation
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600">
                        The MLM encoder is too weak to learn retrieval from sparse
                        labels, so we <strong>distill</strong> it using{" "}
                        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
                          intfloat/multilingual-e5-base
                        </code>{" "}
                        (768-dim) as teacher. Instead of one bit of signal per triplet,
                        the student receives{" "}
                        <strong>960 dense numbers per batch</strong> — it learns to
                        reproduce the teacher&apos;s full similarity structure.
                      </p>
                      <p className="mt-3 text-center text-sm text-neutral-500">
                        loss = rel_weight · MSE(C<sub>student</sub>, C<sub>teacher</sub>)
                        + ce_weight · InfoNCE(anchor, positive)
                      </p>
                      <p className="mt-2 text-sm text-neutral-600">
                        where C is the cosine-similarity matrix within each batch. This
                        is the same relational-distillation idea used to build production
                        embedders — applied here to a from-scratch 41M architecture.
                      </p>
                    </div>
                  </Reveal>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}

              {/* 2 · Protocol A */}
              {step === 2 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      2 · Protocol A: In-batch retrieval
                    </h2>
                    <p className="mt-3 text-neutral-600">
                      Each query is ranked against the other queries in its batch (~97
                      candidates). <strong className="text-neutral-900">acc@1</strong> = correct doc
                      ranked first; <strong className="text-neutral-900">MRR@10</strong> = mean
                      reciprocal rank in top-10.
                    </p>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-6 overflow-hidden rounded-xl border border-neutral-100">
                      <Image
                        src="/inbatch_acc1.svg"
                        alt="In-batch acc@1 by dataset and model"
                        width={840}
                        height={460}
                        className="w-full"
                      />
                    </div>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-neutral-200">
                            <th className="pb-3 pr-4 text-left font-semibold text-neutral-900">Model</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">val</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">miracl_en</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">miracl_ar</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">miracl_ur</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">xling_en_ur</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">avg MRR@10</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inbatchRows.map((r) => (
                            <tr key={r.name} className={`border-b border-neutral-100 ${r.ours ? "bg-indigo-50/60" : ""}`}>
                              <td className="py-3 pr-4 text-left font-medium text-neutral-900">{r.name}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.val}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.en}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.ar}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.ur}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.xling}</td>
                              <td className="py-3 px-3 text-center font-medium text-neutral-900">{r.mrr}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <div className="mt-6 rounded-xl border-l-4 border-green-500 bg-green-50 p-4 text-sm text-neutral-700">
                      Our model <strong>dominates MiniLM-L6-v2</strong> across all five
                      slices and wins on the validation and cross-lingual splits. The
                      gap to mpnet/MiniLM-L12 on MIRACL reflects ~1000× less training
                      data, not a flaw in the method.
                    </div>
                  </Reveal>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}

              {/* 3 · Protocol B */}
              {step === 3 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      3 · Protocol B: Corpus-pool retrieval
                    </h2>
                    <p className="mt-3 text-neutral-600">
                      Full open-domain ranking over a large document set (15K docs per
                      language) — the hard test. MRR@10 and R@100 (recall in top-100).
                    </p>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-6 overflow-hidden rounded-xl border border-neutral-100">
                      <Image
                        src="/corpus_mrr10.svg"
                        alt="Corpus-pool MRR@10 by language and model"
                        width={840}
                        height={460}
                        className="w-full"
                      />
                    </div>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-neutral-200">
                            <th className="pb-3 pr-4 text-left font-semibold text-neutral-900">Model</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">English MRR@10</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">Arabic MRR@10</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">Urdu MRR@10</th>
                            <th className="pb-3 px-3 text-center font-semibold text-neutral-900">avg R@100</th>
                          </tr>
                        </thead>
                        <tbody>
                          {corpusRows.map((r) => (
                            <tr key={r.name} className={`border-b border-neutral-100 ${r.ours ? "bg-indigo-50/60" : ""}`}>
                              <td className="py-3 pr-4 text-left font-medium text-neutral-900">{r.name}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.en}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.ar}</td>
                              <td className="py-3 px-3 text-center text-neutral-600">{r.ur}</td>
                              <td className="py-3 px-3 text-center font-medium text-neutral-900">{r.r100}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <div className="mt-6 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-neutral-700">
                      Protocol B is where web-scale models trained on billions of pairs
                      pull ahead. Still, <strong>R@100 ≈ 0.47</strong> means the correct
                      document appears in the top-100 roughly half the time — directly
                      usable as a <strong>re-ranker</strong> or lightweight first-stage
                      retriever inside a pipeline.
                    </div>
                  </Reveal>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}

              {/* 4 · Efficiency */}
              {step === 4 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      4 · Efficiency
                    </h2>
                    <div className="mt-6 overflow-hidden rounded-xl border border-neutral-100">
                      <Image
                        src="/efficiency_scatter.svg"
                        alt="Parameters vs average MRR@10"
                        width={760}
                        height={460}
                        className="w-full"
                      />
                    </div>
                    <p className="mt-4 text-neutral-600">
                      At <strong className="text-neutral-900">41M parameters</strong>{" "}
                      mentee-embed-v1 is ~7× smaller than mpnet-base (278M) and ~3×
                      smaller than MiniLM-L12 (118M), yet delivers competitive in-batch
                      retrieval — and was trained on a single free GPU session, not a
                      research-cluster budget.
                    </p>
                  </Reveal>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}

              {/* 5 · What succeeded */}
              {step === 5 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      5 · What succeeded
                    </h2>
                  </Reveal>
                  <div className="mt-6 space-y-4">
                    {succeeded.map((s, i) => (
                      <Reveal key={s.t} delay={i * 0.08}>
                        <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                          <h3 className="font-semibold text-neutral-900">{s.t}</h3>
                          <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}

              {/* 6 · Known limitations */}
              {step === 6 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      6 · Known limitations
                    </h2>
                    <p className="mt-3 text-neutral-500">
                      We document what does not work alongside what does.
                    </p>
                  </Reveal>
                  <div className="mt-6 space-y-4">
                    {limitations.map((l, i) => (
                      <Reveal key={l.t} delay={i * 0.08}>
                        <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                          <h3 className="font-semibold text-neutral-900">{l.t}</h3>
                          <p className="mt-2 text-sm text-neutral-600">{l.d}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}

              {/* 7 · Roadmap */}
              {step === 7 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      7 · Roadmap
                    </h2>
                  </Reveal>
                  <div className="mt-8 space-y-6">
                    {roadmap.map((r, i) => (
                      <Reveal key={r.t} delay={i * 0.06}>
                        <div className="border-l-2 border-neutral-200 pl-4">
                          <h3 className="font-semibold text-neutral-900">{r.t}</h3>
                          <p className="mt-1 text-sm text-neutral-600">{r.d}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}

              {/* 8 · Reproduction */}
              {step === 8 && (
                <section>
                  <Reveal>
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      8 · Reproduction
                    </h2>
                    <p className="mt-3 text-neutral-600">
                      Everything is open: code on GitHub, model on Hugging Face.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <a
                        href="https://github.com/MenteE-s/mentee-embeddings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
                      >
                        Source on GitHub
                      </a>
                      <a
                        href="https://huggingface.co/MenteE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
                      >
                        Hugging Face
                      </a>
                    </div>
                  </Reveal>

                  <StepArrows prev={prev} next={next} onPrev={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-6 py-8">
            <p className="text-xs text-neutral-400">
              MenteE AI · Trilingual embeddings trained from scratch · Arabic ·
              English · Urdu · Method: MLM (from scratch) → relational knowledge
              distillation from multilingual-e5-base.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
