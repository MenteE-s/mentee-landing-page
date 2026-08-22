const items = [
  { name: "GitHub", icon: "GH" },
  { name: "Hugging Face", icon: "HF" },
  { name: "PyTorch", icon: "PT" },
  { name: "Python", icon: "PY" },
  { name: "Next.js", icon: "NX" },
  { name: "Vercel", icon: "VC" },
  { name: "Apache 2.0", icon: "A2" },
];

export function Marquee() {
  const loop = [...items, ...items];

  return (
    <section className="border-y border-neutral-100 bg-white py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-neutral-300">
          Available on · Built with
        </p>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-8">
            {loop.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
                  {item.icon}
                </span>
                <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-neutral-700">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
