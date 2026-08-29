"use client";

import { Reveal, SectionHeading } from "./shared";
import { roadmap } from "./data";

export function Roadmap() {
  return (
    <section id="roadmap" className="mt-20 scroll-mt-24 border-t border-neutral-100 pt-12">
      <SectionHeading title="Roadmap" />
      <ol className="mt-8 space-y-0">
        {roadmap.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.06}>
            <li className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-xs font-bold text-neutral-600">
                  {i + 1}
                </span>
                {i < roadmap.length - 1 && (
                  <span className="mt-1 h-full w-px flex-1 bg-neutral-200" />
                )}
              </div>
              <div className="pb-7">
                <h3 className="font-semibold text-neutral-900">{r.t}</h3>
                <p className="mt-1 text-sm text-neutral-600">{r.d}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
