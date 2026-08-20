"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What does MenteE do?",
    a: "MenteE builds and deploys AI-powered platforms — products designed for real-world use at scale. We do not consult; we ship.",
  },
  {
    q: "What kind of platforms does MenteE build?",
    a: "We focus on AI-driven platforms that automate complex workflows, process data at scale, and support better decision-making. Our products serve businesses and individuals across multiple industries.",
  },
  {
    q: "Is MenteE an agency?",
    a: "No. We are a product company. We build, deploy, and operate our own platforms — we do not take client briefs or build custom solutions to order.",
  },
  {
    q: "How do I use MenteE's products?",
    a: "Our platforms are built to be deployed and used directly. Reach out through our contact page and we will walk you through what is available.",
  },
  {
    q: "Is MenteE suitable for both small teams and large enterprises?",
    a: "Yes. Our platforms are designed to scale — from focused team-level use to organization-wide deployments.",
  },
  {
    q: "How do we get started?",
    a: "Get in touch through our contact page. We will show you what we have built and how it fits your needs.",
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
