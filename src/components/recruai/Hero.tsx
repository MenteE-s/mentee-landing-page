"use client";

import { motion, useReducedMotion } from "framer-motion";

export function RecruAIHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-neutral-900 px-6 pb-16 pt-28 text-white sm:pb-24 sm:pt-36">
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            World&apos;s Best AI Job Portal — Pakistan & Gulf Focused
          </span>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.5rem]"
        >
          Find Your Perfect Job
          <br />
          <span className="text-neutral-400">with AI Matching</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-300"
        >
          Pakistan&apos;s smartest job portal — now expanding across the Gulf (UAE, Saudi
          Arabia, Qatar, Kuwait, Oman, Bahrain) &amp; Asia. Discover jobs tailored to you,
          optimize your CV with AI, practice mock interviews, and get hired faster.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://recruai.menteeai.org/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-neutral-900 transition-transform hover:scale-[1.02]"
          >
            Find My Perfect Job
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Optimize My CV
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {["Pakistan", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-sm"
            >
              {c}
            </span>
          ))}
        </motion.div>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-widest text-neutral-500">
          Built for Pakistan — Expanding across the Gulf &amp; Asia • More countries &amp; languages coming soon
        </p>
        <p className="mt-2 text-[11px] font-medium text-neutral-400">
          English — Live &nbsp;•&nbsp; العربية — Coming soon &nbsp;•&nbsp; اردو — Coming soon
        </p>

        {/* Stats */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm sm:grid-cols-4"
        >
          {[
            { k: "25K+", v: "Jobs Listed" },
            { k: "40K+", v: "CVs Optimized" },
            { k: "500+", v: "Companies Hiring" },
            { k: "7+", v: "Countries Covered" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-3xl font-black tracking-tight text-white">{s.k}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-400">{s.v}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-neutral-400">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Free forever plan
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> 14-day premium trial
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> No credit card required
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}
