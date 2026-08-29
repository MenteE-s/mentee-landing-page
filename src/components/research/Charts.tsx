"use client";

/* ── Inline SVG charts for v3 and v4 chapters ───────────── */

/* ── Shared colours ──────────────────────────────────────── */
const C = {
  base: "#e5e7eb",
  text: "#737373",
  textDark: "#171717",
  bar: "#a3a3a3",
  ours: "#171717",
  grid: "#f5f5f5",
} as const;

const FONT = `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

/* ── helpers ─────────────────────────────────────────────── */

function YTick({ y, label }: { y: number; label: string }) {
  return (
    <g>
      <line x1={36} y1={y} x2={400} y2={y} stroke={C.grid} strokeWidth={1} />
      <text x={32} y={y + 3.5} textAnchor="end" fontSize={9} fill={C.text} fontFamily={FONT}>
        {label}
      </text>
    </g>
  );
}

/* ====================================================================
   1.  Version Progression (v3 approach) — vertical grouped bars
   Prot-A + Prot-C across v1, v2, v3, v4
   ==================================================================== */

const VP_DATA = [
  { v: "v1", a: 0.585, c: 0.2, highlight: false },
  { v: "v2", a: 0.429, c: 0.215, highlight: false },
  { v: "v3", a: 0.655, c: 0.645, highlight: true },
  { v: "v4", a: 0.916, c: 0.706, highlight: true },
];

export function VersionProgressionChart() {
  const W = 760, H = 340;
  const L = 40, R = 24, T = 36, B = 48;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const maxVal = 1;
  const barW = 14;
  const groupGap = (plotW - VP_DATA.length * barW * 2) / (VP_DATA.length + 1);

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Model Evolution — Prot-A &amp; Prot-C MRR@10
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Version progression chart">
        <YTick y={T} label="1.00" />
        <YTick y={T + plotH * 0.25} label="0.75" />
        <YTick y={T + plotH * 0.5} label="0.50" />
        <YTick y={T + plotH * 0.75} label="0.25" />
        <YTick y={T + plotH} label="0.00" />
        <line x1={L} y1={T} x2={L} y2={T + plotH} stroke={C.base} strokeWidth={1} />
        <line x1={L} y1={T + plotH} x2={W - R} y2={T + plotH} stroke={C.base} strokeWidth={1} />

        {VP_DATA.map((d, i) => {
          const cx = L + groupGap + i * (barW * 2 + groupGap);
          const hA = (d.a / maxVal) * plotH;
          const hC = (d.c / maxVal) * plotH;
          const colA = d.highlight ? "#404040" : C.bar;
          const colC = d.highlight ? "#a3a3a3" : "#d4d4d4";
          return (
            <g key={d.v}>
              <rect x={cx} y={T + plotH - hA} width={barW} height={hA} fill={colA} rx={2} />
              <text x={cx + barW / 2} y={T + plotH - hA - 5} textAnchor="middle" fontSize={9} fill={C.textDark} fontWeight={600} fontFamily={FONT}>
                {d.a.toFixed(3)}
              </text>

              <rect x={cx + barW} y={T + plotH - hC} width={barW} height={hC} fill={colC} rx={2} />
              <text x={cx + barW + barW / 2} y={T + plotH - hC - 5} textAnchor="middle" fontSize={9} fill={C.text} fontWeight={500} fontFamily={FONT}>
                {d.c.toFixed(3)}
              </text>

              <text x={cx + barW} y={T + plotH + 16} textAnchor="middle" fontSize={11} fontWeight={600} fill={d.highlight ? C.textDark : C.text} fontFamily={FONT}>
                {d.v}
              </text>
            </g>
          );
        })}

        <g transform={`translate(${W - R - 80}, ${T + 8})`}>
          <rect x={0} y={0} width={10} height={10} fill="#404040" rx={2} />
          <text x={14} y={9} fontSize={9} fill={C.text} fontFamily={FONT}>Prot-A</text>
          <rect x={0} y={16} width={10} height={10} fill="#a3a3a3" rx={2} />
          <text x={14} y={25} fontSize={9} fill={C.text} fontFamily={FONT}>Prot-C</text>
        </g>
      </svg>
    </div>
  );
}

/* ====================================================================
   2.  Custom Bench — horizontal grouped bar chart (v4 benchmarks)
   Shows EN, AR, UR, Dialect AR, Roman UR per model
   ==================================================================== */

const BENCH_COLORS = ["#525252", "#a3a3a3", "#d4d4d4", "#c2c2c2", "#8a8a8a"];

export function CustomBenchChart() {
  const rows = [
    { m: "mpnet-base", vals: [0.764, 0.602, 0.611, 0.445, 0.661] },
    { m: "MiniLM-L12", vals: [0.682, 0.568, 0.519, 0.385, 0.480] },
    { m: "e5-base", vals: [0.667, 0.352, 0.413, 0.310, 0.430] },
    { m: "MiniLM-L6", vals: [0.873, 0.087, 0.289, 0.084, 0.486] },
    { m: "mentee-v4 ★", vals: [0.369, 0.120, 0.261, 0.095, 0.399], ours: true },
    { m: "mentee-v3", vals: [0.225, 0.021, 0.055, 0.000, 0.079] },
  ];
  const langs = ["EN", "AR", "UR", "Dialect AR", "Roman UR"];
  const W = 760, H = 320;
  const L = 72, R = 24, T = 12, B = 16;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const maxVal = 1;
  const rowH = plotH / rows.length;
  const barH = 6;

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Custom Bench — MRR@10 by Language (121 queries, 18 domains)
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Custom benchmark bar chart">
        {[1, 0.75, 0.5, 0.25, 0].map((v, i) => (
          <g key={i}>
            <line x1={L} y1={T + ((1 - v) * plotH)} x2={W - R} y2={T + ((1 - v) * plotH)} stroke={C.grid} strokeWidth={1} />
            <text x={L - 6} y={T + ((1 - v) * plotH) + 3} textAnchor="end" fontSize={8} fill={C.text} fontFamily={FONT}>
              {v.toFixed(2)}
            </text>
          </g>
        ))}
        <line x1={L} y1={T} x2={L} y2={T + plotH} stroke={C.base} strokeWidth={1} />

        {rows.map((row, ri) => {
          const cy = T + ri * rowH + rowH / 2;
          return (
            <g key={row.m}>
              <text x={L - 6} y={cy + 3.5} textAnchor="end" fontSize={9} fontWeight={row.ours ? 600 : 400} fill={row.ours ? C.textDark : C.text} fontFamily={FONT}>
                {row.m}
              </text>
              {row.vals.map((v, vi) => (
                <rect
                  key={vi}
                  x={L}
                  y={cy - row.vals.length * (barH + 1) / 2 + vi * (barH + 1)}
                  width={(v / maxVal) * plotW}
                  height={barH}
                  fill={BENCH_COLORS[vi]}
                  rx={1.5}
                />
              ))}
            </g>
          );
        })}

        <g transform={`translate(${L + 4}, ${T + 4})`}>
          {langs.map((l, i) => (
            <g key={l} transform={`translate(${i * 90}, 0)`}>
              <rect x={0} y={0} width={8} height={8} fill={BENCH_COLORS[i]} rx={1.5} />
              <text x={12} y={8} fontSize={8} fill={C.text} fontFamily={FONT}>{l}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ====================================================================
   3.  Efficiency Scatter — v4 speed section
   Throughput (sents/sec) vs cost per 1B sentences, sized by params
   ==================================================================== */

const SCATTER_DATA = [
  { m: "mentee-v4",    t: 18115, cost: 7.15,  p: 41,  ours: true },
  { m: "MiniLM-L6",    t: 12445, cost: 10.40, p: 23 },
  { m: "e5-small",     t: 9749,  cost: 13.28, p: 118 },
  { m: "MiniLM-L12",   t: 9456,  cost: 13.69, p: 118 },
  { m: "e5-base",      t: 5379,  cost: 24.07, p: 278 },
  { m: "mpnet-base",   t: 5158,  cost: 25.10, p: 278 },
];

export function EfficiencyScatterChart() {
  const W = 760, H = 360;
  const L = 56, R = 28, T = 32, B = 56;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const maxX = 21000;
  const maxY = 30;

  function sx(v: number) { return L + (v / maxX) * plotW; }
  function sy(v: number) { return T + plotH - (v / maxY) * plotH; }
  function sr(p: number) { return Math.max(4, Math.sqrt(p / 278) * 18); }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Throughput vs Cost — RTX 5090, batch 128
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Efficiency scatter plot">
        <defs>
          <clipPath id="scatter-clip">
            <rect x={L} y={T} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {[0, 6000, 12000, 18000].map((v) => (
          <g key={v}>
            <line x1={sx(v)} y1={T} x2={sx(v)} y2={T + plotH} stroke={C.grid} strokeWidth={1} />
            <text x={sx(v)} y={T + plotH + 14} textAnchor="middle" fontSize={8} fill={C.text} fontFamily={FONT}>
              {(v / 1000).toFixed(0)}k
            </text>
          </g>
        ))}
        {[0, 5, 10, 15, 20, 25].map((v) => (
          <g key={v}>
            <line x1={L} y1={sy(v)} x2={L + plotW} y2={sy(v)} stroke={C.grid} strokeWidth={1} />
            <text x={L - 6} y={sy(v) + 3} textAnchor="end" fontSize={8} fill={C.text} fontFamily={FONT}>
              ${v}
            </text>
          </g>
        ))}
        <line x1={L} y1={T + plotH} x2={L + plotW} y2={T + plotH} stroke={C.base} strokeWidth={1} />
        <line x1={L} y1={T} x2={L} y2={T + plotH} stroke={C.base} strokeWidth={1} />

        <g clipPath="url(#scatter-clip)">
          {SCATTER_DATA.map((d) => (
            <g key={d.m}>
              <circle
                cx={sx(d.t)}
                cy={sy(d.cost)}
                r={sr(d.p)}
                fill={d.ours ? C.ours : C.bar}
                opacity={d.ours ? 0.92 : 0.45}
                stroke={d.ours ? "#000" : "none"}
                strokeWidth={d.ours ? 1.5 : 0}
              />
              <text
                x={sx(d.t)}
                y={sy(d.cost) - sr(d.p) - 4}
                textAnchor="middle"
                fontSize={8}
                fontWeight={d.ours ? 600 : 400}
                fill={d.ours ? C.textDark : C.text}
                fontFamily={FONT}
              >
                {d.m}
              </text>
            </g>
          ))}
        </g>

        <text x={L + plotW / 2} y={H - 8} textAnchor="middle" fontSize={9} fill={C.text} fontFamily={FONT}>
          Throughput (sents/sec)
        </text>
        <text
          x={8}
          y={T + plotH / 2}
          textAnchor="middle"
          fontSize={9}
          fill={C.text}
          fontFamily={FONT}
          transform={`rotate(-90, 8, ${T + plotH / 2})`}
        >
          Cost per 1B sentences (USD)
        </text>
      </svg>
    </div>
  );
}

/* ====================================================================
   4.  Protocol A — Language Breakdown (v3 benchmarks)
   Horizontal grouped bars: model × EN / AR / UR MRR@10
   ==================================================================== */

const LANG_COLORS = { en: "#2563eb", ar: "#16a34a", ur: "#d97706" };

export function ProtocolAChart() {
  const rows = [
    { m: "mpnet-base",  en: 0.931, ar: 0.839, ur: 0.806 },
    { m: "MiniLM-L12",  en: 0.924, ar: 0.819, ur: 0.753 },
    { m: "mentee-v3 ★", en: 0.766, ar: 0.475, ur: 0.443, ours: true },
    { m: "MiniLM-L6",   en: 0.927, ar: 0.144, ur: 0.140 },
    { m: "mentee-v1",   en: 0.501, ar: 0.373, ur: 0.329 },
    { m: "mentee-v2",   en: 0.412, ar: 0.175, ur: 0.200 },
  ];

  const W = 760, H = 360;
  const L = 84, R = 24, T = 12, B = 20;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const maxVal = 1;
  const rowH = plotH / rows.length;
  const barH = 7;

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Protocol A — MRR@10 by Language
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Protocol A language chart">
        {[1, 0.75, 0.5, 0.25, 0].map((v) => (
          <g key={v}>
            <line x1={L} y1={T + (1 - v) * plotH} x2={W - R} y2={T + (1 - v) * plotH} stroke={C.grid} strokeWidth={1} />
            <text x={L - 6} y={T + (1 - v) * plotH + 3} textAnchor="end" fontSize={8} fill={C.text} fontFamily={FONT}>
              {v.toFixed(2)}
            </text>
          </g>
        ))}
        <line x1={L} y1={T} x2={L} y2={T + plotH} stroke={C.base} strokeWidth={1} />

        {rows.map((row, ri) => {
          const cy = T + ri * rowH + rowH / 2;
          const langs: [string, number, string][] = [
            ["en", row.en, LANG_COLORS.en],
            ["ar", row.ar, LANG_COLORS.ar],
            ["ur", row.ur, LANG_COLORS.ur],
          ];
          return (
            <g key={row.m}>
              <text x={L - 6} y={cy + 3.5} textAnchor="end" fontSize={9} fontWeight={row.ours ? 600 : 400} fill={row.ours ? C.textDark : C.text} fontFamily={FONT}>
                {row.m}
              </text>
              {langs.map(([k, val, col], li) => (
                <g key={k}>
                  <rect x={L} y={cy - (barH * 3 + 4) / 2 + li * (barH + 2)} width={(val / maxVal) * plotW} height={barH} fill={col} rx={2} />
                  {val >= 0.15 && (
                    <text x={L + (val / maxVal) * plotW + 4} y={cy - (barH * 3 + 4) / 2 + li * (barH + 2) + barH - 1.5} fontSize={7.5} fill={col} fontWeight={500} fontFamily={FONT}>
                      {val.toFixed(3)}
                    </text>
                  )}
                </g>
              ))}
            </g>
          );
        })}

        <g transform={`translate(${L + 4}, ${T + 4})`}>
          {(["en", "ar", "ur"] as const).map((k, i) => (
            <g key={k} transform={`translate(${i * 50}, 0)`}>
              <rect x={0} y={0} width={8} height={8} fill={LANG_COLORS[k]} rx={2} />
              <text x={12} y={8} fontSize={8} fill={C.text} fontFamily={FONT}>
                {k === "en" ? "English" : k === "ar" ? "Arabic" : "Urdu"}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ====================================================================
   5.  Training Data Composition (v4 approach)
   Stacked horizontal bar: v3 vs v4 data sources
   ==================================================================== */

const TD_COLORS: Record<string, string> = {
  NLI: "#2563eb",
  "Parallel": "#7c3aed",
  "MS-MARCO EN": "#ea580c",
  "mMARCO AR": "#dc2626",
  MIRACL: "#16a34a",
};

export function TrainingDataChart() {
  const v3Sources = [
    { n: 811, c: TD_COLORS.NLI, l: "NLI (EN/AR/UR)" },
    { n: 600, c: TD_COLORS.Parallel, l: "Parallel (EN-UR, AR-EN)" },
    { n: 700, c: TD_COLORS["MS-MARCO EN"], l: "MS-MARCO (EN)" },
    { n: 9, c: TD_COLORS.MIRACL, l: "MIRACL" },
  ];
  const v4Sources = [
    { n: 811, c: TD_COLORS.NLI, l: "NLI (EN/AR/UR)" },
    { n: 600, c: TD_COLORS.Parallel, l: "Parallel (EN-UR, AR-EN)" },
    { n: 700, c: TD_COLORS["MS-MARCO EN"], l: "MS-MARCO (EN)" },
    { n: 500, c: TD_COLORS["mMARCO AR"], l: "mMARCO Arabic" },
    { n: 9, c: TD_COLORS.MIRACL, l: "MIRACL" },
  ];

  const W = 760, H = 260;
  const L = 48, R = 24, T = 16, B = 44;
  const plotW = W - L - R;
  const maxK = 2700;
  const barH = 36;
  const barGap = 28;

  function renderStacked(sources: typeof v3Sources, y: number, total: number, label: string) {
    let x = L;
    return (
      <g>
        <text x={L - 6} y={y + barH / 2 + 3.5} textAnchor="end" fontSize={10} fontWeight={500} fill={C.text} fontFamily={FONT}>
          {label}
        </text>
        {sources.map((s) => {
          const w = (s.n / maxK) * plotW;
          const el = (
            <g key={s.l}>
              <rect x={x} y={y} width={w} height={barH} fill={s.c} rx={w > 8 ? 3 : 1} />
              {w > 24 && (
                <text x={x + w / 2} y={y + barH / 2 + 3} textAnchor="middle" fontSize={8} fontWeight={600} fill="white" fontFamily={FONT}>
                  {s.n >= 1000 ? `${(s.n / 1000).toFixed(1)}K` : `${s.n}K`}
                </text>
              )}
            </g>
          );
          x += w;
          return el;
        })}
        <text x={L + plotW + 8} y={y + barH / 2 + 3} fontSize={10} fontWeight={700} fill={C.textDark} fontFamily={FONT}>
          {total >= 1000 ? `${(total / 1000).toFixed(1)}M` : `${total}K`}
        </text>
      </g>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Training Data Composition — v3 vs v4
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Training data composition chart">
        <line x1={L} y1={T} x2={L} y2={T + barH * 2 + barGap} stroke={C.base} strokeWidth={1} />

        {renderStacked(v3Sources, T, 2120, "v3 (2.1M)")}

        {renderStacked(v4Sources, T + barH + barGap, 2620, "v4 (2.6M)")}

        {/* +500K annotation arrow */}
        <g>
          <line x1={L + (2120 / maxK) * plotW + 16} y1={T + barH - 2} x2={L + (2120 / maxK) * plotW + 16} y2={T + barH + barGap + 2} stroke="#dc2626" strokeWidth={1.5} strokeDasharray="3 2" />
          <text x={L + (2120 / maxK) * plotW + 24} y={T + barH + barGap / 2 + 3} fontSize={9} fontWeight={700} fill="#dc2626" fontFamily={FONT}>
            +500K AR
          </text>
        </g>

        <g transform={`translate(${L + 4}, ${T + barH * 2 + barGap + 16})`}>
          {Object.entries(TD_COLORS).map(([k, col], i) => (
            <g key={k} transform={`translate(${i * 120}, 0)`}>
              <rect x={0} y={0} width={8} height={8} fill={col} rx={2} />
              <text x={12} y={8} fontSize={8} fill={C.text} fontFamily={FONT}>{k}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ====================================================================
   6.  Speed Comparison — horizontal bar chart (v4 speed)
   Throughput ranked, ours highlighted
   ==================================================================== */

export function SpeedBarsChart() {
  const data = [
    { m: "mentee-v4 ★",  v: 18115, ours: true },
    { m: "MiniLM-L6",    v: 12445 },
    { m: "e5-small",     v: 9749 },
    { m: "MiniLM-L12",   v: 9456 },
    { m: "e5-base",      v: 5379 },
    { m: "mpnet-base",   v: 5158 },
  ];

  const W = 760, H = 340;
  const L = 80, R = 60, T = 16, B = 20;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const maxVal = 21000;
  const rowH = plotH / data.length;
  const barH = 18;

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-100 bg-white p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Throughput — sents/sec (RTX 5090, batch 128)
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Speed comparison chart">
        {[0, 5000, 10000, 15000, 20000].map((v) => (
          <g key={v}>
            <line x1={L + (v / maxVal) * plotW} y1={T} x2={L + (v / maxVal) * plotW} y2={T + plotH} stroke={C.grid} strokeWidth={1} />
            <text x={L + (v / maxVal) * plotW} y={T + plotH + 14} textAnchor="middle" fontSize={8} fill={C.text} fontFamily={FONT}>
              {(v / 1000).toFixed(0)}k
            </text>
          </g>
        ))}
        <line x1={L} y1={T + plotH} x2={L + plotW} y2={T + plotH} stroke={C.base} strokeWidth={1} />

        {data.map((d, i) => {
          const cy = T + i * rowH + rowH / 2;
          const w = (d.v / maxVal) * plotW;
          return (
            <g key={d.m}>
              <text x={L - 6} y={cy + 3.5} textAnchor="end" fontSize={9} fontWeight={d.ours ? 600 : 400} fill={d.ours ? C.textDark : C.text} fontFamily={FONT}>
                {d.m}
              </text>
              <rect x={L} y={cy - barH / 2} width={w} height={barH} fill={d.ours ? "#171717" : "#d4d4d4"} rx={4} />
              {d.ours && (
                <rect x={L} y={cy - barH / 2} width={w} height={barH} fill="url(#speed-grad)" rx={4} />
              )}
              <text x={L + w + 6} y={cy + 3.5} fontSize={9} fontWeight={600} fill={d.ours ? C.textDark : C.text} fontFamily={FONT}>
                {d.v.toLocaleString()}
              </text>
            </g>
          );
        })}

        <defs>
          <linearGradient id="speed-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#171717" />
            <stop offset="100%" stopColor="#404040" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
