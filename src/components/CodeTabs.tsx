"use client";

import { useState } from "react";

export interface CodeTab {
  label: string;
  code: string;
}

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(tabs[active].code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                i === active
                  ? "bg-white/15 text-white"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="rounded-md px-3 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {/* Code block */}
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-neutral-100">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
