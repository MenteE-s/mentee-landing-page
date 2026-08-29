"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const tabs = [
  {
    label: "Install",
    code: `# install globally\nnpm i -g @menteeai/menteeswe\n\n# launch the interactive agent\nmentee`,
  },
  {
    label: "Quick start",
    code: `# try without installing\nnpx @menteeai/menteeswe "your task"`,
  },
  {
    label: "Config",
    code: `# first run — configure a provider\nmentee config\n\n# then use it\ncd your-project\nmentee "fix the failing auth tests"`,
  },
  {
    label: "CLI flags",
    code: `mentee [task...]                  run a task\nmentee config                     setup wizard\nmentee -p glm "task"              choose provider\nmentee -m glm-4.5-air "task"      override model\nmentee --yes --no-tui "task"      headless mode`,
  },
];

export function SWEInstall() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Install &amp; quick start
        </h2>
        <p className="mt-2 max-w-xl text-neutral-600">
          Requires Node &ge; 20. MIT licensed.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="flex border-b border-neutral-100">
            {tabs.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActive(i)}
                className={`px-4 py-2.5 text-xs font-semibold transition-colors ${
                  i === active
                    ? "border-b-2 border-neutral-900 text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-neutral-800">
            <code>{tabs[active].code}</code>
          </pre>
        </div>
      </Reveal>
    </section>
  );
}
