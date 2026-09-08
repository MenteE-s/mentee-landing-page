"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function RecruAIHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-neutral-900 px-6 pt-28 pb-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-300 backdrop-blur-sm">
              MenteE Product — Live
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            RecruAI — AI Hiring{" "}
            <span className="text-neutral-400">and Interview Platform</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg leading-relaxed text-neutral-300"
          >
            Built by MenteE for Pakistan and the Gulf. AI job matching,
            ATS-optimized CV rewrites, unlimited mock interviews, hiring
            pipeline automation, and AI screening agents — all in one platform.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-transform hover:scale-105"
            >
              Get in touch
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              See features
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: "AI Matching", v: "Semantic job matching against your skills, not keywords." },
            { label: "CV Optimizer", v: "AI rewrites, ATS scoring, keyword suggestions, resume builder." },
            { label: "Mock Interviews", v: "Unlimited practice with realistic AI questions and instant feedback." },
            { label: "Pipeline Auto", v: "Applied → screening → interview → offer → hired, fully tracked." },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <h3 className="text-sm font-bold text-white">{item.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">{item.v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
