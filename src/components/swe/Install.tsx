"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const methods = [
  {
    name: "cargo (recommended)",
    command: "cargo install mentee-swe",
    note: "Requires Rust toolchain",
  },
  {
    name: "go install",
    command: "go install github.com/mentee-ai/mentee-swe@latest",
    note: "Requires Go 1.22+",
  },
  {
    name: "pre-built binary",
    command: "curl -fsSL https://get.mentee.ai | sh",
    note: "Linux / macOS / Windows",
  },
];

const flags = [
  { flag: "mentee", desc: "Start interactive TUI" },
  { flag: "mentee \"task\"", desc: "Run one-shot task" },
  { flag: "mentee --model <id>", desc: "Override default model" },
  { flag: "mentee -y --auto-approve", desc: "Skip confirmation prompts" },
  { flag: "mentee --no-tui", desc: "Plain stdout output" },
  { flag: "mentee --max-iterations <n>", desc: "Limit agent iterations" },
  { flag: "mentee --config <path>", desc: "Use custom config file" },
];

export function SWEInstall() {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-10 flex max-w-2xl items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-left shadow-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                ⚠️ Currently Unstable — Dev Team Is Working on Recovery
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-800">
                The current build may contain bugs. Our team is actively
                restoring stability — please use with caution and report issues
                on GitHub.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Install in seconds
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Single binary. No Docker, no VMs, no complex setup.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">
                Installation
              </h3>
              <div className="mt-4 space-y-3">
                {methods.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3"
                  >
                    <div>
                      <div className="text-xs font-medium text-neutral-500">
                        {m.name}
                      </div>
                      <code className="mt-1 block text-sm text-neutral-800">
                        {m.command}
                      </code>
                    </div>
                    <button
                      onClick={() => copy(m.command)}
                      className="ml-4 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">
                CLI flags
              </h3>
              <div className="mt-4 space-y-2">
                {flags.map((f) => (
                  <div
                    key={f.flag}
                    className="flex items-start justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5"
                  >
                    <code className="text-sm text-neutral-800">{f.flag}</code>
                    <span className="ml-4 text-right text-xs text-neutral-500">
                      {f.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-neutral-200 bg-neutral-900 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-neutral-400">Terminal</span>
            </div>
            <div className="mt-4 font-mono text-sm text-neutral-300">
              <p>
                <span className="text-green-400">$</span> mentee &quot;fix the
                failing auth tests&quot;
              </p>
              <p className="mt-2 text-neutral-500">
                Agent started. Model: claude-sonnet-4-20250514
              </p>
              <p className="text-neutral-500">
                Iteration 1/40 · Tools: 0/60 · Tokens: 0/800k
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
