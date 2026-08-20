"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const capabilities = [
  {
    t: "Workflow automation",
    d: "Offload repetitive, multi-step processes so your team can focus on judgment and creativity.",
  },
  {
    t: "Data intelligence",
    d: "Turn scattered data into clear, timely insight that supports better decisions.",
  },
  {
    t: "Decision support",
    d: "Surface recommendations and context where choices are made, not after the fact.",
  },
  {
    t: "Knowledge processing",
    d: "Read, summarize, and structure documents and unstructured information at scale.",
  },
  {
    t: "System integration",
    d: "Connect intelligently across the tools and platforms your organization already uses.",
  },
  {
    t: "Operational efficiency",
    d: "Reduce manual effort and latency across the workflows that run your business.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Capabilities, generalized
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          MenteE applies intelligent automation across a wide range of uses —
          here are a few of the ways teams put it to work.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full rounded-2xl border border-neutral-100 p-6"
            >
              <h3 className="text-lg font-medium text-neutral-900">{c.t}</h3>
              <p className="mt-2 text-sm text-neutral-600">{c.d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
