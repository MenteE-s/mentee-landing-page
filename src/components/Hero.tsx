"use client";

import { motion, useReducedMotion } from "framer-motion";

const WORD = "MENTEE";
const COUNT = 100;
const MIDDLE = (COUNT - 1) / 2;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden bg-white px-6 pt-24">
      {/* white bg — black lines fade in, then curtain opens from center outward */}
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex"
        >
          {Array.from({ length: COUNT }, (_, i) => {
            const dist = Math.abs(MIDDLE - i);
            const normalizedDist = dist / MIDDLE;

            return (
              <motion.span
                key={i}
                className="h-full flex-1 bg-neutral-900"
                style={{ transformOrigin: "center" }}
                initial={{ scaleX: 0.7, opacity: 0 }}
                animate={{ scaleX: 0.7, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3,
                  delay: normalizedDist * 0.5,
                  ease: "easeInOut",
                  times: [0, 0.15, 0.6, 1],
                }}
              />
            );
          })}
        </div>
      )}

      {/* MENTEE */}
      <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-2">
        <h1
          aria-label={WORD}
          className="relative flex text-[3.25rem] font-black leading-none tracking-tight text-neutral-900 sm:text-8xl md:text-[10rem] lg:text-[12rem]"
        >
          {WORD.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={reduce ? false : { opacity: 0, scale: 1.5 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: reduce ? 0 : 1.8 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="absolute bottom-10 right-6 flex items-center gap-2 text-[12px] font-medium text-neutral-400"
      >
        <span>Scroll</span>
        <motion.svg
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
