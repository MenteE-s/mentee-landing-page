import { Reveal } from "@/components/Reveal";

const techStack = [
  { name: "TypeScript", desc: "Type-safe agent core and CLI" },
  { name: "Ink", desc: "React-based terminal UI" },
  { name: "commander", desc: "CLI argument parsing" },
  { name: "chokidar", desc: "Filesystem watching" },
  { name: "zod", desc: "Runtime schema validation" },
  { name: "vitest", desc: "Testing framework" },
];

export function SWETechStack() {
  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Built with modern TypeScript
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              No heavy frameworks. No unnecessary abstractions. Just the tools
              that make autonomous agents reliable.
            </p>
          </div>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((t, i) => (
            <Reveal key={t.name} delay={i * 50}>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="font-mono text-sm font-semibold text-neutral-900">
                  {t.name}
                </div>
                <div className="mt-1 text-xs text-neutral-500">{t.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
