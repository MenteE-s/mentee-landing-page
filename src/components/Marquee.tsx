const items = [
  { name: "For Founders, By Founders", icon: "FF" },
  { name: "Enterprise-Grade AI", icon: "EG" },
  { name: "0 → 1 Product Lab", icon: "01" },
  { name: "Pakistan → Gulf → Global", icon: "PG" },
  { name: "Research to Production", icon: "RP" },
  { name: "We Ship, Not Pitch", icon: "WS" },
  { name: "Hybrid AI Stack", icon: "HS" },
  { name: "Not an Agency", icon: "NA" },
];

export function Marquee() {
  const loop = [...items, ...items];

  return (
    <section className="border-y border-neutral-100 bg-white py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-neutral-300">
          Built for Founders &amp; Enterprises &bull; Pakistan to Gulf to Global
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
