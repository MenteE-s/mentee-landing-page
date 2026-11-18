"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import Link from "next/link";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="overflow-hidden rounded-3xl bg-neutral-900 px-8 py-16 text-center text-white"
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Research for humanity, published as we go.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-300">
            MenteE is an umbrella for research aimed at humanity — and the
            preprints, weights and code are already public, including the runs
            that collapsed. If you work in one of the fields we are heading
            toward, we would rather hear from you than about you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/research"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-transform hover:scale-105"
            >
              Read the research
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
