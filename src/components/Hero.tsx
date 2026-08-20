"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const WORD = "MENTEE";
const LINES = Array.from({ length: 100 }, (_, i) => i);
const MIDDLE = (LINES.length - 1) / 2;
const STEP = 5; // px each line moves toward center to land within MENTEE's width

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden bg-white px-6 pb-20 pt-24 text-neutral-900">
      {/* full-hero line field: 100 vertical "screens" that thin, converge to MENTEE's width, then fade */}
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex"
        >
          {LINES.map((i) => {
            const offset = (MIDDLE - i) * STEP;
            return (
              <motion.span
                key={i}
                className="h-full flex-1 bg-neutral-900"
                style={{ transformOrigin: "center" }}
                initial={{ scaleX: 1, x: 0, opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scaleX: [1, 1, 0.15, 0.04],
                  x: [0, 0, offset, offset],
                }}
                transition={{
                  duration: 3.4,
                  ease: "easeInOut",
                  times: [0, 0.15, 0.6, 1],
                }}
              />
            );
          })}
        </div>
      )}

      {/* MENTEE wordmark */}
      <div className="relative flex min-h-[50vh] items-center justify-center">
        <h1
          aria-label={WORD}
          className="relative flex text-7xl font-black leading-none tracking-tight sm:text-8xl md:text-9xl lg:text-[10rem]"
        >
          {WORD.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block text-neutral-900"
              initial={reduce ? false : { opacity: 0, scale: 1.5 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : 2.6 + i * 0.07,
                ease: "easeOut",
              }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* revealed content */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reduce ? 0 : 3.8, ease: "easeOut" }}
        className="relative mx-auto mt-10 max-w-3xl text-center"
      >
        <span className="inline-block rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
          AI-powered automation, built for the real world
        </span>
        <p className="mt-6 text-lg text-neutral-600">
          MenteE builds practical, production-ready AI that automates complex
          workflows, turns data into clear decisions, and helps teams move with
          confidence.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Talk to our team
          </Link>
          <Link
            href="/#approach"
            className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            How it works
          </Link>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Production-ready", v: "systems built to last" },
            { k: "Data-first", v: "decisions you can trust" },
            { k: "Built to scale", v: "from team to enterprise" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6"
            >
              <p className="text-xl font-semibold text-neutral-900">{s.k}</p>
              <p className="mt-1 text-sm text-neutral-500">{s.v}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
