"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What does MenteE do?",
    a: "MenteE builds intelligent, production-ready AI systems that automate complex workflows, improve how teams use data, and support better day-to-day decision-making.",
  },
  {
    q: "How does MenteE keep our data secure?",
    a: "Security and reliability are designed in from the start. We follow responsible-data practices and work with organizations to meet their compliance and governance requirements.",
  },
  {
    q: "Can MenteE work with our existing tools?",
    a: "Yes. Our solutions are built to integrate with the platforms and systems your teams already rely on, so automation fits naturally into existing workflows.",
  },
  {
    q: "Is MenteE suitable for both small teams and large enterprises?",
    a: "Absolutely. Our systems are designed to scale — from focused team-level automations to organization-wide deployments.",
  },
  {
    q: "How do we get started?",
    a: "Reach out through our contact page. We'll learn about your goals and outline how intelligent automation could fit your needs.",
  },
  {
    q: "Do you build custom solutions?",
    a: "We tailor our approach to each organization's workflows and objectives, focusing on practical outcomes rather than one-size-fits-all tooling.",
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
