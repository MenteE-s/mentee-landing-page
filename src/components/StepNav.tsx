"use client";

const steps = [
  { n: 1, t: "The Approach" },
  { n: 2, t: "Protocol A" },
  { n: 3, t: "Protocol B" },
  { n: 4, t: "Efficiency" },
  { n: 5, t: "What succeeded" },
  { n: 6, t: "Known limitations" },
  { n: 7, t: "Roadmap" },
  { n: 8, t: "Reproduction" },
];

export function StepNav({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (n: number) => void;
}) {
  return (
    <nav className="space-y-1">
      <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wide text-neutral-400">
        mentee-embed-v1
      </p>
      {steps.map((s) => {
        const active = s.n === current;
        return (
          <button
            key={s.n}
            onClick={() => onSelect(s.n)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
              active
                ? "bg-neutral-900 font-medium text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <span
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                active
                  ? "bg-white text-neutral-900"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {s.n}
            </span>
            <span>{s.t}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function StepArrows({
  prev,
  next,
  onPrev,
  onNext,
}: {
  prev?: { n: number; t: string } | null;
  next?: { n: number; t: string } | null;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-neutral-100 pt-6 mt-8">
      {prev ? (
        <button
          onClick={onPrev}
          className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:border-neutral-400">
            ←
          </span>
          <span className="hidden sm:inline">
            <span className="text-xs text-neutral-400">Step {prev.n}</span>
            <br />
            {prev.t}
          </span>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={onNext}
          className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900"
        >
          <span className="hidden sm:inline text-right">
            <span className="text-xs text-neutral-400">Step {next.n}</span>
            <br />
            {next.t}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:border-neutral-400">
            →
          </span>
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
