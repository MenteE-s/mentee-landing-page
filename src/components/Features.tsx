"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const features = [
  {
    t: "Curated mentors",
    d: "Every mentor is vetted for real-world experience, not just a profile.",
  },
  {
    t: "Flexible sessions",
    d: "Book by the hour, weekly, or as-needed. No long-term contracts.",
  },
  {
    t: "Progress tracking",
    d: "Set goals and watch them move with built-in check-ins and notes.",
  },
  {
    t: "Safe & private",
    d: "Encrypted calls and messages. Your conversations stay yours.",
  },
];

export function Features() {
  return (
    <section id="mentors" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Built for real momentum
        </h2>
        <p className="mt-3 max-w-xl text-neutral-600">
          The tools you need to make mentorship actually stick.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full rounded-2xl border border-neutral-100 p-6"
            >
              <h3 className="text-lg font-medium text-neutral-900">{f.t}</h3>
              <p className="mt-2 text-sm text-neutral-600">{f.d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
