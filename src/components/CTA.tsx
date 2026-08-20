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
            Put intelligent automation to work.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-300">
            Tell us what you&apos;re trying to achieve - we&apos;ll show you what&apos;s
            possible.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-transform hover:scale-105"
            >
              Contact us
            </Link>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
