"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const capabilities = [
  {
    t: "Intelligent automation",
    d: "Platforms that handle complex, multi-step workflows end-to-end — reducing manual effort and eliminating bottlenecks.",
  },
  {
    t: "Data at scale",
    d: "Systems built to ingest, process, and surface insights from massive, heterogeneous datasets in real time.",
  },
  {
    t: "Decision engines",
    d: "AI that surfaces the right information at the right moment — powering faster, better-informed decisions.",
  },
  {
    t: "Document processing",
    d: "Read, classify, extract, and route unstructured information automatically — at a volume no team could match manually.",
  },
  {
    t: "Seamless integration",
    d: "Platforms designed to connect with the tools and systems organizations already rely on — no rip-and-replace.",
  },
  {
    t: "Built for uptime",
    d: "Every system is engineered for reliability — monitoring, alerting, and failover from the start.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
          What the MenteE team is busy with
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          AI-powered platforms designed for real-world use — engineered for
          scale, deployed for impact. Here is what we are actively building.
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
