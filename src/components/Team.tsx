"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const team = [
  {
    index: "01",
    name: "Syed Syab Ahmad Shah",
    role: "Founder & Lead Engineer",
    email: "syab@menteeai.org",
    links: [
      { label: "Portfolio", href: "https://syab.tech" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/syedsyab/" },
    ],
    line: "Turns research into systems that survive production.",
    body: "Owns product direction and system architecture at MenteE. Trained the mentee-embed series from random initialization on a single GPU, published the research openly, and turns it into the agents and products we ship.",
    proof: [
      { k: "5", v: "Publications" },
      { k: "41M", v: "Params, from scratch" },
      { k: "Zenodo", v: "Open research" },
    ],
  },
  {
    index: "02",
    name: "Sania Shakeel",
    role: "Co-Founder & Data Scientist",
    email: "sania@menteeai.org",
    links: [
      { label: "Portfolio", href: "https://saniaa.vercel.app/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/saniashakeel/" },
    ],
    line: "Makes the data mean something before the model sees it.",
    body: "Leads data science and machine learning at MenteE — feature pipelines, model evaluation, and the retrieval work that makes our embeddings useful in practice rather than only on a benchmark.",
    proof: [
      { k: "3", v: "Languages" },
      { k: "UMich", v: "Applied DS" },
      { k: "13", v: "Certifications" },
    ],
  },
];

export function Team() {
  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          The team
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Everyone here built what you are using.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          There are two of us. No agency, no middlemen, no handoff — the people
          answering your email are the people who wrote the code and trained the
          models. You talk to us directly.
        </p>
      </Reveal>

      <div className="mt-14 border-t border-neutral-200">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08}>
            <motion.article
              initial={false}
              whileHover="hover"
              className="group grid gap-6 border-b border-neutral-200 py-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-neutral-400">
                  {member.index}
                </span>
              </div>

              <div className="md:col-span-7">
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-neutral-500">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-1 inline-block font-mono text-xs text-neutral-400 transition-colors hover:text-neutral-900"
                >
                  {member.email}
                </a>
                <div className="mt-2 flex gap-4">
                  {member.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-900 hover:no-underline"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
                <p className="mt-5 text-base font-medium leading-snug text-neutral-900">
                  {member.line}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
                  {member.body}
                </p>
              </div>

              <div className="md:col-span-4 md:pl-8">
                <div className="flex gap-6 md:flex-col md:gap-4">
                  {member.proof.map((p) => (
                    <div key={p.v} className="min-w-0">
                      <p className="text-lg font-semibold tracking-tight text-neutral-900">
                        {p.k}
                      </p>
                      <p className="text-xs text-neutral-500">{p.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-neutral-600">
            We are a small team on purpose. We hire slowly, and we hire people
            who want to own problems end to end.
          </p>
          <Link
            href="/careers"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:no-underline"
          >
            Open roles
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
