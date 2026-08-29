"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PublicationCard } from "@/components/PublicationCard";

/* ── badges & cells ──────────────────────────────────────── */

export function InitBadge({ init }: { init: string }) {
  const isPre = init === "Pre" || init === "Pretrained";
  return (
    <span
      className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
        isPre ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-700"
      }`}
    >
      {isPre ? "Pre" : "Rand"}
    </span>
  );
}

export function OursDot() {
  return <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-900 align-middle" />;
}

/** Compact table cell — short name shown, full name in tooltip */
export function ModelCell({ short, full, ours }: { short: string; full: string; ours?: boolean }) {
  return (
    <td
      title={full}
      className={`px-2 py-2 text-xs ${ours ? "font-semibold text-neutral-900" : "text-neutral-600"}`}
    >
      {ours && <OursDot />}{short}
    </td>
  );
}

export function NumCell({ v, bold }: { v: string; bold?: boolean }) {
  return (
    <td className={`px-2 py-2 text-right tabular-nums text-xs ${bold ? "font-semibold text-neutral-900" : "text-neutral-600"}`}>
      {v}
    </td>
  );
}

/* ── layout blocks ───────────────────────────────────────── */

export function ChapterBanner({ version, label }: { version: string; label: string }) {
  const isHighlight = version === "v3" || version === "v4";
  return (
    <div
      className={`rounded-2xl px-6 py-5 ${
        isHighlight ? "bg-neutral-900 text-white" : "border border-neutral-200 bg-neutral-50"
      }`}
    >
      <span
        className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
          isHighlight ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
        }`}
      >
        {version}
      </span>
      <h2
        className={`mt-2 text-xl font-bold tracking-tight ${
          isHighlight ? "text-white" : "text-neutral-900"
        }`}
      >
        {label}
      </h2>
    </div>
  );
}

export function SectionHeading({ title, sub }: { title: string; sub?: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{title}</h2>
      {sub && <p className="mt-3 text-neutral-600">{sub}</p>}
    </Reveal>
  );
}

export function StatGrid({ stats }: { stats: { n: string; l: string }[] }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.l} delay={i * 0.06}>
          <div className="rounded-2xl border border-neutral-100 bg-white p-4">
            <div className="text-2xl font-extrabold tracking-tight text-neutral-900">{s.n}</div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
              {s.l}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function StrengthList({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((s, i) => (
        <Reveal key={s.t} delay={i * 0.06}>
          <div className="rounded-2xl border-l-4 border-green-400 bg-green-50/60 p-5">
            <h3 className="font-semibold text-neutral-900">{s.t}</h3>
            <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function LimitationList({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((l, i) => (
        <Reveal key={l.t} delay={i * 0.06}>
          <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/60 p-5">
            <h3 className="font-semibold text-neutral-900">{l.t}</h3>
            <p className="mt-2 text-sm text-neutral-600">{l.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── table shell ─────────────────────────────────────────── */

export function TableCard({
  title,
  sub,
  note,
  children,
}: {
  title: string;
  sub?: string;
  note?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="border-b border-neutral-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        {sub && <p className="mt-0.5 text-xs text-neutral-500">{sub}</p>}
      </div>
      <div className="overflow-x-auto">{children}</div>
      {note && (
        <div className="border-t border-neutral-100 px-4 py-2.5">
          <p className="text-xs text-neutral-600">{note}</p>
        </div>
      )}
    </div>
  );
}

export function Figure({ src, alt, width = 840, height = 460 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <div className="my-6 mx-auto max-w-2xl overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
      <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
    </div>
  );
}

export { PublicationCard, Reveal };
