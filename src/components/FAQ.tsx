"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What is MenteE?",
    a: "MenteE is an umbrella for research aimed at humanity — not an AI company that happens to do research. We take on fields where the answer is not settled, build the smallest thing that can actually be checked, and publish the result with the method attached — parameters, benchmarks, hardware and failed runs included. What has come out of that so far: MenteE Embed (open multilingual embeddings), MenteE SWE (an autonomous software-engineering agent) and RecruAI (an AI hiring and interview platform).",
  },
  {
    q: "Is MenteE only an AI company?",
    a: "No — AI is the instrument, not the mission. The umbrella exists for research that helps people: reading unstructured information, moving it at scale, and surfacing the right decision at the right moment, in whatever field needs that. Language came first because roughly a billion people search in languages the field decided were edge cases; software engineering came next because it is where we can verify our own work; and learning, living systems, matter and medicine are the same approach applied to questions with longer proofs and more at stake.",
  },
  {
    q: "What is MenteE Embed?",
    a: "A compact multilingual text embedding model — ~41M parameters, trained from random initialization for Arabic, English and Urdu retrieval. 384-dimensional outputs, up to 512-token context, Apache 2.0 licensed. The current release is mentee-embed-v4, available on Hugging Face with the full technical report on our Research page.",
  },
  {
    q: "What is MenteE SWE?",
    a: "An autonomous software-engineering agent that lives in your terminal. You describe a task in plain English, and it explores your repo, edits files, verifies with your tests, and reports back with evidence. Model-agnostic — bring your own API key.",
  },
  {
    q: "What is RecruAI?",
    a: "An AI hiring and interview platform: semantic role matching, ATS-scored CV optimisation, unlimited mock interviews with instant feedback, and screening agents for organisation pipelines. It is live for Pakistan and expanding across the Gulf — UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman — with Arabic and Urdu interfaces in progress.",
  },
  {
    q: "Does MenteE take client work?",
    a: "No. We are a research organisation, not an agency or a consultancy. We build what we believe should exist, publish how we built it, and operate the result ourselves. We do not take briefs or build custom solutions to order.",
  },
  {
    q: "How do I install MenteE SWE?",
    a: "npm i -g @menteeai/menteeswe, then run mentee in your terminal. Configure a provider with mentee config. It requires Node 20 or later, though Node 22 is the supported target.",
  },
  {
    q: "Which models does MenteE SWE support?",
    a: "It is model-agnostic. v0.4.0 ships thirteen providers — Z.ai Coding is the default; OpenAI, Anthropic, Gemini, DeepSeek, Kimi, GLM, Qwen, OpenRouter and NVIDIA NIM are one -p flag away. Switch with a flag or inside the terminal UI.",
  },
  {
    q: "Is MenteE SWE safe to run?",
    a: "Yes. Read-only and diagnostic operations run automatically. Installs and git-history changes ask for approval. Destructive commands like rm -rf or sudo are blocked entirely. Deletion is never automatic — we return the commands for you to run yourself.",
  },
  {
    q: "Where can I find the Embed model?",
    a: "On Hugging Face under MenteEAI. The latest version is mentee-embed-v4 — 41M parameters, 384-dim output, and a 146% improvement over v3 on our custom trilingual benchmark, at 18,115 sentences per second on an RTX 5090.",
  },
  {
    q: "How do I get started?",
    a: "For MenteE Embed, visit the Research page or Hugging Face. For MenteE SWE, install via npm and run mentee config. For RecruAI, the platform is live at its own product page. And if you work in a field we are heading toward, the Contact page reaches the founding team directly.",
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
