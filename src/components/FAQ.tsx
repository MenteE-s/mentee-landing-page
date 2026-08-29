"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What is MenteE?",
    a: "MenteE is a product company. We build and ship AI-powered platforms — not custom solutions. Our two products are MenteE Embed (multilingual text embeddings) and MenteE SWE (autonomous software engineering agent).",
  },
  {
    q: "What is MenteE Embed?",
    a: "A compact multilingual text embedding model — ~41M parameters, trained from scratch for Arabic, English, and Urdu retrieval. 384-dimensional outputs, up to 512-token context, Apache 2.0 licensed. Available on Hugging Face.",
  },
  {
    q: "What is MenteE SWE?",
    a: "An autonomous software-engineering agent that lives in your terminal. You describe a task in plain English, and it explores your repo, edits files, verifies with your tests, and reports back with evidence. Model-agnostic — bring your own API key.",
  },
  {
    q: "Is MenteE an agency?",
    a: "No. We are a product company. We build, deploy, and operate our own platforms — we do not take client briefs or build custom solutions to order.",
  },
  {
    q: "How do I install MenteE SWE?",
    a: "npm i -g @menteeai/menteeswe, then run mentee in your terminal. Configure a provider with mentee config. It requires Node 20 or later.",
  },
  {
    q: "Which models does MenteE SWE support?",
    a: "It is model-agnostic. Supported providers include Z.ai Coding (default), Z.ai GLM, Kimi Moonshot, and GLM Zhipu. Switch providers with a flag or inside the terminal UI.",
  },
  {
    q: "Is MenteE SWE safe to run?",
    a: "Yes. Read-only and diagnostic operations run automatically. Installs and git-history changes ask for approval. Destructive commands like rm -rf or sudo are blocked entirely. Deletion is never automatic.",
  },
  {
    q: "Where can I find the Embed model?",
    a: "On Hugging Face under MenteEAI. The latest version is mentee-embed-v4 with 41M parameters, 384-dim output, and a 146% improvement on our custom trilingual benchmark over v3.",
  },
  {
    q: "How do I get started?",
    a: "For MenteE Embed, visit the Research page or Hugging Face. For MenteE SWE, install via npm and run mentee config. For general inquiries, reach out through our Contact page.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-neutral-100 bg-neutral-50"
    >
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-neutral-600">
            The essentials, without the jargon.
          </p>
        </Reveal>
        <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-neutral-900">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl leading-none text-neutral-400"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-neutral-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
